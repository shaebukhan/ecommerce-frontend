import React from 'react';
import Layout from '../components/Layout/Layout';
import "./Contact.css";


const Conatct = () => {

    return (
        <Layout title={"Contact us - Sasta Store"}>
            <div className="contact-us-container">

                <div className="contact-form-container">
                    <h1>Contact Us</h1>
                    <form className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" rows="5"></textarea>
                        </div>
                        <button type="submit" className="submit-button">Send</button>
                    </form>
                </div>
            </div>
        </Layout>

    );
};

export default Conatct;