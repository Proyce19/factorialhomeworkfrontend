import React, { useState, useEffect } from "react";
import api from "../api/api";

const ManageValidCombinations = () => {
    const [combinations, setCombinations] = useState([]);
    const [frames, setFrames] = useState([]);
    const [chains, setChains] = useState([]);
    const [rims, setRims] = useState([]);
    const [wheels, setWheels] = useState([]);
    const [newCombination, setNewCombination] = useState({ frame_id: "", chain_id: "", rim_id: "", wheel_id: "" });
    const [editingCombination, setEditingCombination] = useState(null);
    const [updatedCombination, setUpdatedCombination] = useState({ frame_id: "", chain_id: "", rim_id: "", wheel_id: "" });

    useEffect(() => {
        fetchCombinations();
        fetchFrames();
        fetchChains();
        fetchRims();
        fetchWheels();
    }, []);

    const fetchCombinations = async () => {
        try {
            const response = await api.get("/valid-combinations");
            setCombinations(response.data);
        } catch (error) {
            console.error("Error fetching valid combinations:", error);
        }
    };

    const fetchFrames = async () => {
        try {
            const response = await api.get("/frame");
            setFrames(response.data);
        } catch (error) {
            console.error("Error fetching frames:", error);
        }
    };

    const fetchChains = async () => {
        try {
            const response = await api.get("/chain");
            setChains(response.data);
        } catch (error) {
            console.error("Error fetching chains:", error);
        }
    };

    const fetchRims = async () => {
        try {
            const response = await api.get("/rim");
            setRims(response.data);
        } catch (error) {
            console.error("Error fetching rims:", error);
        }
    };

    const fetchWheels = async () => {
        try {
            const response = await api.get("/wheel");
            setWheels(response.data);
        } catch (error) {
            console.error("Error fetching wheels:", error);
        }
    };

    const handleAddCombination = async () => {
        if (!newCombination.frame_id || !newCombination.chain_id || !newCombination.rim_id || !newCombination.wheel_id) return;
        try {
            await api.post("/valid-combinations", newCombination);
            setNewCombination({ frame_id: "", chain_id: "", rim_id: "", wheel_id: "" });
            fetchCombinations();
        } catch (error) {
            console.error("Error adding combination:", error);
        }
    };

    const handleEditCombination = async (id) => {
        try {
            await api.put(`/valid-combinations/${id}`, updatedCombination);
            setEditingCombination(null);
            fetchCombinations();
        } catch (error) {
            console.error("Error updating combination:", error);
        }
    };

    const handleDeleteCombination = async (id) => {
        try {
            await api.delete(`/valid-combinations/${id}`);
            fetchCombinations();
        } catch (error) {
            console.error("Error deleting combination:", error);
        }
    };

    return (
        <div className="admin-container">
            <h1>Manage Valid Combinations</h1>

            {/* Add New Valid Combination */}
            <div className="input-group">
                <select onChange={(e) => setNewCombination({ ...newCombination, frame_id: e.target.value })}>
                    <option value="">Select Frame</option>
                    {frames.map((frame) => (
                        <option key={frame.id} value={frame.id}>{frame.type}</option>
                    ))}
                </select>

                <select onChange={(e) => setNewCombination({ ...newCombination, chain_id: e.target.value })}>
                    <option value="">Select Chain</option>
                    {chains.map((chain) => (
                        <option key={chain.id} value={chain.id}>{chain.type}</option>
                    ))}
                </select>

                <select onChange={(e) => setNewCombination({ ...newCombination, rim_id: e.target.value })}>
                    <option value="">Select Rim</option>
                    {rims.map((rim) => (
                        <option key={rim.id} value={rim.id}>{rim.color}</option>
                    ))}
                </select>

                <select onChange={(e) => setNewCombination({ ...newCombination, wheel_id: e.target.value })}>
                    <option value="">Select Wheel</option>
                    {wheels.map((wheel) => (
                        <option key={wheel.id} value={wheel.id}>{wheel.type}</option>
                    ))}
                </select>

                <button onClick={handleAddCombination}>Add</button>
            </div>

            {/* List of Valid Combinations */}
            <ul className="list-group">
                {combinations.map((combination) => (
                    <li key={combination.id} className="list-item">
                        {editingCombination === combination.id ? (
                            <>
                                <select onChange={(e) => setUpdatedCombination({ ...updatedCombination, frame_id: e.target.value })}>
                                    {frames.map((frame) => (
                                        <option key={frame.id} value={frame.id} selected={updatedCombination.frame_id === frame.id}>
                                            {frame.type}
                                        </option>
                                    ))}
                                </select>

                                <select onChange={(e) => setUpdatedCombination({ ...updatedCombination, chain_id: e.target.value })}>
                                    {chains.map((chain) => (
                                        <option key={chain.id} value={chain.id} selected={updatedCombination.chain_id === chain.id}>
                                            {chain.type}
                                        </option>
                                    ))}
                                </select>

                                <select onChange={(e) => setUpdatedCombination({ ...updatedCombination, rim_id: e.target.value })}>
                                    {rims.map((rim) => (
                                        <option key={rim.id} value={rim.id} selected={updatedCombination.rim_id === rim.id}>
                                            {rim.color}
                                        </option>
                                    ))}
                                </select>

                                <select onChange={(e) => setUpdatedCombination({ ...updatedCombination, wheel_id: e.target.value })}>
                                    {wheels.map((wheel) => (
                                        <option key={wheel.id} value={wheel.id} selected={updatedCombination.wheel_id === wheel.id}>
                                            {wheel.type}
                                        </option>
                                    ))}
                                </select>

                                <button onClick={() => handleEditCombination(combination.id)}>Save</button>
                            </>
                        ) : (
                            <>
                <span>
                  Frame: {combination.frame_id} | Chain: {combination.chain_id} | Rim: {combination.rim_id} | Wheel: {combination.wheel_id}
                </span>
                                <button onClick={() => { setEditingCombination(combination.id); setUpdatedCombination(combination); }}>Edit</button>
                                <button onClick={() => handleDeleteCombination(combination.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageValidCombinations;
