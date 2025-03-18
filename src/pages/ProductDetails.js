import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await api.get(`/product/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        }
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        if (product.stock < 1) return;
        try {
            await api.post("/cart", { productId: product.id });
            alert("Product added to cart!");
        } catch (error) {
            console.error("Error adding product to cart:", error);
            alert("Failed to add product to cart.");
        }
    };

    if (!product) return <p>Loading product details...</p>;

    return (
        <div className="container">
            <h1>{product.name}</h1>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Stock:</strong> {product.stock}</p>

            <button onClick={handleAddToCart} disabled={product.stock < 1}>
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
        </div>
    );
};

export default ProductDetails;
