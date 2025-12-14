import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api";
import { Card } from "../components/Card";
import { Header } from "../components/Header";

export const ProductsGridPage: React.FC = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error instanceof Error) {
    return <div className="p-4 text-red-600">Error: {error.message}</div>;
  }

  return (
    <>
      <Header text="Products" />
      <div className="grid grid-cols-4 gap-8 mx-auto w-full">
        {products?.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
