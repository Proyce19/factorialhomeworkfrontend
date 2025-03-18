import React, { useState, useEffect } from "react";
import {getAllBikes, addBike, updateBike, deleteBike } from "../api/api";

const ManageBikes = () => {
    const [bikes, setBikes] = useState([]);
    const [newBike, setNewBike] = useState({ name: "", price: "", stock: "" });
    const [editingBike, setEditingBike] = useState(null);
    const [updatedBike, setUpdatedBike] = useState({ name: "", price: "", stock: "" });

    useEffect(() => {
        fetchBikes();
    }, []);

    const fetchBikes = async () => {
        try {
            const response = await getAllBikes();
            setBikes(response.data);
        } catch (error) {
            console.error("Error fetching bikes:", error);
        }
    };

    const handleAddBike = async () => {
        if (!newBike.name || !newBike.price || !newBike.stock) return;
        try {
            await addBike(newBike);
            setNewBike({ name: "", price: "", stock: "" });
            fetchBikes();
        } catch (error) {
            console.error("Error adding bike:", error);
        }
    };

    const handleEditBike = async (id) => {
        try {
            await updateBike(id, updatedBike);
            setEditingBike(null);
            fetchBikes();
        } catch (error) {
            console.error("Error updating bike:", error);
        }
    };

    const handleDeleteBike = async (id) => {
        try {
            await deleteBike(id);
            fetchBikes();
        } catch (error) {
            console.error("Error deleting bike:", error);
        }
    };

    return (
        <div>
            <h1>Manage Bikes</h1>
            <div>
                <input type="text" placeholder="Bike Name" value={newBike.name} onChange={(e) => setNewBike({ ...newBike, name: e.target.value })} />
                <input type="number" placeholder="Price" value={newBike.price} onChange={(e) => setNewBike({ ...newBike, price: e.target.value })} />
                <input type="number" placeholder="Stock" value={newBike.stock} onChange={(e) => setNewBike({ ...newBike, stock: e.target.value })} />
                <button onClick={handleAddBike}>Add Bike</button>
            </div>

            <ul>
                {bikes.map((bike) => (
                    <li key={bike.id}>
                        {editingBike === bike.id ? (
                            <>
                                <input type="text" value={updatedBike.name} onChange={(e) => setUpdatedBike({ ...updatedBike, name: e.target.value })} />
                                <input type="number" value={updatedBike.price} onChange={(e) => setUpdatedBike({ ...updatedBike, price: e.target.value })} />
                                <input type="number" value={updatedBike.stock} onChange={(e) => setUpdatedBike({ ...updatedBike, stock: e.target.value })} />
                                <button onClick={() => handleEditBike(bike.id)}>Save</button>
                            </>
                        ) : (
                            <>
                                <span>{bike.name} - ${bike.price} - Stock: {bike.stock}</span>
                                <button onClick={() => { setEditingBike(bike.id); setUpdatedBike(bike); }}>Edit</button>
                                <button onClick={() => handleDeleteBike(bike.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageBikes;
