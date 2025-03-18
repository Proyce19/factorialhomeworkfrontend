import React, { useState, useEffect } from "react";
import api from "../api/api";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCart() {
            try {
                const response = await api.get("/cart");
                setCart(response.data);
            } catch (error) {
                console.error("Error fetching cart:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCart();
    }, []);

    const handleRemove = (productId) => {
        setCart(cart.filter((item) => item.product_id !== productId));
    };

    const handleSave = async () => {
        try {
            await api.post("/cart/update", { cart });
            alert("Cart updated successfully!");
        } catch (error) {
            console.error("Error updating cart:", error);
            alert("Failed to update cart.");
        }
    };

    const handlePurchase = async () => {
        try {
            await api.post("/cart/purchase");
            alert("Purchase successful!");
            setCart([]);
        } catch (error) {
            console.error("Error processing purchase:", error);
            alert("Purchase failed.");
        }
    };

    if (loading) return <p>Loading cart...</p>;

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.product_id} className="cart-item">
                                <h3>{item.name}</h3>
                                <p>Price: ${item.price}</p>
                                <button onClick={() => handleRemove(item.product_id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleSave}>Save Cart</button>
                    <button onClick={handlePurchase} className="purchase-button">Purchase</button>
                </div>
            )}
        </div>
    );
};

export default Cart;
