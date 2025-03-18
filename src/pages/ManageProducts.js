import React, { useState, useEffect } from "react";
import api from "../api/api";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "", product_type_id: "" });
    const [editingProduct, setEditingProduct] = useState(null);
    const [updatedProduct, setUpdatedProduct] = useState({ name: "", price: "", stock: "", product_type_id: "" });

    useEffect(() => {
        fetchProducts();
        fetchProductTypes();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get("/product");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchProductTypes = async () => {
        try {
            const response = await api.get("/product-type");
            setProductTypes(response.data);
        } catch (error) {
            console.error("Error fetching product types:", error);
        }
    };

    const handleAddProduct = async () => {
        if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.product_type_id) return;
        try {
            await api.post("/product", newProduct);
            setNewProduct({ name: "", price: "", stock: "", product_type_id: "" });
            fetchProducts();
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const handleEditProduct = async (id) => {
        try {
            await api.put(`/product/${id}`, updatedProduct);
            setEditingProduct(null);
            fetchProducts();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await api.delete(`/product/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="admin-container">
            <h1>Manage Products</h1>

            <div className="input-group">
                <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                />
                <select onChange={(e) => setNewProduct({ ...newProduct, product_type_id: e.target.value })}>
                    <option value="">Select Product Type</option>
                    {productTypes.map((type) => (
                        <option key={type.id} value={type.id}>{type.type}</option>
                    ))}
                </select>
                <button onClick={handleAddProduct}>Add</button>
            </div>

            <ul className="list-group">
                {products.map((product) => (
                    <li key={product.id} className="list-item">
                        {editingProduct === product.id ? (
                            <>
                                <input
                                    type="text"
                                    value={updatedProduct.name}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                                />
                                <input
                                    type="number"
                                    value={updatedProduct.price}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                                />
                                <input
                                    type="number"
                                    value={updatedProduct.stock}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, stock: e.target.value })}
                                />
                                <select onChange={(e) => setUpdatedProduct({ ...updatedProduct, product_type_id: e.target.value })}>
                                    {productTypes.map((type) => (
                                        <option key={type.id} value={type.id} selected={updatedProduct.product_type_id === type.id}>
                                            {type.type}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={() => handleEditProduct(product.id)}>Save</button>
                            </>
                        ) : (
                            <>
                                <span>{product.name} - ${product.price} - Stock: {product.stock} - Type: {product.product_type_id}</span>
                                <button onClick={() => { setEditingProduct(product.id); setUpdatedProduct(product); }}>Edit</button>
                                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageProducts;
