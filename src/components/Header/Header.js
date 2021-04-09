import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { handleSignOut } from '../Login/loginManager';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    });

    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false);
            })
    }
    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }
    return (
        <header className="style">
            <div className="container text-left">
                <nav className="navbar navbar-expand-lg navbar-light pt-4">
                    <div className="container-fluid">
                        <Link
                            style={{ fontSize: "35px" }}
                            className="navbar-brand"
                            to="/home"
                            alt=""
                        >
                            GADGET SHOP
            </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            onClick={() => setShow(!show)}
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div style={show ? { display: "block" } : { display: 'none' }} className={"collapse navbar-collapse justify-content-end"}>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link text-dark mx-4 fw-bold" to="/home">
                                        HOME
                  </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link text-dark mx-4 fw-bold "
                                        to="/orders"
                                    >
                                        ORDERS
                  </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-dark mx-4 fw-bold" to="/admin">
                                        ADMIN
                  </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-dark mx-4 fw-bold" to="/">
                                        DEALS
                  </Link>
                                </li>
                                {loggedInUser.email ? (
                                    <li className="nav-item">
                                        <Link to=''>
                                            <button className="loginBtnStyle" onClick={signOut}>SIGN OUT</button>
                                        </Link>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <Link to="/login">
                                            <button className="loginBtnStyle">LOGIN</button>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;