import React, { useContext, useState } from "react";
import { img } from "../../Img/img";

import "./MyProfile.css";
import { Appcontext } from "../../context/Appcontext";
import axios from "axios";
import { toast } from "react-toastify";
const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(Appcontext);
  const [image, setImage] = useState(false);
  const updateUserProfileData = async () => {
    try {
      const formdata = new FormData();
      formdata.append("name", userData.name);
      formdata.append("phone", userData.phone);
      formdata.append("gender", userData.gender);
      formdata.append("dob", userData.dob);

      image && formdata.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formdata,
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        loadUserProfileData();

        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const [isEdit, setIsEdit] = useState(false);
  return (
    userData && (
      <div className="profile-card">
        {isEdit ? (
          <label htmlFor="image">
            <div>
              <img
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              />
              {/* <img src={image ? "" : img.profile_icon} alt="" /> */}
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img src={userData.image} alt="Doctor" />
        )}

        <hr />
        {isEdit ? (
          <input
            type="text"
            className="profile-input"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <h4 className="profile-name">{userData.name}</h4>
        )}
        <hr />
        {/* rest of code... */}

        <div className="section">
          <br></br>
          <h3>CONTACT INFORMATION</h3>

          <div>
            <p>Email Id:</p>
            {isEdit ? (
              <input
                type="text"
                className="profile-input"
                value={userData.email}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            ) : (
              <p>{userData.email}</p>
            )}
            <p>Phone :</p>
            {isEdit ? (
              <input
                type="text"
                className="profile-input"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p>{userData.phone}</p>
            )}
            {/* <p>Address :</p>
          {isEdit ? (
            <p>
              <input
                className="profile-input"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={userData.address.line1}
                type="text"
              />
              <br />
              <input
                className="profile-input"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={userData.address.line2}
                type="text"
              />
            </p>
          ) : (
            <p>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )} */}
          </div>
        </div>
        <div className="section">
          <br></br>
          <h3>BASIC INFORMATION</h3>
          <div>
            <p>Gender:</p>
            {isEdit ? (
              <select
                className="profile-input"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}
            <p>Birthday:</p>
            {isEdit ? (
              <input
                type="date"
                className="custom-calendar"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                value={userData.dob}
                max={new Date().toISOString().split("T")[0]}
              />
            ) : (
              <p>{userData.dob}</p>
            )}
          </div>
        </div>
        <div className="btn-container">
          {isEdit ? (
            <button className="btn save-btn" onClick={updateUserProfileData}>
              Save information
            </button>
          ) : (
            <button className="btn edit-btn" onClick={() => setIsEdit(true)}>
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
