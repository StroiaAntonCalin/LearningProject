import React, { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchProduct, addReview } from "../api";
import type { Product } from "../types";
import { FaStar } from "react-icons/fa";
import { Card } from "../components/Card";

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useQuery<Product | null>({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId as string),
    enabled: !!productId,
  });

  const { mutateAsync: addReviewMutation } = useMutation({
    mutationFn: (variables: { text: string; rating: number }) =>
      addReview(productId as string, variables.text, variables.rating),
    onSuccess: (updatedProduct) => {
      queryClient.setQueryData(["product", productId], updatedProduct);
    },
  });

  const handleAddReview = async (text: string, rating: number) => {
    if (!productId) return;
    await addReviewMutation({ text, rating });
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError(null);

    if (!reviewText.trim()) {
      setReviewError("Text is mandatory");
      return;
    }

    try {
      setReviewLoading(true);
      await handleAddReview(reviewText, reviewRating);
      setReviewText("");
      setReviewRating(5);
    } catch (err: any) {
      setReviewError(err?.message);
    } finally {
      setReviewLoading(false);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
    if (reviewError) setReviewError(null);
  };

  if (productLoading) {
    return (
      <div className="p-4 text-center text-gray-600">
        Loading...
      </div>
    );
  }

  if (productError) {
    return (
      <div className="p-4 text-center text-red-600">
        Error
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-4 text-center text-gray-600">
        Product not found.
      </div>
    );
  }

return (
  <div className="p-4">
    <div className="grid gap-6 items-start max-w-[1100px] mx-auto md:grid-cols-2">
        <div>
          <h2 className="mb-10 text-center text-3xl font-bold">
            Product
          </h2>
          <Card product={product} clickable={false} />
          <form onSubmit={handleSubmitReview} className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Add review:</h3>
          <div className="mb-4 relative">
            <label>
             <textarea
               value={reviewText}
               onChange={handleTextChange}
               rows={10}
               maxLength={500}
               className="w-full resize-none rounded-lg border border-gray-300 p-2"
              />
            </label>
            <span className="absolute -bottom-5 right-0 text-sm text-gray-500">
             {reviewText.length} / 500
           </span>
            {reviewError && (
              <p className="mt-2 text-red-600">{reviewError}</p>
            )}
          </div>
            <div className="mb-4 flex items-center gap-4">
              <label className="font-medium">
                Rating (1-5):
              </label>
              <select
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
                className="rounded-lg border border-gray-300 p-2"
              >
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={reviewLoading}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {reviewLoading ? "Loading..." : "Send Review"}
            </button>
          </form>
        </div>
        <div>
          <h2 className="mb-10 text-center text-3xl font-bold">
            Reviews
          </h2>
          {product.reviews.length ? (
            <section>
              <ul className="list-none space-y-4">
                {product.reviews.map((review) => (
                  <li
                    key={review.id}
                    className="bg-white p-4 rounded-md shadow border border-gray-200"
                  >
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                   <FaStar key={i} />
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
          ) : (
            <p className="text-gray-600">
              No reviews.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
