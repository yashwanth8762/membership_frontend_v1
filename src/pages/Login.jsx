import axios from "axios";
import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL, JWT_SECRET } from "../../config";
import { validatePassword } from "../utils/validation";
import { decodeToken } from "react-jwt";
import { login } from "../reducers/user";
import { useDispatch } from "react-redux";
// import { OpenInBrowser } from "@mui/icons-material";
import Form from "react-bootstrap/Form";
import { Eye, EyeOff } from 'lucide-react';



export default function Login() {
    const [emailID, setEmailID] = useState("");
    const [password, setPassword] = useState("");  
    const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const [emailErrorTxt, setEmailErrorTxt] = useState("");
  const [passwordErrorTxt, setPasswordErrorTxt] = useState("");
  const [isInvalidAdmin, setIsInvalidAdmin] = useState(false);
  const [isRoleVerified, setRoleVerified] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [wrongPasswordCounter, setWrongPasswordCounter] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;
    if (showAlert) {
      timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showAlert]);

  const handleTnoClick = () => {
    navigate('tno-login');
  };
  const submitLoginForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (wrongPasswordCounter === 5) {
      setEmailID("");
      setPassword("");
      setIsEmailError(false);
      setIsPasswordError(false);
      setEmailErrorTxt("");
      setPasswordErrorTxt("");
      setLoading(false);
      return;
    }
    if (emailID === "") {
      setIsEmailError(true);
      setEmailErrorTxt("Enter a Valid Email ID");
      setLoading(false);
      return;
    } else {
      setIsEmailError(false);
      setEmailErrorTxt("");
    }
    let isPasswordValid = validatePassword(password);
    if (isPasswordValid === false) {
      setIsPasswordError(true);
      setPasswordErrorTxt("Enter a Valid Password");
      setLoading(false);
      return;
    } else {
      setIsPasswordError(false);
      setPasswordErrorTxt("");
    }
    const admin = {
      email_id: emailID,
      password: password,
    };
    try {
      const res = await axios.post(
        `${API_BASE_URL}user/login`,
        admin
      );
      const status = res.status;
      if (status === 200) {
        const data = res.data.data;
        const { role } = decodeToken(data.access_token, JWT_SECRET);
        if (
          role === "ADMIN" ||
          role === "User" 
        ) {
          setWrongPasswordCounter(0);
          dispatch(
            login({
              id: data.admin_id,
              name: data.name,
              role: role,
              email_id: data.email_id,
              access_token: data.access_token,
              refresh_token: data.refresh_token,
              profile_pic: data?.profile_pic,
              is_logged_in: true,
              is_change_password: password === "PortalUser@123" ? true : false,
            })
          );
          navigate("/dashboard");
        } else {
          setRoleVerified(false);
        }
        setLoading(false);
      } else {
        setWrongPasswordCounter((prevCount) => prevCount + 1);
        setLoading(false);
        setIsInvalidAdmin(true);
        setAlertMessage("Invalid email or password.");
        setShowAlert(true); // Show alert for error 
      }
    } catch (err) {
      setWrongPasswordCounter((prevCount) => prevCount + 1);
      setLoading(false);
      setIsInvalidAdmin(true);
      setAlertMessage("Invalid email or password.");
      setShowAlert(true); // Show alert for error
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        width: '100vw',
        height: '100vh',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          padding: '2.5rem 2rem',
          maxWidth: 400,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2 style={{ fontWeight: 700, fontSize: 32, marginBottom: 8, color: '#1e293b', letterSpacing: 1 }}>
          Welcome Back
        </h2>
        <p style={{ color: '#64748b', marginBottom: 32, fontSize: 16 }}>Sign in to your admin account</p>
        <form onSubmit={submitLoginForm} style={{ width: '100%' }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontWeight: 500, color: '#334155', marginBottom: 6, display: 'block' }}>Email</label>
            <input
              name="email"
              type="email"
              value={emailID}
              onChange={e => setEmailID(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid #cbd5e1',
                borderRadius: 8,
                fontSize: 16,
                outline: 'none',
                background: '#f8fafc',
                transition: 'border 0.2s',
                marginTop: 4,
                marginBottom: 2,
              }}
              onFocus={e => e.target.style.border = '1.5px solid #6366f1'}
              onBlur={e => e.target.style.border = '1px solid #cbd5e1'}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontWeight: 500, color: '#334155', marginBottom: 6, display: 'block' }}>Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid #cbd5e1',
                borderRadius: 8,
                fontSize: 16,
                outline: 'none',
                background: '#f8fafc',
                transition: 'border 0.2s',
                marginTop: 4,
                marginBottom: 2,
              }}
              onFocus={e => e.target.style.border = '1.5px solid #6366f1'}
              onBlur={e => e.target.style.border = '1px solid #cbd5e1'}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px 0',
              background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: 18,
              border: 'none',
              borderRadius: 8,
              boxShadow: '0 2px 8px 0 rgba(99, 102, 241, 0.10)',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              marginBottom: 8,
            }}
            disabled={loading}
            onMouseOver={e => e.target.style.background = 'linear-gradient(90deg, #06b6d4 0%, #6366f1 100%)'}
            onMouseOut={e => e.target.style.background = 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)'}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
  };