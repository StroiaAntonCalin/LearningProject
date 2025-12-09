import React from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types";
import { FaStar } from "react-icons/fa";

interface CardProps {
  product: Product;
  clickable?: boolean;
}

export const Card: React.FC<CardProps> = ({ product, clickable = true }) => {
  const averageRating =
  product.reviews && product.reviews.length > 0
    ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
    : 0;
  const stars = Math.floor(averageRating);
  const content = (
    <div className="bg-white rounded-lg flex flex-col border border-black overflow-hidden relative">
      <div className="absolute top-2 right-2 flex z-10">
        {Array.from({ length: stars }).map((_, i) => (
        <FaStar key={i} className="text-yellow-500" />
        ))}
      </div>
      <img
        src={product.image}
        alt={product.name}
      />
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-sm text-gray-700">{product.description}</p>
      </div>
    </div>
  );

  if (clickable) {
    return (
      <Link
        to={`/products/${product.id}`}
        className="no-underline"
      >
        {content}
      </Link>
    );
  }

  return content;
};
