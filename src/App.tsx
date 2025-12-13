import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProductsGridPage } from "./pages/ProductsGridPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsGridPage />} />
      <Route path="/products/:productId" element={<ProductDetailsPage />} />
    </Routes>
  );
};
