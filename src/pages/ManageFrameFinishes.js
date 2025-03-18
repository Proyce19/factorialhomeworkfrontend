import React, { useState, useEffect } from "react";
import api from "../api/api";

const ManageFrameFinishes = () => {
    const [finishes, setFinishes] = useState([]);
    const [newFinish, setNewFinish] = useState("");
    const [editingFinish, setEditingFinish] = useState(null);
    const [updatedFinish, setUpdatedFinish] = useState("");

    useEffect(() => {
        fetchFrameFinishes();
    }, []);

    const fetchFrameFinishes = async () => {
        try {
            const response = await api.get("/frame-finish");
            setFinishes(response.data);
        } catch (error) {
            console.error("Error fetching frame finishes:", error);
        }
    };

    const handleAddFinish = async () => {
        if (!newFinish) return;
        try {
            await api.post("/frame-finish", { finish: newFinish });
            setNewFinish("");
            fetchFrameFinishes();
        } catch (error) {
            console.error("Error adding frame finish:", error);
        }
    };

    const handleEditFinish = async (id) => {
        try {
            await api.put(`/frame-finish/${id}`, { finish: updatedFinish });
            setEditingFinish(null);
            fetchFrameFinishes();
        } catch (error) {
            console.error("Error updating frame finish:", error);
        }
    };

    const handleDeleteFinish = async (id) => {
        try {
            await api.delete(`/frame-finish/${id}`);
            fetchFrameFinishes();
        } catch (error) {
            console.error("Error deleting frame finish:", error);
        }
    };

    return (
        <div className="admin-container">
            <h1>Manage Frame Finishes</h1>

            <div className="input-group">
                <input
                    type="text"
                    placeholder="New Frame Finish"
                    value={newFinish}
                    onChange={(e) => setNewFinish(e.target.value)}
                />
                <button onClick={handleAddFinish}>Add</button>
            </div>

            <ul className="list-group">
                {finishes.map((finish) => (
                    <li key={finish.id} className="list-item">
                        {editingFinish === finish.id ? (
                            <>
                                <input
                                    type="text"
                                    value={updatedFinish}
                                    onChange={(e) => setUpdatedFinish(e.target.value)}
                                />
                                <button onClick={() => handleEditFinish(finish.id)}>Save</button>
                            </>
                        ) : (
                            <>
                                <span>{finish.finish}</span>
                                <button onClick={() => { setEditingFinish(finish.id); setUpdatedFinish(finish.finish); }}>Edit</button>
                                <button onClick={() => handleDeleteFinish(finish.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageFrameFinishes;
