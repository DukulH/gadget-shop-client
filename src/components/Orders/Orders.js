import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import Header from '../Header/Header';

const Orders = () => {
    const [loggedInUser] = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    let i=1;
    useEffect(() => {
        fetch('http://localhost:5000/orders?email=' + loggedInUser.email)
            .then(response => response.json())
            .then(data => setOrders(data))
    }, [loggedInUser.email])

    return (
        <div>
            <Header></Header>
            <div className="container pt-5">
                <h2>Hello {loggedInUser.name || loggedInUser.displayName}, You Placed {orders.length} orders: </h2>
                {
                    orders.map(order =>
                        <div key={order.productKey} className="card border-info p-2 m-2">
                            <h5 className="card-header">Order # {i++}</h5>
                            <div className="card-body">
                                <h5 className="card-title">Product Name: {order.productName}</h5>
                                <h6 className="card-title">Order created: {(new Date(order.orderPlaced).toString ('dd/MM/yyyy'))} </h6>
                                <h6 className="card-title">Total {order.productPrice} /-</h6>
                            </div>
                            <div className='w-50 h-50'>
                                <img className='image-fluid w-50 h-50' src={order.productImageURL} alt=""/>
                            </div>

                        </div>
                    )
                }
            </div>

        </div>
    );
};

export default Orders;