import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

const Home = () => {
    const [bikes, setBikes] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const bikesResponse = await api.get("/bike");
                setBikes(bikesResponse.data);

                const productsResponse = await api.get("/product");
                setProducts(productsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1>Bike Store</h1>

            <Link to="/custom-bike">
                <button>Create Your Own Bike</button>
            </Link>

            <h2>Available Bikes</h2>
            <div className="grid-container">
                {bikes.map((bike) => (
                    <div key={bike.id} className="card">
                        <h3>{bike.name}</h3>
                        <p>Price: ${bike.price}</p>
                        <Link to={`/bike/${bike.id}`}>View Details</Link>
                    </div>
                ))}
            </div>

            <h2>Other Products</h2>
            <div className="grid-container">
                {products.map((product) => (
                    <div key={product.id} className={`card ${product.stock < 1 ? "disabled" : ""}`}>
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price}</p>
                        <p>Stock: {product.stock}</p>
                        {product.stock > 0 && <Link to={`/product/${product.id}`}>View</Link>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
