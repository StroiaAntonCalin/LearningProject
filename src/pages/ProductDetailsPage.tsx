import React, { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchProduct, addReview } from "../api";
import type { Product } from "../types";
import { Card } from "../components/Card";
import { ReviewsList } from "../components/ReviewsList";
import { Header } from "../components/Header";
import SideDrawer from "../components/SideDrawer";

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const draftKey = `review`;
  const queryClient = useQueryClient();

  const { data: product, error: productError } = useQuery<Product | null>({
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

  const handleAddReview = (text: string, rating: number) => {
    if (!productId) return;
    addReviewMutation({ text, rating });
  };

  const handleTextChange = (t: string) => {
    setReviewText(t);
    localStorage.setItem(
      draftKey,
      JSON.stringify({ text: t, rating: reviewRating }),
    );
  };

  const handleRatingChange = (r: number) => {
    setReviewRating(r);
    localStorage.setItem(
      draftKey,
      JSON.stringify({ text: reviewText, rating: r }),
    );
  };
  const closeDrawer = (persistDraft = false) => {
    setDrawerOpen(false);
    if (!persistDraft) {
      localStorage.removeItem(draftKey);
      setReviewText("");
      setReviewRating(5);
    }
  };

  const confirmSend = () => {
    handleAddReview(reviewText, reviewRating);
    localStorage.removeItem(draftKey);
    setReviewText("");
    setReviewRating(5);
    setDrawerOpen(false);
  };

  if (productError) {
    return <div className="p-4 text-center text-red-600">Error</div>;
  }

  if (!product) {
    return (
      <div className="p-4 text-center text-gray-600">Product not found.</div>
    );
  }

  return (
    <>
      <Header text="Product" text2="Reviews" />
      <div className="grid gap-6 items-start max-w-[1100px] mx-auto grid-cols-2">
        <div className="pt-25">
          <Card product={product} clickable={false} />
          <div className="mt-6">
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => {
                  localStorage.setItem(
                    draftKey,
                    JSON.stringify({ text: reviewText, rating: reviewRating }),
                  );
                  setDrawerOpen(true);
                }}
                className="rounded-lg bg-blue-500 px-4 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                Add Review
              </button>
            </div>
          </div>
        </div>
        <div className="pt-25">
          {product.reviews.length ? (
            <ReviewsList reviews={product.reviews} />
          ) : (
            <p className="text-gray-600">No reviews.</p>
          )}
        </div>
      </div>
      <SideDrawer
        open={drawerOpen}
        onClose={closeDrawer}
        onSend={confirmSend}
        text={reviewText}
        rating={reviewRating}
        onTextChange={(t) => handleTextChange(t)}
        onRatingChange={(r) => handleRatingChange(r)}
      />
    </>
  );
};
