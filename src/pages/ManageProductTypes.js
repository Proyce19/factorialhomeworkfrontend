import React, { useState, useEffect } from "react";
import api from "../api/api";

const ManageProductTypes = () => {
    const [productTypes, setProductTypes] = useState([]);
    const [newType, setNewType] = useState("");
    const [editingType, setEditingType] = useState(null);
    const [updatedType, setUpdatedType] = useState("");

    useEffect(() => {
        fetchProductTypes();
    }, []);

    const fetchProductTypes = async () => {
        try {
            const response = await api.get("/product-type");
            setProductTypes(response.data);
        } catch (error) {
            console.error("Error fetching product types:", error);
        }
    };

    const handleAddProductType = async () => {
        if (!newType) return;
        try {
            await api.post("/product-type", { type: newType });
            setNewType("");
            fetchProductTypes();
        } catch (error) {
            console.error("Error adding product type:", error);
        }
    };

    const handleEditProductType = async (id) => {
        try {
            await api.put(`/product-type/${id}`, { type: updatedType });
            setEditingType(null);
            fetchProductTypes();
        } catch (error) {
            console.error("Error updating product type:", error);
        }
    };

    const handleDeleteProductType = async (id) => {
        try {
            await api.delete(`/product-type/${id}`);
            fetchProductTypes();
        } catch (error) {
            console.error("Error deleting product type:", error);
        }
    };

    return (
        <div className="admin-container">
            <h1>Manage Product Types</h1>

            <div className="input-group">
                <input
                    type="text"
                    placeholder="New Product Type"
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                />
                <button onClick={handleAddProductType}>Add</button>
            </div>

            <ul className="list-group">
                {productTypes.map((type) => (
                    <li key={type.id} className="list-item">
                        {editingType === type.id ? (
                            <>
                                <input
                                    type="text"
                                    value={updatedType}
                                    onChange={(e) => setUpdatedType(e.target.value)}
                                />
                                <button onClick={() => handleEditProductType(type.id)}>Save</button>
                            </>
                        ) : (
                            <>
                                <span>{type.type}</span>
                                <button onClick={() => { setEditingType(type.id); setUpdatedType(type.type); }}>Edit</button>
                                <button onClick={() => handleDeleteProductType(type.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageProductTypes;
