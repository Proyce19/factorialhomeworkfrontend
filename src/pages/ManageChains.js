import React, { useState, useEffect } from "react";
import api from "../api/api";

const ManageChains = () => {
    const [chains, setChains] = useState([]);
    const [newChain, setNewChain] = useState({ type: "", price: "", stock: "" });
    const [editingChain, setEditingChain] = useState(null);
    const [updatedChain, setUpdatedChain] = useState({ type: "", price: "", stock: "" });

    useEffect(() => {
        fetchChains();
    }, []);

    const fetchChains = async () => {
        try {
            const response = await api.get("/chain");
            setChains(response.data);
        } catch (error) {
            console.error("Error fetching chains:", error);
        }
    };

    const handleAddChain = async () => {
        if (!newChain.type || !newChain.price || !newChain.stock) return;
        try {
            await api.post("/chain", newChain);
            setNewChain({ type: "", price: "", stock: "" });
            fetchChains();
        } catch (error) {
            console.error("Error adding chain:", error);
        }
    };

    const handleEditChain = async (id) => {
        try {
            await api.put(`/chain/${id}`, updatedChain);
            setEditingChain(null);
            fetchChains();
        } catch (error) {
            console.error("Error updating chain:", error);
        }
    };

    const handleDeleteChain = async (id) => {
        try {
            await api.delete(`/chain/${id}`);
            fetchChains();
        } catch (error) {
            console.error("Error deleting chain:", error);
        }
    };

    return (
        <div className="admin-container">
            <h1>Manage Chains</h1>

            <div className="input-group">
                <input
                    type="text"
                    placeholder="Chain Type"
                    value={newChain.type}
                    onChange={(e) => setNewChain({ ...newChain, type: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newChain.price}
                    onChange={(e) => setNewChain({ ...newChain, price: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={newChain.stock}
                    onChange={(e) => setNewChain({ ...newChain, stock: e.target.value })}
                />
                <button onClick={handleAddChain}>Add</button>
            </div>

            <ul className="list-group">
                {chains.map((chain) => (
                    <li key={chain.id} className="list-item">
                        {editingChain === chain.id ? (
                            <>
                                <input
                                    type="text"
                                    value={updatedChain.type}
                                    onChange={(e) => setUpdatedChain({ ...updatedChain, type: e.target.value })}
                                />
                                <input
                                    type="number"
                                    value={updatedChain.price}
                                    onChange={(e) => setUpdatedChain({ ...updatedChain, price: e.target.value })}
                                />
                                <input
                                    type="number"
                                    value={updatedChain.stock}
                                    onChange={(e) => setUpdatedChain({ ...updatedChain, stock: e.target.value })}
                                />
                                <button onClick={() => handleEditChain(chain.id)}>Save</button>
                            </>
                        ) : (
                            <>
                                <span>{chain.type} - ${chain.price} - Stock: {chain.stock}</span>
                                <button onClick={() => { setEditingChain(chain.id); setUpdatedChain(chain); }}>Edit</button>
                                <button onClick={() => handleDeleteChain(chain.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageChains;
