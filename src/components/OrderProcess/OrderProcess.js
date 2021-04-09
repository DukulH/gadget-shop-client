import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import {  useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import './OrderProcess.css';


const OrderProcess = () => {
    const [product, setProduct] = useState({});
    const [loggedInUser, ] = useContext(UserContext);
    
    const { key } = useParams();
    let i = 1;
    let history = useHistory();
    useEffect(() => {
        fetch(`http://localhost:5000/orderProcess/${key}`)
            .then(response => response.json())
            .then(data => setProduct(data[0]))

    }, [key])

    const handlePlaceOrder = () => {
        const orderDetails = {...loggedInUser, productName: product.productName , productPrice: product.productPrice , productImageURL: product.productImageURL, productKey: product.productKey, orderPlaced: new Date()}
        fetch('http://localhost:5000/placeOrder', {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
        .then(response => response.json())
        .then(data => {
            if(data){
                alert('Order placed successfully');
                history.push('/home')
            }
        })

    }

    return (
        <div>
            <Header></Header>
            <div className="container mt-5">
                <h1 className=" mb-4 mt-5">CHECKOUT</h1>
                <div className=" shadow p-3 mb-5 bg-white rounded">
                    <table className="table m-auto">
                        <thead>
                            <tr>
                                <th scope="col" className='text-secondary'>#</th>
                                <th scope="col" className='text-secondary'>Description</th>
                                <th scope="col" className='text-secondary'>Quantity</th>
                                <th scope="col" className='text-secondary'>Price</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <th scope="row">{i++}</th>
                                <td>{product.productName}</td>
                                <td>1</td>
                                <td>{product.productPrice} /-</td>

                            </tr>
                            <tr>
                                <th scope="row">TOTAL</th>
                                <td></td>
                                <td></td>
                                <td><strong>{product.productPrice} /-</strong></td>

                            </tr>
                        </tbody>
                    </table>
                    
                </div>
                <div className="text-right">
                        <button className="btnStyle" onClick={handlePlaceOrder}>Place order</button>
                    </div>

            </div>
        </div>
    );
};

export default OrderProcess;