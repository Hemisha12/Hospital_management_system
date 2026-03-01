import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../../context/DoctorContext";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import "./DoctorProfile.css"; // Import CSS

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        docId: profileData._id,
        fee: profileData.fee, // Use 'fee', not 'fees'
        available: profileData.available,
        phone: profileData.phone,
      };
      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]); // ✅ Add dependency to avoid infinite loop

  return (
    profileData && (
      <div className="profile">
        <div className="profile-container">
          <div className="profile-image">
            <img src={profileData.image} alt={profileData.name} />
          </div>

          <div className="profile-details">
            <p className="doc-name">{profileData.name}</p>

            <p>
              {profileData.degree} - {profileData.department}
            </p>
            <button className="experience-btn">{profileData.experience}</button>
          </div>
          <p className="appointment-phone">
            Phone :
            <span>
              {isEdit ? (
                <input
                  type="number"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  value={profileData.phone}
                />
              ) : (
                profileData.phone
              )}
            </span>
          </p>
          <p className="appointment-fee">
            Appointment Fee:{" "}
            <span>
              {currency}
              {isEdit ? (
                <input
                  type="number"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      fee: e.target.value,
                    }))
                  }
                  value={profileData.fee}
                />
              ) : (
                profileData.fee
              )}
            </span>
          </p>

          {/* <div className="availability">
            <input
              type="checkbox"
              checked={profileData.available}
              onChange={() =>
                isEdit &&
                setProfileData((prev) => ({
                  ...prev,
                  available: !prev.available,
                }))
              }
            /> */}
          {/* <label>Available</label> */}
        </div>

        {/* {isEdit ? (
          <button className="save-btn" onClick={updateProfile}>
            Save
          </button>
        ) : (
          <button className="edit-btn" onClick={() => setIsEdit(true)}>
            Edit
          </button>
        )} */}
      </div>
    )
  );
};

export default DoctorProfile;
