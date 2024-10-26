import React from 'react';
import Layout from '../components/Layout/Layout';
import "./about.css";
const About = () => {
    return (
        <Layout title={"About us - Sasta Store"}>
            <div className="about-container">
                <div className="about-image-container">
                    <img src="/images/about.avif" alt="About" className="about-image" />
                </div>
                <div className="about-content-container">
                    <h1>About Us</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultricies euismod neque, a volutpat sem scelerisque in. Phasellus quis commodo orci. Curabitur convallis bibendum leo, sed bibendum ex semper in. Morbi nec ipsum vitae felis convallis maximus. Sed elementum odio a justo feugiat pulvinar. Sed sed nunc ipsum. Donec elementum sapien sit amet turpis fermentum, et condimentum nunc facilisis.</p>

                </div>
            </div>
        </Layout>

    );
};

export default About;