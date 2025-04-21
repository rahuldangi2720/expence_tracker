import { AuthContext } from '@/app/context/AuthContext'; 
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Signin = ({ setMode }) => {
  const [formData, setFormData] = useState({});
  const { Usersignin, dispatch, AuthData } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (AuthData?.token) {
      router.push("/pages/Home");
    }
  }, [AuthData]);

  async function handleSubmit() {
    try {
      if (formData?.email && formData?.password) {
        const data = await Usersignin(formData);
        if(data){
          dispatch({
            type: "SIGN_IN",
            payload: data
          });
        } else if(data == undefined){
        alert("Invalid Email or Password");
      }
    }else {
      alert("Please fill out all fields.");
    }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", background: "linear-gradient(135deg,rgb(210, 202, 211), #F3E5F5)" }}>
      <div className="row w-100 shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: "900px", backgroundColor: "#fff" }}>
        
        {/* Left side - Signin Form */}
        <div className="col-md-6 bg-light p-5 d-flex flex-column justify-content-center text-center">
          <h2 className="fw-bold" style={{ color: "#7B1FA2" }}>Welcome Back 👋</h2>
          <p className="text-muted mt-3" style={{ fontSize: "15px" }}>
            Manage your expenses effortlessly with our intuitive tracker.<br />
            Stay in control and hit your financial goals!
          </p>
          <img src="https://cdn-icons-png.flaticon.com/512/2983/2983788.png" alt="Welcome" style={{ width: "200px", marginTop: "20px" }} />
        </div>

        {/* Right side - Welcome Text */}
        <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
          <h3 className="text-center mb-4 fw-bold">Sign In</h3>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control rounded-pill px-3"
              placeholder="Enter Email"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control rounded-pill px-3"
              placeholder="Enter Password"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>

          <div className="d-grid mb-3">
            <button className="btn btn-primary rounded-pill" onClick={handleSubmit}>
              Sign In
            </button>
          </div>

          <div className="text-center">
            <span className="text-muted">Don't have an account?</span><br />
            <button
              className="btn btn-link mt-1"
              onClick={() => setMode("signup")}
            >
              <strong>Sign up here</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
