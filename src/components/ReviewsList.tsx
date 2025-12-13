import React from "react";
import { FaStar } from "react-icons/fa";
import type { Review } from "../types";

interface ReviewsListProps {
  reviews: Review[];
}

export const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  return (
    <section>
      <ul className="list-none space-y-4">
        {reviews.map((review) => (
          <li
            key={review.id}
            className="bg-white p-4 rounded-md shadow border border-gray-200"
          >
            <div className="flex items-center gap-1">
              {[...Array(review.rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500" />
              ))}
            </div>
            <p className="mt-1">{review.text}</p>
            <small className="text-gray-500">
              {new Date(review.createdAt).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
    </section>
  );
};
