import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { toast } from 'react-toastify';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
const Homepage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    //get all categories  
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong !!");
        }
    };
    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);
    //Filter by Category 
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter(c => c !== id);
        }
        setChecked(all);
    };

    //get All products 
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };
    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();

    }, [checked, radio]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    //get filtered products  
    const filterProduct = async () => {
        try {
            const { data } = await axios.post("/api/v1/product/product-filters", {
                checked, radio
            });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };
    //get total count 

    const getTotal = async () => {
        const { data } = await axios.get("/api/v1/product/product-count");
        setTotal(data?.total);
    };

    //loadmore 
    const loadMore = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);
    return (
        <Layout title={"All Products - Sasta Store"}>
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-3">
                        <h4 className="text-center">Filter By Category</h4>
                        <div className="d-flex flex-column">
                            {categories?.map((c) => (
                                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                    {c.name}
                                </Checkbox>
                            ))}
                        </div>
                        <h4 className="text-center mt-4">Filter By Price</h4>
                        <div className="d-flex flex-column ">
                            <Radio.Group onChange={(e) => setRadio(e.target.value)} >
                                {Prices?.map(p => (
                                    <div key={p.id}>
                                        <Radio value={p.array}>{p.name}</Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary my-3 w-100" onClick={() => window.location.reload()}>Reset Filters</button>
                        </div>
                    </div>
                    <div className="col-md-9">

                        <h1 className="text-center">All Products</h1>
                        <div className="d-flex flex-wrap">
                            {products?.map((p) => (
                                <div className="col-md-4 mb-3" key={p._id}>
                                    <div className="card m-2">
                                        <img style={{ height: "200px" }} src={`/api/v1/product/product-photo/${p._id}`} className="p-3" alt={p.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text m-0">Price: {p.price}$</p>
                                            <p className="card-text m-0">quantity: {p.quantity} Products left</p>
                                            <p className="card-text m-0">{p.description.substring(0, 20)} ...</p>
                                        </div>

                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <button onClick={() => navigate(`/product/${p.slug}`)} className="btn btn-outline-dark btn-sm">Details</button>
                                                <button className="btn btn-outline-warning btn-sm">Add to Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="m-2 p-3">
                            {products && products.length < total && (
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }} className='btn btn-primary'>{loading ? "Loading ..." : "Load more"}</button>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </Layout>

    );
};

export default Homepage;