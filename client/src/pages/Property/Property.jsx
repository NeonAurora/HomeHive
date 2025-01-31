import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getProperty, updateProperty } from "../../utils/api"; // Import updateProperty
import { PuffLoader } from "react-spinners";
import { AiFillStar } from "react-icons/ai";
import "./Property.css";
import { TbMapCheck } from "react-icons/tb";
import { FaRoad } from "react-icons/fa";
import { FaTrailer } from "react-icons/fa";
import { RiFloodLine } from "react-icons/ri";
import { MdOutlineHouseSiding } from "react-icons/md";
import { TbSmartHomeOff } from "react-icons/tb";
import { PiResizeLight } from "react-icons/pi";
import { MdLocationOn } from "react-icons/md";
import { formatPrice } from "../../utils/format";
import { GrMapLocation } from "react-icons/gr";
import Map from "../../components/Map/Map";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { UserContext } from "../../utils/UserContext";

const Property = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Extract property ID from the URL
  const id = pathname.split("/").slice(-1)[0];

  // 1) Access the user from context
  const { currentUser } = useContext(UserContext);

  // 2) Fetch the property data with React Query
  const { data, isLoading, isError } = useQuery(["resd", id], () =>
    getProperty(id)
  );

  // 3) Local state for edit mode and property data
  const [propertyData, setPropertyData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Once property data is fetched, copy it into local state
  useEffect(() => {
    if (data) {
      setPropertyData(data);
    }
  }, [data]);

  // 4) Check if currentUser is admin
  const isAdmin = currentUser?.role === "ADMIN";

  // 5) Save changes to the server
  const handleSave = async () => {
    try {
      const updated = await updateProperty(propertyData.id, propertyData);
      // Replace local state with updated data
      setPropertyData(updated);
      setEditMode(false);
      console.log("Property updated successfully!");
    } catch (err) {
      console.error("Error updating property:", err);
    }
  };

  // Handle loading & error states
  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error While Fetching The Land Details</span>
        </div>
      </div>
    );
  }

  if (!propertyData) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>No property data available</span>
        </div>
      </div>
    );
  }

  // Debug logs
  if (currentUser) {
    console.log("Current User: ", currentUser);
  } else {
    console.log("No User Logged In");
  }

  // Local event handler for input changes
  const handleChange = (field, value) => {
    setPropertyData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* Like Button */}
        <div className="like">
          <AiFillStar size={24} color="#ffB000" />
        </div>

        {/* If editing and admin, input for image; else show image */}
        {editMode && isAdmin ? (
          <div style={{ marginBottom: "1rem" }}>
            <label>Image URL: </label>
            <input
              type="text"
              value={propertyData.image || ""}
              onChange={(e) => handleChange("image", e.target.value)}
            />
          </div>
        ) : (
          <img src={`/${propertyData.image}`} alt="home" />
        )}

        {/* If admin, show 'Edit' button to toggle edit mode (unless already editing) */}
        {isAdmin && !editMode && (
          <button className="button" onClick={() => setEditMode(true)}>
            Edit
          </button>
        )}

        {/* Property Details */}
        <div className="flexCenter property-details">
          <div className="flexColStart left">
            {/* Title & Pricing */}
            <div className="flexStart head">
              {editMode && isAdmin ? (
                <>
                  <div>
                    <label>Address:</label>
                    <input
                      type="text"
                      value={propertyData.address || ""}
                      onChange={(e) => handleChange("address", e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Acre:</label>
                    <input
                      type="number"
                      value={propertyData.acre || ""}
                      onChange={(e) => handleChange("acre", e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Asking Price:</label>
                    <input
                      type="number"
                      value={propertyData.askingPrice || ""}
                      onChange={(e) =>
                        handleChange("askingPrice", e.target.value)
                      }
                    />
                  </div>
                </>
              ) : (
                <>
                  <span className="primaryText" style={{ fontSize: "1.75rem" }}>
                    {propertyData?.address}
                  </span>
                  <span
                    className="secondaryText acres"
                    style={{ fontSize: "1.5rem", marginLeft: "1rem" }}
                  >
                    {propertyData?.acre} acres
                  </span>
                  <span
                    className="orangeText"
                    style={{ fontSize: "1.5rem", marginLeft: "auto" }}
                  >
                    ${formatPrice(propertyData.askingPrice) || "Not available"}
                  </span>
                </>
              )}
            </div>

            {/* Features Grid */}
            <div className="flexStart features">
              {/* APN/PIN */}
              {editMode && isAdmin ? (
                <div className="flexStart feature">
                  <label>APN/PIN:</label>
                  <input
                    type="text"
                    value={propertyData.apnOrPin || ""}
                    onChange={(e) => handleChange("apnOrPin", e.target.value)}
                  />
                </div>
              ) : (
                <div className="flexStart feature">
                  <FaMagnifyingGlassLocation size={25} color="#1F3E72" />
                  <span>APN: {propertyData.apnOrPin || "Not available"}</span>
                </div>
              )}

              {/* Square Footage */}
              {editMode && isAdmin ? (
                <div className="flexStart feature">
                  <label>Lot Size (sqft):</label>
                  <input
                    type="number"
                    value={propertyData.sqft || ""}
                    onChange={(e) => handleChange("sqft", e.target.value)}
                  />
                </div>
              ) : (
                <div className="flexStart feature">
                  <PiResizeLight size={25} color="#1F3E72" />
                  <span>
                    Lot Size: {formatPrice(propertyData.sqft) || "Not available"}{" "}
                    sqft
                  </span>
                </div>
              )}

              {/* County */}
              {editMode && isAdmin ? (
                <div className="flexStart feature">
                  <label>County:</label>
                  <input
                    type="text"
                    value={propertyData.county || ""}
                    onChange={(e) => handleChange("county", e.target.value)}
                  />
                </div>
              ) : (
                <div className="flexStart feature">
                  <GrMapLocation size={25} color="#1F3E72" />
                  <span>County: {propertyData?.county || "Not available"}</span>
                </div>
              )}

              {/* Zoning */}
              {editMode && isAdmin ? (
                <div className="flexStart feature">
                  <label>Zoning:</label>
                  <input
                    type="text"
                    value={propertyData.zoning || ""}
                    onChange={(e) => handleChange("zoning", e.target.value)}
                  />
                </div>
              ) : (
                <div className="flexStart feature">
                  <TbMapCheck size={25} color="#1F3E72" />
                  <span>Zoning: {propertyData?.zoning || "Not applicable"}</span>
                </div>
              )}

              {/* Road Condition */}
              {editMode && isAdmin ? (
                <div className="flexStart feature">
                  <label>Road Condition:</label>
                  <input
                    type="text"
                    value={propertyData.roadCondition || ""}
                    onChange={(e) =>
                      handleChange("roadCondition", e.target.value)
                    }
                  />
                </div>
              ) : (
                <div className="flexStart feature">
                  <FaRoad size={25} color="#1F3E72" />
                  <span>
                    Road Condition: {propertyData?.roadCondition || "Unknown"}
                  </span>
                </div>
              )}

              {/* Mobile Homes */}
              {editMode && isAdmin ? (
                <div className="flexStart feature">
                  <label>Mobile Homes OK?</label>
                  <input
                    type="checkbox"
                    checked={propertyData.mobileHomeFriendly || false}
                    onChange={(e) =>
                      handleChange("mobileHomeFriendly", e.target.checked)
                    }
                  />
                </div>
              ) : (
                <div className="flexStart feature">
                  <FaTrailer size={25} color="#1F3E72" />
                  <span>
                    Mobile Homes:{" "}
                    {propertyData?.mobileHomeFriendly ? "Yes" : "No"}
                  </span>
                </div>
              )}

              {/* Floodplain */}
              {editMode && isAdmin ? (
                <div className="flexStart feature">
                  <label>Floodplain:</label>
                  <input
                    type="text"
                    value={propertyData.floodplain || ""}
                    onChange={(e) => handleChange("floodplain", e.target.value)}
                  />
                </div>
              ) : (
                <div className="flexStart feature">
                  <RiFloodLine size={25} color="#1F3E72" />
                  <span>
                    Floodplain: {propertyData?.floodplain || "Not available"}
                  </span>
                </div>
              )}

              {/* HOA/POA */}
              {editMode && isAdmin ? (
                <div className="flexStart feature">
                  <label>HOA/POA:</label>
                  <input
                    type="text"
                    value={propertyData.hoaPoa || ""}
                    onChange={(e) => handleChange("hoaPoa", e.target.value)}
                  />
                </div>
              ) : (
                <div className="flexStart feature">
                  <MdOutlineHouseSiding size={25} color="#1F3E72" />
                  <span>HOA/POA: {propertyData?.hoaPoa || "Not applicable"}</span>
                </div>
              )}

              {/* Restrictions */}
              {editMode && isAdmin ? (
                <div className="flexStart feature">
                  <label>Restrictions:</label>
                  <input
                    type="text"
                    value={propertyData.restrictions || ""}
                    onChange={(e) =>
                      handleChange("restrictions", e.target.value)
                    }
                  />
                </div>
              ) : (
                <div className="flexStart feature">
                  <TbSmartHomeOff size={25} color="#1F3E72" />
                  <span>
                    Restrictions: {propertyData?.restrictions || "None"}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="flexStart feature">
              {editMode && isAdmin ? (
                <textarea
                  rows={4}
                  value={propertyData.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              ) : (
                <span className="secondaryText" style={{ textAlign: "justify" }}>
                  {propertyData?.description}
                </span>
              )}
            </div>

            {/* If in edit mode and admin, show Save/Cancel */}
            {editMode && isAdmin && (
              <div style={{ marginTop: "1rem" }}>
                <button
                  className="button"
                  style={{ marginRight: "1rem" }}
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="button"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Offer Button (always visible) */}
            {!editMode && (
              <button
                className="button"
                onClick={() =>
                  navigate(`/properties/${propertyData?.id}/offer`, {
                    state: { property: propertyData },
                  })
                }
              >
                Make Your Offer
              </button>
            )}
          </div>

          {/* Map Section */}
          <div className="map">
            <Map
              address={propertyData?.address}
              city={propertyData?.city}
              state={propertyData?.state}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
