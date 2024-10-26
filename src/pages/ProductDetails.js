import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState({});

    const ProductDetails = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (params?.slug) ProductDetails();
    }, [params?.slug]);
    return (
        <Layout>
            <h1>Product details</h1>

            {JSON.stringify(product, null, 4)}

        </Layout>
    );
};

export default ProductDetails;