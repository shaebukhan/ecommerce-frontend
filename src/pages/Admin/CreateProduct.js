import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;
const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [shipping, setShipping] = useState("");

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
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("category", category);
            productData.append("shipping", shipping);

            const { data } = await axios.post("/api/v1/product/create-product", productData);
            // Check the photo size before making the API request
            if (photo && photo.size > 1000000) {
                toast.error("Photo size should be less than 1MB");
                return; // Stop further execution
            }
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

    return (
        <Layout title="Create-Product Sasta-Store">
            <div className="container-fluid  p-5">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Create-Product</h1>
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
                                    required
                                    name="photo"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                />
                            </div>
                            <div className="mb-3">
                                {photo && (
                                    <div className="text-center">
                                        <img
                                            className="img img-responsive"
                                            src={URL.createObjectURL(photo)}
                                            alt="Product photo"
                                            height={"200px"}
                                        />
                                    </div>
                                )}
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
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleCreate}>Create Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateProduct;
