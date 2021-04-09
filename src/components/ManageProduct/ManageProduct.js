import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import SideBar from '../SideBar/SideBar';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-ui/core';

const ManageProduct = () => {
    let i = 1;
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        fetch('https://peaceful-caverns-10638.herokuapp.com/products')
            .then(response => response.json())
            .then(data => setProductDetails(data))
    }, [productDetails])

    const handleDeleteProduct = (key) => {
        fetch(`https://peaceful-caverns-10638.herokuapp.com/delete/${key}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(result => {
                alert('Product deleted successfully');
            })
    }

    return (
        <>
            <SideBar></SideBar>
            <div className="container">
                <h1 className="pb-4 pt-3">Manage Product</h1>
                <table className="table pt-5">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    {productDetails.map(productDetail =>
                        <tbody key={productDetail.productKey}>
                            <tr>
                                <th scope="row">{i++}</th>
                                <td>{productDetail.productName}</td>
                                <td>{productDetail.productPrice} /-</td>
                                <td>
                                    <Button variant="contained" color="primary">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Button>
                                    <Button className="ml-2" variant="contained" color="secondary" onClick={() => handleDeleteProduct(productDetail.productKey)}>
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    )
                    }
                </table>
            </div>


        </>
    );
};

export default ManageProduct;