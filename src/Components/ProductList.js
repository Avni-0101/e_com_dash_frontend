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
        <div className='product-list'>
            <h1>Product List</h1>
            <input className='search-prod-box' type='text' placeholder='Search Product' onChange={handleSearch}></input>
            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                products.length > 0 ? (
                    products.map((item, index) =>
                        <ul key={item._id}>
                            <li>{index + 1}</li>
                            <li>{item.name}</li>
                            <li>{item.price} INR</li>
                            <li>{item.category}</li>
                            <li>{item.company}</li>
                            <li>
                                <button className='delete-button' onClick={() => deleteProd(item._id)}>Delete</button>
                                <Link to={"/update/" + item._id} className='update-button'>Update</Link>
                            </li>
                        </ul>
                    )
                ) : (
                    <p>No products available.</p>
                )
            }
        </div>
    )
}
