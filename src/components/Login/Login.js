import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import React, { useState } from 'react';
import { useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import './Login.css';
import {  handleFbSignIn, handleGoogleSignIn, initializeLoginFramework } from './loginManager';

const Login = () => {
    const [newUser, setNewUser] = useState(false);

    const [ user,setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    });

    initializeLoginFramework();

    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    const fbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                handleResponse(res, true);
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
        <>
            <section className="container-fluid position">
                <section className="row justify-content-center ">
                    <section className="col-12 col-sm-6 col-md-4">
                        <form className="form-container">
                            <h3 style={{ color: '#71BA58' }}>Login</h3>

                            {newUser && <div className="form-group">
                                <label htmlFor="InputName">Email Address</label>
                                <input type="text" className="form-control" id="InputName" placeholder="Enter name" />
                            </div>}
                            <div className="form-group">
                                <label htmlFor="InputEmail1">Email Address</label>
                                <input type="email" className="form-control" id="InputEmail1" placeholder="Enter email" />
                            </div>
                            {!newUser && <div className="form-group">
                                <label htmlFor="InputPassword">Password</label>
                                <input type="password" className="form-control" id="InputPassword" placeholder="Enter password" />
                            </div>}
                            {newUser && <div className="form-group">
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="InputPassword">Password</label>
                                        <input type="password" id="InputPassword" className="form-control" placeholder="Password" />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="InputCPassword">Confirm Password</label>
                                        <input type="password" id="InputCPassword" className="form-control" placeholder="Confirm Password" />
                                    </div>
                                </div>
                            </div>}
                            <button type="submit" className="btn w-50" style={{ backgroundColor: '#71BA58', color: 'white' }}>{newUser ? 'Sign Up' : 'Login'}</button>
                            <div className="form-footer pt-2">
                                <p> {newUser ? "Already have an account?" : "Don't have an account?"} <Link to='/login' style={{ color: '#71BA58' }} onClick={() => setNewUser(!newUser)}>{newUser ? 'Login' : 'Sign Up'}</Link></p>

                            </div>
                        </form>
                        <p className="text-center design mb-4 mt-5">
                            <span>or</span>
                        </p>
                        <div className="mt-4">
                            <button
                                className="p-2  bg-white border otherSignInMethod"
                                onClick={fbSignIn}
                            >
                                <FontAwesomeIcon className="icon" icon={faFacebook} />
                                <span>Continue with Facebook</span>
                            </button>
                            <br />
                            <button
                                className="p-2  bg-white border otherSignInMethod"
                                onClick={googleSignIn}
                            >
                                <FontAwesomeIcon className="icon" icon={faGoogle} />
                                <span>Continue with Google</span>
                            </button>
                        </div>
                    </section>
                </section>
            </section>
        </>
    );
};

export default Login;