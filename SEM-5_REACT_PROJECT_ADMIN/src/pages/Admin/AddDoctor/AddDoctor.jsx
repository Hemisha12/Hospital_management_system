import React, { useContext, useState } from "react";
import "./AddDoctor.css";
import { img } from "../../../Img/img";
import { AdminContext } from "../../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  const [experience, setExperience] = useState("1 Year");
  const [fee, setFee] = useState("");
  const [department, setDepartment] = useState("Orthopedics");
  const [degree, setDegree] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!docImg) {
        return toast.error("Image Not Selected ");
      }
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("age", age);

      formData.append("gender", gender);

      formData.append("phone", phone);

      formData.append("experience", experience);
      formData.append("fee", Number(fee));
      formData.append("department", department);
      formData.append("degree", degree);
      formData.forEach((value, key) => {
        console.log(`${key}:${value}`);
      });
      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        console.log("success");
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setAge("");
        setGender("");
        setPhone("");
        setFee("");
        setDegree("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  return (
    <form onSubmit={onSubmitHandler} className="form">
      <p className="add-doctor">Add Doctor</p>
      <div className="doct-info">
        <div className="doc-form">
          <label htmlFor="doc-img">
            <img
              className="img"
              src={docImg ? URL.createObjectURL(docImg) : img.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            Upload doctor <br />
            picture
          </p>
        </div>
        <div className="doc-info2">
          <div>
            <p>Doctor Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              required
            />
          </div>
          <div>
            <p>Doctor Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <p>Doctor Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <div>
            <p>Age</p>
            <input
              onChange={(e) => setAge(e.target.value)}
              value={age}
              type="text"
              placeholder="Age"
              required
            />
          </div>
          <div>
            <p>Gender</p>
            <select
              onChange={(e) => setGender(e.target.value)}
              value={gender}
              name=""
              id="gender"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <p>Phone</p>
            <input
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              type="number"
              placeholder="Phone"
              required
            />
          </div>
        </div>
        <div className="doc-info3">
          <div>
            <p>Experience</p>
            <select
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
              name=""
              id="year"
            >
              <option value="1 Year">1 Year</option>
              <option value="2 Year">2 Year</option>
              <option value="3 Year">3 Year</option>
              <option value="4 Year">4 Year</option>
              <option value="5 Year">5 Year</option>
              <option value="6 Year">6 Year</option>
              <option value="7 Year">7 Year</option>
              <option value="8 Year">8 Year</option>
              <option value="9 Year">9 Year</option>
              <option value="10 Year">10 Year</option>
            </select>
          </div>
          <div>
            <p>Fee</p>
            <input
              onChange={(e) => setFee(e.target.value)}
              value={fee}
              type="number"
              placeholder="Fee"
              required
            />
          </div>

          <div>
            <p>Department</p>
            <select
              onChange={(e) => setDepartment(e.target.value)}
              value={department}
              name=""
              id="department"
            >
              <option value="Orthopedics">Orthopedics</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dentistry">Dentistry</option>
              <option value="Oncology">Oncology</option>
              <option value="Physiotherapy">Physiotherapy</option>
              <option value="Plastic Surgery">Plastic Surgery</option>
            </select>
          </div>
          <div>
            <p>Education</p>
            <input
              onChange={(e) => setDegree(e.target.value)}
              value={degree}
              type="text"
              placeholder="Education"
              required
            />
          </div>
        </div>
        <button type="submit">Add Doctor</button>
      </div>
    </form>
  );
};

export default AddDoctor;
