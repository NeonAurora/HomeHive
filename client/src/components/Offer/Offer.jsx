import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import { toast } from "react-toastify";
import "./Offer.css";

const Offer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const propertyData = location.state?.property || null;

  const [offerPrice, setOfferPrice] = useState("");
  const [buyerType, setBuyerType] = useState("EndBuyer");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!offerPrice || !email || !firstName || !lastName || !phone) {
      toast.error("All fields are required.");
      return;
    }

    const offerData = {
      email,
      phone,
      buyerType,
      propertyId: propertyData?.id,
      offeredPrice: parseFloat(offerPrice),
      firstName,
      lastName,
    };

    try {
      await api.post("/buyer/makeOffer", offerData);

      if (parseFloat(offerPrice) < propertyData?.minPrice) {
        toast.warning(
          `Your offer is below the minimum price of $${propertyData?.minPrice}. Consider offering a higher price.`,
          { autoClose: 5000, toastId: "lowOffer" } // ✅ Ensures only one notification
        );
        return; // ✅ Does not redirect if offer is too low
      }

      toast.success("Offer submitted successfully!"); // ✅ Only show success if price is okay
      navigate(-1); // ✅ Redirect back only for valid offers
    } catch (error) {
      toast.error("Failed to submit the offer. Please try again.");
    }
  };

  if (!propertyData) {
    return <div className="wrapper">Error: Property data not found.</div>;
  }

  return (
    <div className="offer-container">
      <h2>Make an Offer for <span style={{ color: "#FF8000" }}>{propertyData?.address}</span></h2>
     
      <form onSubmit={handleSubmit} className="offer-form">
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Phone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <label>Buyer Type:</label>
        <select
          value={buyerType}
          onChange={(e) => setBuyerType(e.target.value)}
          required
        >
          <option value="EndBuyer">End Buyer</option>
          <option value="Investor">Investor</option>
          <option value="Realtor">Realtor</option>
        </select>

        <label>Offer Price ($):</label>
        <input
          type="number"
          value={offerPrice}
          onChange={(e) => setOfferPrice(e.target.value)}
          min="1"
          required
        />

        <button type="submit" className="button">
          Submit Offer
        </button>
      </form>
    </div>
  );
};

export default Offer;
