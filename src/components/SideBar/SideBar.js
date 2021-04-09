import React from 'react';
import './SideBar.css';
import { faPlus, faThLarge, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <div className="sidebar">
            <h3 className="mt-4 font-weight-bold"><Link to="/home" className='text-light' style={{textDecoration: 'none'}}>GADGET SHOP</Link></h3>
             <Link to="/manageProduct"className="linkStyle "><FontAwesomeIcon icon={faThLarge} className="mr-2" />  Manage Product</Link>
             <Link to="/addProduct"className="linkStyle "><FontAwesomeIcon icon={faPlus} className="mr-2" />  Add Product</Link>
             <Link to="#editProduct"className="linkStyle "><FontAwesomeIcon icon={faEdit} className="mr-2" />  Edit Product</Link>
        </div>
    );
};

export default SideBar;