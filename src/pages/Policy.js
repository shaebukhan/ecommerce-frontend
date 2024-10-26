import React from 'react';
import Layout from '../components/Layout/Layout';

const Policy = () => {
    return (

        <Layout title={"Privacy Policy - Sasta Store"}>
            <div className="about-container">
                <div className="about-image-container">
                    <img src="/images/cnt.jpg" alt="About" className="about-image" />
                </div>
                <div className="about-content-container">
                    <h1>Privacy Policy</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultricies euismod neque, a volutpat sem scelerisque in. Phasellus quis commodo orci. Curabitur convallis bibendum leo, sed bibendum ex semper in. Morbi nec ipsum vitae felis convallis maximus. Sed elementum odio a justo feugiat pulvinar. Sed sed nunc ipsum. Donec elementum sapien sit amet turpis fermentum, et condimentum nunc facilisis.</p>

                </div>
            </div>
        </Layout>

    );
};

export default Policy;