import React, { useState, useEffect } from "react";
import api from "../api/api";

const ManageWheels = () => {
    const [wheels, setWheels] = useState([]);
    const [newWheel, setNewWheel] = useState({ type: "", price: "", stock: "" });
    const [editingWheel, setEditingWheel] = useState(null);
    const [updatedWheel, setUpdatedWheel] = useState({ type: "", price: "", stock: "" });

    useEffect(() => {
        fetchWheels();
    }, []);

    const fetchWheels = async () => {
        try {
            const response = await api.get("/wheel");
            setWheels(response.data);
        } catch (error) {
            console.error("Error fetching wheels:", error);
        }
    };

    const handleAddWheel = async () => {
        if (!newWheel.type || !newWheel.price || !newWheel.stock) return;
        try {
            await api.post("/wheel", newWheel);
            setNewWheel({ type: "", price: "", stock: "" });
            fetchWheels();
        } catch (error) {
            console.error("Error adding wheel:", error);
        }
    };

    const handleEditWheel = async (id) => {
        try {
            await api.put(`/wheel/${id}`, updatedWheel);
            setEditingWheel(null);
            fetchWheels();
        } catch (error) {
            console.error("Error updating wheel:", error);
        }
    };

    const handleDeleteWheel = async (id) => {
        try {
            await api.delete(`/wheel/${id}`);
            fetchWheels();
        } catch (error) {
            console.error("Error deleting wheel:", error);
        }
    };

    return (
        <div className="admin-container">
            <h1>Manage Wheels</h1>

            <div className="input-group">
                <input
                    type="text"
                    placeholder="Wheel Type"
                    value={newWheel.type}
                    onChange={(e) => setNewWheel({ ...newWheel, type: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newWheel.price}
                    onChange={(e) => setNewWheel({ ...newWheel, price: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={newWheel.stock}
                    onChange={(e) => setNewWheel({ ...newWheel, stock: e.target.value })}
                />
                <button onClick={handleAddWheel}>Add</button>
            </div>

            <ul className="list-group">
                {wheels.map((wheel) => (
                    <li key={wheel.id} className="list-item">
                        {editingWheel === wheel.id ? (
                            <>
                                <input
                                    type="text"
                                    value={updatedWheel.type}
                                    onChange={(e) => setUpdatedWheel({ ...updatedWheel, type: e.target.value })}
                                />
                                <input
                                    type="number"
                                    value={updatedWheel.price}
                                    onChange={(e) => setUpdatedWheel({ ...updatedWheel, price: e.target.value })}
                                />
                                <input
                                    type="number"
                                    value={updatedWheel.stock}
                                    onChange={(e) => setUpdatedWheel({ ...updatedWheel, stock: e.target.value })}
                                />
                                <button onClick={() => handleEditWheel(wheel.id)}>Save</button>
                            </>
                        ) : (
                            <>
                                <span>{wheel.type} - ${wheel.price} - Stock: {wheel.stock}</span>
                                <button onClick={() => { setEditingWheel(wheel.id); setUpdatedWheel(wheel); }}>Edit</button>
                                <button onClick={() => handleDeleteWheel(wheel.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageWheels;
