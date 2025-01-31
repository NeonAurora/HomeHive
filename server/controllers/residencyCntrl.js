import asyncHandler from "express-async-handler";
import { prisma } from '../config/prismaConfig.js';

export const createResidency = asyncHandler(async (req, res) => {
  const {
      ownerid,
      apnOrPin,
      askingPrice,
      minPrice,
      title,
      description,
      address,
      zip,
      city,
      county,
      state,
      image,
      facilities,
      userEmail,
      status,
      flyer,
      propertyAddress,
      sqft,
      acre,
      zoning,
      utilities,
      roadCondition,
      restrictions,
      mobileHomeFriendly,
      hoaPoa,
      floodplain,
      hoaDeedDevInfo,
      notes,
  } = req.body.data;

  try {
      const lowerCaseEmail = userEmail.toLowerCase(); // Convert email to lowercase

      // Check if the user exists
      const user = await prisma.user.findUnique({
          where: { email: lowerCaseEmail },
      });

      if (!user) {
          return res.status(404).send({ message: "User not found." });
      }

      // Check for existing property with unique constraints
      const existingProperty = await prisma.residency.findFirst({
          where: {
              OR: [
                  { apnOrPin },
                  { address },
                  { propertyAddress },
              ],
          },
      });

      if (existingProperty) {
          return res.status(400).send({ message: "This property already exists in the system." });
      }

      // Create the property if no duplicates are found
      const residency = await prisma.residency.create({
          data: {
              ownerid,
              apnOrPin,
              askingPrice,
              minPrice,
              title,
              description,
              address,
              zip,
              city,
              county,
              state,
              image,
              facilities,
              status,
              flyer,
              propertyAddress,
              sqft,
              acre,
              zoning,
              utilities,
              roadCondition,
              restrictions,
              mobileHomeFriendly,
              hoaPoa,
              floodplain,
              hoaDeedDevInfo,
              notes,
              owner: {
                  connect: { email: lowerCaseEmail },
              },
          },
      });

      res.status(201).send({
          message: "Property Added Successfully",
          residency,
      });
  } catch (err) {
      console.error(err);
      res.status(500).send({ message: "An error occurred", error: err.message });
  }
});
//Get All Property
export const getAllResidencies = asyncHandler(async (req, res) => {
    try {
      const residencies = await prisma.residency.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      res.status(200).send(residencies);
    } catch (error) {
      console.error("Error fetching residencies:", error);
      res.status(500).send({ message: "An error occurred while fetching residencies", error: error.message });
    }
  });
//Get A Certain Property

export const getResidency= asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try{

        const residency = await prisma.residency.findUnique({
            where: {id:id}
        })
        res.send(residency);
    }
    catch(err){
        throw new Error(err.message);
    }
});




export const updateResidency = asyncHandler(async (req, res) => {
  console.log("Received updateResidency request body:", req.body);

  try {
    const { id } = req.params;
    let { currentUser, ...restOfData } = req.body;

    // Remove fields you cannot update
    delete restOfData.id;
    delete restOfData.createdAt;
    delete restOfData.updatedAt;

    // Optional admin check
    if (!currentUser || currentUser.role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden - Admin only" });
    }

    const updatedResidency = await prisma.residency.update({
      where: { id },
      data: restOfData,
    });

    return res.status(200).json(updatedResidency);
  } catch (error) {
    console.error("Error updating residency:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Residency with this ID does not exist",
        error: error.message,
      });
    }
    if (error.code === "P2002") {
      return res.status(400).json({
        message: "Unique constraint violation—some field must be unique",
        error: error.message,
      });
    }
    if (error.code === "P2003") {
      return res.status(400).json({
        message: "Foreign key constraint failed—invalid relation",
        error: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to update property",
      error: error.message,
    });
  }
});

  
