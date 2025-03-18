import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import BikeDetails from "./BikeDetails";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import CreateCustomBike from "./CreateCustomBike";
import AdminDashboard from "./AdminDashboard";
import ManageProductTypes from "./ManageProductTypes";
import ManageProducts from "./ManageProducts";
import ManageFrameTypes from "./ManageFrameTypes";
import ManageFrameFinishes from "./ManageFrameFinishes";
import ManageFrames from "./ManageFrames";
import ManageWheels from "./ManageWheels";
import ManageChains from "./ManageChains";
import ManageRims from "./ManageRims";
import ManageValidCombinations from "./ManageValidCombinations";
import ManageBikes from "./ManageBikes";
import Login from "./Login";
import PrivateRoute from "../components/PrivateRoute";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bike/:id" element={<BikeDetails />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/custom-bike" element={<CreateCustomBike />} />
            <Route path="/login" element={<Login />} />

            <Route element={<PrivateRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/manage-product-types" element={<ManageProductTypes />} />
                <Route path="/admin/manage-products" element={<ManageProducts />} />
                <Route path="/admin/manage-frame-types" element={<ManageFrameTypes />} />
                <Route path="/admin/manage-frame-finishes" element={<ManageFrameFinishes />} />
                <Route path="/admin/manage-frames" element={<ManageFrames />} />
                <Route path="/admin/manage-wheels" element={<ManageWheels />} />
                <Route path="/admin/manage-chains" element={<ManageChains />} />
                <Route path="/admin/manage-rims" element={<ManageRims />} />
                <Route path="/admin/manage-valid-combinations" element={<ManageValidCombinations />} />
                <Route path="/admin/manage-bikes" element={<ManageBikes />} />
            </Route>
        </Routes>
    );
}

export default App;
