import React, { useState, useEffect } from "react";
import api from "../api/api";

const ManageFrameTypes = () => {
    const [frameTypes, setFrameTypes] = useState([]);
    const [newType, setNewType] = useState("");
    const [editingType, setEditingType] = useState(null);
    const [updatedType, setUpdatedType] = useState("");

    useEffect(() => {
        fetchFrameTypes();
    }, []);

    const fetchFrameTypes = async () => {
        try {
            const response = await api.get("/frame-type");
            setFrameTypes(response.data);
        } catch (error) {
            console.error("Error fetching frame types:", error);
        }
    };

    const handleAddFrameType = async () => {
        if (!newType) return;
        try {
            await api.post("/frame-type", { type: newType });
            setNewType("");
            fetchFrameTypes();
        } catch (error) {
            console.error("Error adding frame type:", error);
        }
    };

    const handleEditFrameType = async (id) => {
        try {
            await api.put(`/frame-type/${id}`, { type: updatedType });
            setEditingType(null);
            fetchFrameTypes();
        } catch (error) {
            console.error("Error updating frame type:", error);
        }
    };

    const handleDeleteFrameType = async (id) => {
        try {
            await api.delete(`/frame-type/${id}`);
            fetchFrameTypes();
        } catch (error) {
            console.error("Error deleting frame type:", error);
        }
    };

    return (
        <div className="admin-container">
            <h1>Manage Frame Types</h1>

            <div className="input-group">
                <input
                    type="text"
                    placeholder="New Frame Type"
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                />
                <button onClick={handleAddFrameType}>Add</button>
            </div>

            <ul className="list-group">
                {frameTypes.map((type) => (
                    <li key={type.id} className="list-item">
                        {editingType === type.id ? (
                            <>
                                <input
                                    type="text"
                                    value={updatedType}
                                    onChange={(e) => setUpdatedType(e.target.value)}
                                />
                                <button onClick={() => handleEditFrameType(type.id)}>Save</button>
                            </>
                        ) : (
                            <>
                                <span>{type.type}</span>
                                <button onClick={() => { setEditingType(type.id); setUpdatedType(type.type); }}>Edit</button>
                                <button onClick={() => handleDeleteFrameType(type.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageFrameTypes;
