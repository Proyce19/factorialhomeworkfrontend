import React, { useState, useEffect } from "react";
import api from "../api/api";

const ManageRims = () => {
    const [rims, setRims] = useState([]);
    const [newRim, setNewRim] = useState({ color: "", price: "", stock: "" });
    const [editingRim, setEditingRim] = useState(null);
    const [updatedRim, setUpdatedRim] = useState({ color: "", price: "", stock: "" });

    useEffect(() => {
        fetchRims();
    }, []);

    const fetchRims = async () => {
        try {
            const response = await api.get("/rim");
            setRims(response.data);
        } catch (error) {
            console.error("Error fetching rims:", error);
        }
    };

    const handleAddRim = async () => {
        if (!newRim.color || !newRim.price || !newRim.stock) return;
        try {
            await api.post("/rim", newRim);
            setNewRim({ color: "", price: "", stock: "" });
            fetchRims();
        } catch (error) {
            console.error("Error adding rim:", error);
        }
    };

    const handleEditRim = async (id) => {
        try {
            await api.put(`/rim/${id}`, updatedRim);
            setEditingRim(null);
            fetchRims();
        } catch (error) {
            console.error("Error updating rim:", error);
        }
    };

    const handleDeleteRim = async (id) => {
        try {
            await api.delete(`/rim/${id}`);
            fetchRims();
        } catch (error) {
            console.error("Error deleting rim:", error);
        }
    };

    return (
        <div className="admin-container">
            <h1>Manage Rims</h1>

            <div className="input-group">
                <input
                    type="text"
                    placeholder="Rim Color"
                    value={newRim.color}
                    onChange={(e) => setNewRim({ ...newRim, color: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newRim.price}
                    onChange={(e) => setNewRim({ ...newRim, price: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={newRim.stock}
                    onChange={(e) => setNewRim({ ...newRim, stock: e.target.value })}
                />
                <button onClick={handleAddRim}>Add</button>
            </div>

            <ul className="list-group">
                {rims.map((rim) => (
                    <li key={rim.id} className="list-item">
                        {editingRim === rim.id ? (
                            <>
                                <input
                                    type="text"
                                    value={updatedRim.color}
                                    onChange={(e) => setUpdatedRim({ ...updatedRim, color: e.target.value })}
                                />
                                <input
                                    type="number"
                                    value={updatedRim.price}
                                    onChange={(e) => setUpdatedRim({ ...updatedRim, price: e.target.value })}
                                />
                                <input
                                    type="number"
                                    value={updatedRim.stock}
                                    onChange={(e) => setUpdatedRim({ ...updatedRim, stock: e.target.value })}
                                />
                                <button onClick={() => handleEditRim(rim.id)}>Save</button>
                            </>
                        ) : (
                            <>
                                <span>{rim.color} - ${rim.price} - Stock: {rim.stock}</span>
                                <button onClick={() => { setEditingRim(rim.id); setUpdatedRim(rim); }}>Edit</button>
                                <button onClick={() => handleDeleteRim(rim.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageRims;
