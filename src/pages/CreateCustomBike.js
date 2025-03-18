import React, { useState, useEffect } from "react";
import api from "../api/api";

const CreateCustomBike = () => {
    const [frames, setFrames] = useState([]);
    const [wheels, setWheels] = useState([]);
    const [chains, setChains] = useState([]);
    const [rims, setRims] = useState([]);
    const [customBike, setCustomBike] = useState({
        frame: "",
        wheel: "",
        chain: "",
        rim: "",
    });

    useEffect(() => {
        async function fetchParts() {
            try {
                const framesRes = await api.get("/frame");
                const wheelsRes = await api.get("/wheel");
                const chainsRes = await api.get("/chain");
                const rimsRes = await api.get("/rim");

                setFrames(framesRes.data);
                setWheels(wheelsRes.data);
                setChains(chainsRes.data);
                setRims(rimsRes.data);
            } catch (error) {
                console.error("Error fetching bike parts:", error);
            }
        }
        fetchParts();
    }, []);

    const handleChange = (e) => {
        setCustomBike({ ...customBike, [e.target.name]: e.target.value });
    };

    const handleCreate = async () => {
        try {
            const response = await api.post("/custom-bike", customBike);
            await api.post("/cart", { productId: response.data.product_id });
            alert("Custom bike added to cart!");
        } catch (error) {
            console.error("Error creating custom bike:", error);
            alert("Failed to create custom bike.");
        }
    };

    return (
        <div className="container">
            <h1>Create Your Custom Bike</h1>

            <div className="custom-form">
                <label>Frame:
                    <select name="frame" value={customBike.frame} onChange={handleChange}>
                        <option value="">Select Frame</option>
                        {frames.map((frame) => (
                            <option key={frame.id} value={frame.id}>{frame.type}</option>
                        ))}
                    </select>
                </label>

                <label>Wheel:
                    <select name="wheel" value={customBike.wheel} onChange={handleChange}>
                        <option value="">Select Wheel</option>
                        {wheels.map((wheel) => (
                            <option key={wheel.id} value={wheel.id}>{wheel.type}</option>
                        ))}
                    </select>
                </label>

                <label>Chain:
                    <select name="chain" value={customBike.chain} onChange={handleChange}>
                        <option value="">Select Chain</option>
                        {chains.map((chain) => (
                            <option key={chain.id} value={chain.id}>{chain.type}</option>
                        ))}
                    </select>
                </label>

                <label>Rim:
                    <select name="rim" value={customBike.rim} onChange={handleChange}>
                        <option value="">Select Rim</option>
                        {rims.map((rim) => (
                            <option key={rim.id} value={rim.id}>{rim.color}</option>
                        ))}
                    </select>
                </label>
            </div>

            <button onClick={handleCreate} disabled={!customBike.frame || !customBike.wheel || !customBike.chain || !customBike.rim}>
                Create Custom Bike
            </button>
        </div>
    );
};

export default CreateCustomBike;
