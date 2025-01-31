import express from "express";
import { makeOffer } from "../controllers/buyerCntrl.js";
import { getOffersByBuyer } from "../controllers/buyerCntrl.js";
import { getOffersOnProperty } from "../controllers/buyerCntrl.js";


// import { getAllOffers, makeOffer } from "../controllers/buyerCntrl.js";

const router = express.Router();



// Route to create or update an offer
router.post("/makeOffer", makeOffer);
// router.post("/allOffers", getAllOffers);
router.get("/offers/property/:propertyId", getOffersOnProperty);
router.get("/offers/buyer", getOffersByBuyer);

export { router as buyerRoute };

// router.post("/getOffersByBuyers", Property)




