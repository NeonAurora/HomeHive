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
})