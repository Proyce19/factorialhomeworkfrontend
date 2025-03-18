import React, { useState, useEffect } from "react";
import api from "../api/api";

const ManageFrames = () => {
    const [frames, setFrames] = useState([]);
    const [frameTypes, setFrameTypes] = useState([]);
    const [frameFinishes, setFrameFinishes] = useState([]);
    const [newFrame, setNewFrame] = useState({ frame_type_id: "", frame_finish_id: "", price: "", stock: "" });
    const [editingFrame, setEditingFrame] = useState(null);
    const [updatedFrame, setUpdatedFrame] = useState({ frame_type_id: "", frame_finish_id: "", price: "", stock: "" });

    useEffect(() => {
        fetchFrames();
        fetchFrameTypes();
        fetchFrameFinishes();
    }, []);

    const fetchFrames = async () => {
        try {
            const response = await api.get("/frame");
            setFrames(response.data);
        } catch (error) {
            console.error("Error fetching frames:", error);
        }
    };

    const fetchFrameTypes = async () => {
        try {
            const response = await api.get("/frame-types");
            setFrameTypes(response.data);
        } catch (error) {
            console.error("Error fetching frame types:", error);
        }
    };

    const fetchFrameFinishes = async () => {
        try {
            const response = await api.get("/frame-finish");
            setFrameFinishes(response.data);
        } catch (error) {
            console.error("Error fetching frame finishes:", error);
        }
    };

    const handleAddFrame = async () => {
        if (!newFrame.frame_type_id || !newFrame.frame_finish_id || !newFrame.price || !newFrame.stock) return;
        try {
            await api.post("/frame", newFrame);
            setNewFrame({ frame_type_id: "", frame_finish_id: "", price: "", stock: "" });
            fetchFrames();
        } catch (error) {
            console.error("Error adding frame:", error);
        }
    };

    const handleEditFrame = async (id) => {
        try {
            await api.put(`/frame/${id}`, updatedFrame);
            setEditingFrame(null);
            fetchFrames();
        } catch (error) {
            console.error("Error updating frame:", error);
        }
    };

    const handleDeleteFrame = async (id) => {
        try {
            await api.delete(`/frame/${id}`);
            fetchFrames();
        } catch (error) {
            console.error("Error deleting frame:", error);
        }
    };

    return (
        <div className="admin-container">
            <h1>Manage Frames</h1>

            <div className="input-group">
                <select onChange={(e) => setNewFrame({ ...newFrame, frame_type_id: e.target.value })}>
                    <option value="">Select Frame Type</option>
                    {frameTypes.map((type) => (
                        <option key={type.id} value={type.id}>{type.type}</option>
                    ))}
                </select>

                <select onChange={(e) => setNewFrame({ ...newFrame, frame_finish_id: e.target.value })}>
                    <option value="">Select Frame Finish</option>
                    {frameFinishes.map((finish) => (
                        <option key={finish.id} value={finish.id}>{finish.finish}</option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Price"
                    value={newFrame.price}
                    onChange={(e) => setNewFrame({ ...newFrame, price: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={newFrame.stock}
                    onChange={(e) => setNewFrame({ ...newFrame, stock: e.target.value })}
                />
                <button onClick={handleAddFrame}>Add</button>
            </div>

            <ul className="list-group">
                {frames.map((frame) => (
                    <li key={frame.id} className="list-item">
                        {editingFrame === frame.id ? (
                            <>
                                <select onChange={(e) => setUpdatedFrame({ ...updatedFrame, frame_type_id: e.target.value })}>
                                    {frameTypes.map((type) => (
                                        <option key={type.id} value={type.id} selected={updatedFrame.frame_type_id === type.id}>
                                            {type.type}
                                        </option>
                                    ))}
                                </select>

                                <select onChange={(e) => setUpdatedFrame({ ...updatedFrame, frame_finish_id: e.target.value })}>
                                    {frameFinishes.map((finish) => (
                                        <option key={finish.id} value={finish.id} selected={updatedFrame.frame_finish_id === finish.id}>
                                            {finish.finish}
                                        </option>
                                    ))}
                                </select>

                                <input
                                    type="number"
                                    value={updatedFrame.price}
                                    onChange={(e) => setUpdatedFrame({ ...updatedFrame, price: e.target.value })}
                                />
                                <input
                                    type="number"
                                    value={updatedFrame.stock}
                                    onChange={(e) => setUpdatedFrame({ ...updatedFrame, stock: e.target.value })}
                                />
                                <button onClick={() => handleEditFrame(frame.id)}>Save</button>
                            </>
                        ) : (
                            <>
                <span>
                  {frame.frame_type_id} - {frame.frame_finish_id} - ${frame.price} - Stock: {frame.stock}
                </span>
                                <button onClick={() => { setEditingFrame(frame.id); setUpdatedFrame(frame); }}>Edit</button>
                                <button onClick={() => handleDeleteFrame(frame.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageFrames;
