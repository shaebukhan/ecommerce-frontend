import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [shipping, setShipping] = useState("");
    const [id, setId] = useState("");
    //gel single product 
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setName(data.product.name);
            setId(data.product._id);
            setPhoto(data.product.photo);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setCategory(data.product.category._id);
            setShipping(data.product.shipping);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong !!");
        }
    };
    useEffect(() => {
        getSingleProduct();
    }, []);
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
    }, []);

    //handle photo change
    const handlePhotoChange = (e) => {
        const selectedPhoto = e.target.files[0];
        setPhoto(selectedPhoto);
    };
    //handle product  creation
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("category", category);
            productData.append("shipping", shipping);

            const { data } = await axios.put(`/api/v1/product/update-product/${id}`, productData);
            if (data?.success) {
                toast.success(`${data.message}`);
                navigate('/dashboard/admin/products');

            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!!");
        }
    };
    //Handle delete functionality 
    const handleDelete = async () => {
        try {
            let answer = window.prompt("Are you Sure want to Delete this Product ? Write yes");
            if (answer !== "yes") {
                toast.error("Incorrect input. Product deletion canceled.");
                return;
            }
            const { data } = await axios.delete(`/api/v1/product/delete-product/${id}`);
            if (data?.success) {
                toast.success(`${data.message}`);
                navigate('/dashboard/admin/products');
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong !!");
        }
    };
    return (
        <Layout title={"Update Product Sasta Store"}>
            <div className="container-fluid  p-5">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Update-Product</h1>
                        <div className="m-1 w-75 d-flex flex-column">
                            <Select
                                bordered={false}
                                placeholder="Select a Category"
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setCategory(value);
                                }}
                                value={category}
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className="mb-3 ">
                                <input
                                    className="form-control"
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                />
                            </div>
                            <div className="mb-3">
                                {photo ? (
                                    <div className="text-center">
                                        <img
                                            className="img img-responsive"
                                            src={URL.createObjectURL(photo)}
                                            alt="Product photo"
                                            height={"200px"}
                                        />
                                    </div>
                                ) : <div className="text-center">

                                    <img style={{ height: "200px" }} src={`/api/v1/product/product-photo/${id}`} className="card-img-top" alt={name} />



                                </div>}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    placeholder="Product Description"
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="4"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    placeholder="Product Price"
                                    className="form-control"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    placeholder="Product Quantity"
                                    className="form-control"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    placeholder="Select Shipping"
                                    size="large"
                                    showSearch
                                    className="form-select mb-3"
                                    onChange={(value) => {
                                        setShipping(value);
                                    }}
                                    value={shipping ? "Yes" : "No"}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleUpdate}>Update Product</button>
                                <button className="btn btn-danger mx-2" onClick={handleDelete}>Delete Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UpdateProduct;