import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const makeOffer = asyncHandler(async (req, res) => {
    const { email, phone, buyerType, propertyId, offeredPrice, firstName, lastName } = req.body;

    if (!email || !phone || !propertyId || !offeredPrice || !firstName || !lastName) {
        res.status(400).json({ message: "First Name, Last Name, Email, phone, property ID, and offered price are required." });
        return;
    }

    try {
        // Find or create buyer
        let buyer = await prisma.buyer.findFirst({
            where: {
                OR: [
                    { email: email.toLowerCase() },
                    { phone }
                ]
            }
        });

        if (!buyer) {
            buyer = await prisma.buyer.create({
                data: {
                    email: email.toLowerCase(),
                    phone,
                    buyerType,
                    firstName,
                    lastName
                }
            });
        }

        // Check if the buyer already made an offer on the same property
        const existingOffer = await prisma.offer.findFirst({
            where: {
                buyerId: buyer.id,
                propertyId
            }
        });

        if (existingOffer) {
            if (parseFloat(offeredPrice) > parseFloat(existingOffer.offeredPrice)) {
                // Update the existing offer with the higher price
                const updatedOffer = await prisma.offer.update({
                    where: { id: existingOffer.id },
                    data: {
                        offeredPrice,
                        timestamp: new Date()
                    }
                });

                res.status(200).json({
                    message: "Your previous offer was updated to the new higher price.",
                    offer: updatedOffer
                });
            } else {
                // Reject lower or same price offers
                res.status(400).json({
                    message: `You have already made an offer of $${existingOffer.offeredPrice}. Offer a higher price to update.`,
                    existingOffer
                });
            }
            return;
        }

        // Create a new offer
        const newOffer = await prisma.offer.create({
            data: {
                propertyId,
                offeredPrice,
                buyerId: buyer.id,
                timestamp: new Date()
            }
        });

        res.status(201).json({
            message: "Offer created successfully.",
            offer: newOffer
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An error occurred while processing the offer.",
            error: err.message
        });
    }
});


export const getOffersOnProperty = asyncHandler(async (req, res) => {
    const { propertyId } = req.params;

    if (!propertyId) {
        res.status(400).json({ message: "Property ID is required." });
        return;
    }

    try {
        // Fetch all offers for the property, including buyer details
        const offers = await prisma.offer.findMany({
            where: { propertyId },
            include: {
                buyer: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true
                    }
                }
            },
            orderBy: {
                timestamp: "desc" // Change to "asc" for oldest first
            }
        });

        res.status(200).json({
            propertyId,
            totalOffers: offers.length,
            offers
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An error occurred while fetching offers for the property.",
            error: err.message
        });
    }
});


export const getOffersByBuyer = asyncHandler(async (req, res) => {
    const { email, phone } = req.query;

    if (!email && !phone) {
        res.status(400).json({ message: "At least one of email or phone is required." });
        return;
    }

    try {
        // Find buyer by email or phone
        const buyer = await prisma.buyer.findFirst({
            where: {
                OR: [
                    { email },
                    { phone }
                ]
            }
        });

        if (!buyer) {
            res.status(404).json({ message: "Buyer not found with the provided email or phone." });
            return;
        }

        // Fetch all offers by the buyer
        const offers = await prisma.offer.findMany({
            where: { buyerId: buyer.id },
            orderBy: {
                timestamp: "desc" // Change to "asc" for oldest first
            }
        });

        res.status(200).json({
            buyer: {
                firstName: buyer.firstName,
                lastName: buyer.lastName,
                email: buyer.email,
                phone: buyer.phone
            },
            totalOffers: offers.length,
            offers
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An error occurred while fetching offers for the buyer.",
            error: err.message
        });
    }
});





