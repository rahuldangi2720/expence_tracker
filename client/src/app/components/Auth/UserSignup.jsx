import { AuthContext } from '@/app/context/AuthContext';
import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Signup = ({ setMode }) => {
  const [formData, setFormData] = useState({});
  const { Usersignup } = useContext(AuthContext);

  async function handleSubmit() {
    try {
      if (
        formData?.username !== "" &&
        formData?.email !== "" &&
        formData?.password !== "" &&
        formData?.confirmPassword !== ""
      ) {
        if (formData?.password === formData?.confirmPassword) {
          const status = await Usersignup(formData);
          if (status === 200) {
            setMode("signin");
          }
        } else {
          alert("Passwords do not match");
        }
      } else {
        alert("Please fill out the form");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", background: "linear-gradient(135deg,rgb(210, 202, 211), #F3E5F5)" }}>
      <div className="row w-100 shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: "1000px", backgroundColor: "#fff" }}>
        
        {/* Left side - Welcome Text */}
        <div className="col-md-6 bg-light p-5 d-flex flex-column justify-content-center text-center">
          <h2 className="fw-bold" style={{ color: "#7B1FA2" }}>Create Account 🚀</h2>
          <p className="text-muted mt-3" style={{ fontSize: "15px" }}>
            Take control of your spending.<br />Track, manage, and thrive financially with us!
          </p>
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Welcome" style={{ width: "200px", marginTop: "20px" }} />
        </div>

        {/* Right side - Signup Form */}
        <div className="col-md-6 p-5">
          <h3 className="text-center mb-4 fw-bold">Sign Up</h3>

          <div className="mb-3">
            <input
              type="text"
              className="form-control rounded-pill px-3"
              placeholder="Username"
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control rounded-pill px-3"
              placeholder="Email"
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control rounded-pill px-3"
              placeholder="Password"
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control rounded-pill px-3"
              placeholder="Confirm Password"
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Profile Picture</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(e.target.files[0]);
                fileReader.onload = (e) => {
                  setFormData(prev => ({ ...prev, ProfilePicture: e.currentTarget.result }));
                };
              }}
            />
          </div>

          {formData.ProfilePicture && (
            <div className="text-center mb-3">
              <img
                src={formData.ProfilePicture}
                className="rounded-circle"
                style={{ width: "120px", height: "120px", objectFit: "cover", border: "2px solid #7B1FA2" }}
                alt="Preview"
              />
            </div>
          )}

          <button className="btn btn-primary w-100 rounded-pill mb-3" onClick={handleSubmit}>
            Signup
          </button>

          <div className="text-center">
            <button className="btn btn-link" onClick={() => setMode("signin")}>
              Already have an account? <strong>Sign in</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
