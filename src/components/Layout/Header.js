import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import { toast } from 'react-toastify';
import SearchInput from '../../form/SearchInput';
const Header = () => {
    const [auth, setAuth] = useAuth();
    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ""
        });
        localStorage.removeItem("auth");
        toast.info("Logged out");

    };
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light sticky-top">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link className="navbar-brand" to="/"> 🛒 Sasta Store</Link>
                        <div className="d-flex justify-content-center w-100">
                            <SearchInput />
                        </div>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/category">Category</NavLink>
                            </li>
                            {
                                !auth.user ? (<>  <li className="nav-item">
                                    <NavLink className="nav-link" to="/register">Register</NavLink>
                                </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">Login</NavLink>
                                    </li> </>) : (<>

                                        <li className="nav-item dropdown">
                                            <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {auth?.user?.name}
                                            </NavLink>
                                            <ul className="dropdown-menu">
                                                <li><NavLink className="dropdown-item" to={`/dashboard/${auth?.user.role === 1 ? "admin" : "user"}`}>Dashboard</NavLink></li>
                                                <li>
                                                    <NavLink onClick={handleLogout} className="dropdown-item" to="/login">Logout</NavLink>
                                                </li>
                                            </ul>
                                        </li>

                                    </>)
                            }
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/cart"> Cart(0)</NavLink>
                            </li>


                        </ul>

                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;