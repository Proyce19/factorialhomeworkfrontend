import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

const BikeDetails = () => {
    const { id } = useParams();
    const [bike, setBike] = useState(null);
    const [chains, setChains] = useState([]);
    const [rims, setRims] = useState([]);
    const [frames, setFrames] = useState([]);
    const [wheels, setWheels] = useState([]);
    const [selectedParts, setSelectedParts] = useState({
        chain: "",
        rim: "",
        frame: "",
        wheel: "",
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get(`/bike/${id}`);
                setBike(response.data);
                setSelectedParts({
                    chain: response.data.chain,
                    rim: response.data.rim,
                    frame: response.data.frame,
                    wheel: response.data.wheel,
                });

                const chainsRes = await api.get("/chain");
                const rimsRes = await api.get("/rim");
                const framesRes = await api.get("/frame");
                const wheelsRes = await api.get("/wheel");

                setChains(chainsRes.data);
                setRims(rimsRes.data);
                setFrames(framesRes.data);
                setWheels(wheelsRes.data);
            } catch (error) {
                console.error("Error fetching bike details:", error);
            }
        }
        fetchData();
    }, [id]);

    const handleCustomization = (e) => {
        setSelectedParts({ ...selectedParts, [e.target.name]: e.target.value });
    };

    const handleAddToCart = async () => {
        try {
            await api.post("/cart", {
                productId: bike.product_id,
            });
            alert("Added to cart!");
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Failed to add to cart.");
        }
    };

    if (!bike) return <p>Loading bike details...</p>;

    return (
        <div className="container">
            <h1>{bike.name}</h1>
            <p><strong>Price:</strong> ${bike.price}</p>
            <p><strong>Stock:</strong> {bike.stock}</p>

            <h2>Customize Your Bike</h2>
            <div className="customization">
                <label>Chain:
                    <select name="chain" value={selectedParts.chain.id} onChange={handleCustomization}>
                        {chains.map((chain) => (
                            <option key={chain.id} value={chain.id}>{chain.type}</option>
                        ))}
                    </select>
                </label>

                <label>Rim:
                    <select name="rim" value={selectedParts.rim.id} onChange={handleCustomization}>
                        {rims.map((rim) => (
                            <option key={rim.id} value={rim.id}>{rim.color}</option>
                        ))}
                    </select>
                </label>

                <label>Frame:
                    <select name="frame" value={selectedParts.frame.id} onChange={handleCustomization}>
                        {frames.map((frame) => (
                            <option key={frame.id} value={frame.id}>{frame.type}</option>
                        ))}
                    </select>
                </label>

                <label>Wheel:
                    <select name="wheel" value={selectedParts.wheel.id} onChange={handleCustomization}>
                        {wheels.map((wheel) => (
                            <option key={wheel.id} value={wheel.id}>{wheel.type}</option>
                        ))}
                    </select>
                </label>
            </div>

            <button onClick={handleAddToCart} disabled={bike.stock < 1}>
                {bike.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
        </div>
    );
};

export default BikeDetails;
