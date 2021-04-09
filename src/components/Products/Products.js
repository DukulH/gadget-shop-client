import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

const Products = () => {

    const [products, setProducts] = useState([]);
    

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [])
    return (
        <div className='container display pb-5'>

            
            {
                products.map((product) =>
                    
                        <div key={product.productKey} className="card border-0 shadow br-5 text-center">
                            <div className="card-img-block w-50 h-25 mb-5" style={{overflow: "hidden"}}>
                                <img
                                    className="card-img-top"
                                    src={product.productImageURL}
                                    alt=""
                                ></img>
                            </div>
                            <div className="card-body text-info">
                                <h5 className="card-title">{product.productName}</h5>
                                <p className="card-text">price : {product.productPrice} /-</p>
                                <Link className="btn-style" to={'/orderProcess/'+ product.productKey}>
                                    BUY NOW <FontAwesomeIcon icon={faArrowRight} />
                                </Link>
                            </div>
                        </div>
                
                )
            }
        </div>
    );
};

export default Products;