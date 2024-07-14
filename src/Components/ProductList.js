import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();              //this is a better way though you can add here directly also
    }, [])

    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products", {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('Token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    };

    const deleteProd = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('Token'))}`
            }
        })
        result = await result.json();
        if (result) {
            getProducts();
        } else {
            console.log("OOPS, failed to get products...")
        }
    }

    const handleSearch = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('Token'))}`
                }
            })
            result = await result.json();
            if (result) {
                setProducts(result);
            } else {
                console.log("No Products Found")
            }
        } else {
            getProducts();
        }
    }

    return (
        <div className='product-list-container'>
            <h1 className='product-list-heading'>Product List</h1>
            <input
                className='search-prod-box'
                type='text'
                placeholder='Search Product'
                onChange={handleSearch}
            />
            <div className='product-table'>
                <div className='product-table-header'>
                    <span>S. No.</span>
                    <span>Name</span>
                    <span>Price</span>
                    <span>Category</span>
                    <span>Company</span>
                    <span>Operation</span>
                </div>
                {products.length > 0 ? (
                    products.map((item, index) => (
                        <div key={item._id} className='product-table-row'>
                            <span>{index + 1}</span>
                            <span>{item.name}</span>
                            <span>{item.price} INR</span>
                            <span>{item.category}</span>
                            <span>{item.company}</span>
                            <span className='operation-buttons'>
                                <button
                                    className='delete-button'
                                    onClick={() => deleteProd(item._id)}
                                >
                                    Delete
                                </button>
                                <button className='update-button'><Link to={"/update/" + item._id}>
                                    Update
                                </Link></button>

                            </span>
                        </div>
                    ))
                ) : (
                    <p className='no-products-message'>No products available.</p>
                )}
            </div>
        </div>
    )
}
