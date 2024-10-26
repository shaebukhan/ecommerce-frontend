import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { Link } from "react-router-dom";
const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const [password, setPassword] = useState("");
    //Handling  form

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/register", {
                name,
                email,
                phone,
                address,
                answer,
                password,
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
        <Layout title={"Register-Sasta Store"}>
            <section className="signup">
                <div className="container">
                    <div className="signup-content d-flex">
                        <div className="signup-form">
                            <h2 className="form-title">Register</h2>
                            <form onSubmit={handleSubmit} className="register-form" id="register-form">
                                <div className="form-group">

                                    <input
                                        type="text"
                                        value={name}
                                        placeholder="Your Name"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
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
                                        type="number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Your Phone"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Your Address"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        placeholder="What is your Favourite Sports? This answer will help you in reset password"
                                    />
                                </div>
                                <div className="form-group">

                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="checkbox"
                                        name="agree-term"
                                        id="agree-term"
                                        className="agree-term"
                                    />

                                    <label htmlFor="agree-term" className="label-agree-term">

                                        <Link to="/policy" className="term-service">
                                            Privacy Policy ?
                                        </Link>
                                    </label>
                                </div>
                                <div className="form-group form-button">
                                    <button
                                        type="submit"
                                        id="signup"
                                        className="form-submit border-0"
                                    >

                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure>
                                <img src="images/signup.jpg" alt="sing up image" />
                            </figure>
                            <Link to="/login" className="signup-image-link">
                                I am already member ? Login
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Register;
