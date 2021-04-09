import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import SideBar from '../SideBar/SideBar';
import './AddProduct.css';

const AddProduct = () => {
    const { register, handleSubmit,} = useForm();
    const onSubmit = data => {
        const productData = {
            productName: data.pdName,
            productKey: data.pdKey,
            productPrice: data.pdPrice,
            productImageURL: imageURL,
        }
        fetch('http://localhost:5000/addProduct', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    if (!alert('Product added successfully')) { window.location.reload(); }
                }
                else{
                    if (!alert('Product added failed!! \r\n check productKey, imageFile properly')) { window.location.reload(); }
                }
            })
    }
    const [imageURL, setImageURL] = useState(null);
    const handleUploadImg = (event) => {
        console.log(event.target.files)
        const imageData = new FormData();
        imageData.set('key', '060a4f9b8feceeac3a5a19c5910df147');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                setImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <>
            <SideBar></SideBar>
            <div className='container'>
                <div className="pt-3 border-bottom">
                    <h3>Add Product</h3>
                </div>
                <form className="form-container" action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group pt-5 ">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="InputName"> <strong>Product Name</strong></label>
                                <input type="text" id="InputName"     {...register("pdName", { required: true })} className="form-control" placeholder="Product name" />
                            </div>
                            <div className="col">
                                <label htmlFor="InputKey"><strong>Product Key</strong></label>
                                <input type="text" id="InputKey"  {...register("pdKey", { required: true })} className="form-control" placeholder="Product key" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group mt-5">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="InputPrice"><strong>Add Price</strong></label>
                                <input type="number" id="InputPrice"  {...register("pdPrice", { required: true },)} className="form-control" placeholder="Add price" />
                            </div>
                            <div className="col uploadBtnWrap pb-5">
                                <strong>Add Photo</strong>
                                <br/>
                                <label htmlFor="InputFile" className="custom-file-upload"><FontAwesomeIcon icon={faCloudUploadAlt} className="mr-2" /> Upload photo</label>
                                <input type="file" onChange={handleUploadImg} id="InputFile" name="pdImg"/>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="text-right px-4 py-2 border-0 rounded" style={{ float: "right", backgroundColor: '#71BA58', color: 'white' }}>Save</button>
                </form>

            </div>
        </>
    );
};

export default AddProduct;