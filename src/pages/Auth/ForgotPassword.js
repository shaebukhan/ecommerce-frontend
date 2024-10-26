import React, { useState } from "react";
import Layout from '../../components/Layout/Layout';
import { toast } from 'react-toastify';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./auth.css";

const ForgotPassword = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [answer, setAnswer] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/forgot-password", {
                email, answer, newPassword
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong !! ");
        }
    };

    return (
        <Layout title="Forgot Password Sasta-Store">
            <section className="signup">
                <div className="container">
                    <div className="signin-content d-flex">
                        <div className="signin-image">
                            <figure><img src="images/forgot.avif" alt="Forgot password" /></figure>
                        </div>
                        <div className="signin-form">
                            <h2 className="form-title">Forgot Password</h2>
                            <form onSubmit={handleSubmit} className="register-form" id="login-form">
                                <div className="form-group">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your Email"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        placeholder="Answer Your Favourite Sports"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="New Password"
                                    />
                                </div>

                                <div className="form-group form-button">
                                    <button
                                        type="submit"
                                        className="form-submit border-0"
                                    >
                                        Reset Password
                                    </button>
                                </div>
                                <Link to="/register" className="signup-image-link">Don't have an Account ? Register</Link>

                            </form>
                        </div>
                    </div>
                </div>
            </section>


        </Layout>
    );
};

export default ForgotPassword;