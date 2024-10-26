import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
const Products = () => {
    const [products, setProducts] = useState([]);
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/get-product");
            if (data?.success) {
                setProducts(data?.products);
            }
        } catch (error) {
            console.log(error);
            toast.error("Soemthing went wrong !!");
        }
    };
    useEffect(() => {
        getAllProducts();
    }, []);
    return (
        <Layout title="Products Sasta Store">
            <div className="conatiner-fluid p-5">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className='text-center'>All Products List</h1>
                        <div className="row">
                            {products?.map((p) => (
                                <div className="col-md-4 mb-3" key={p._id}>
                                    <div className="card">
                                        <img style={{ height: "200px" }} src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">Price: {p.price}$</p>
                                            <p className="card-text">quantity: {p.quantity} Products left</p>
                                        </div>

                                        <div className="card-body">
                                            <Link to={`/dashboard/admin/product/${p.slug}`} className="btn btn-dark btn-sm">Details</Link>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Products;