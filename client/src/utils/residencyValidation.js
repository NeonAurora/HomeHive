// Example: src/utils/residencyValidation.js

/**
 * Transforms and validates Residency data before sending to the API.
 * Converts numeric fields, ensures boolean fields are booleans, etc.
 * Throws an error if conversion fails.
 */
export function transformResidencyData(rawData) {
    // We’ll create a copy so we don’t mutate the original.
    const data = { ...rawData };
  
    // Validate & Convert each field according to your Prisma schema.
    // 1) ownerid => Int
    if (data.ownerid !== undefined) {
      if (typeof data.ownerid === "string") {
        const parsed = parseInt(data.ownerid, 10);
        if (Number.isNaN(parsed)) {
          throw new Error("ownerid must be an integer but received an invalid string");
        }
        data.ownerid = parsed;
      } else if (typeof data.ownerid !== "number") {
        throw new Error("ownerid must be an integer but received a non-numeric value");
      }
    }
  
    // 2) askingPrice => Float
    if (data.askingPrice !== undefined) {
      if (typeof data.askingPrice === "string") {
        const parsed = parseFloat(data.askingPrice);
        if (Number.isNaN(parsed)) {
          throw new Error("askingPrice must be a float but received an invalid string");
        }
        data.askingPrice = parsed;
      } else if (typeof data.askingPrice !== "number") {
        throw new Error("askingPrice must be a float but received a non-numeric value");
      }
    }
  
    // 3) minPrice => Float
    if (data.minPrice !== undefined) {
      if (typeof data.minPrice === "string") {
        const parsed = parseFloat(data.minPrice);
        if (Number.isNaN(parsed)) {
          throw new Error("minPrice must be a float but received an invalid string");
        }
        data.minPrice = parsed;
      } else if (typeof data.minPrice !== "number") {
        throw new Error("minPrice must be a float but received a non-numeric value");
      }
    }
  
    // 4) sqft => Int
    if (data.sqft !== undefined) {
      if (typeof data.sqft === "string") {
        const parsed = parseInt(data.sqft, 10);
        if (Number.isNaN(parsed)) {
          throw new Error("sqft must be an integer but received an invalid string");
        }
        data.sqft = parsed;
      } else if (typeof data.sqft !== "number") {
        throw new Error("sqft must be an integer but received a non-numeric value");
      }
    }
  
    // 5) acre => Float
    if (data.acre !== undefined) {
      if (typeof data.acre === "string") {
        const parsed = parseFloat(data.acre);
        if (Number.isNaN(parsed)) {
          throw new Error("acre must be a float but received an invalid string");
        }
        data.acre = parsed;
      } else if (typeof data.acre !== "number") {
        throw new Error("acre must be a float but received a non-numeric value");
      }
    }
  
    // 6) mobileHomeFriendly => Boolean
    if (typeof data.mobileHomeFriendly === "string") {
      data.mobileHomeFriendly = data.mobileHomeFriendly.toLowerCase() === "true";
    } else if (
      data.mobileHomeFriendly !== undefined &&
      typeof data.mobileHomeFriendly !== "boolean"
    ) {
      throw new Error(
        "mobileHomeFriendly must be boolean but received a non-boolean value"
      );
    }
  
    // 7) facilities, utilities => JSON
    if (typeof data.facilities === "string") {
      try {
        data.facilities = JSON.parse(data.facilities);
      } catch {
        throw new Error("facilities must be valid JSON but received invalid string");
      }
    }
    if (typeof data.utilities === "string") {
      try {
        data.utilities = JSON.parse(data.utilities);
      } catch {
        throw new Error("utilities must be valid JSON but received invalid string");
      }
    }
  
    // Remove read-only fields
    delete data.id;
    delete data.createdAt;
    delete data.updatedAt;
  
    return data;
  }