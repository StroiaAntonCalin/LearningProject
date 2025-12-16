import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api";
import { Card } from "../components/Card";
import { Header } from "../components/Header";

export const ProductsGridPage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filterBy, setFilterBy] = useState<"name" | "description">("name");
  const [filterQuery, setFilterQuery] = useState(""); // draft input
  const [appliedFilterQuery, setAppliedFilterQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const filterButtonRef = useRef<HTMLButtonElement | null>(null);
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    if (!showFilters) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !dropdownRef.current?.contains(target) &&
        !filterButtonRef.current?.contains(target)
      ) {
        setShowFilters(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
  }, [showFilters]);

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error instanceof Error) {
    return <div className="p-4 text-red-600">Error: {error.message}</div>;
  }

  const filtered = (() => {
    if (!products) return [];
    const q = appliedFilterQuery;
    return products.filter((p) => {
      if (filterBy === "name") return p.name.includes(q);
      return p.description.includes(q);
    });
  })();

  return (
    <>
      <Header
        text="Products"
        onFilterClick={() => setShowFilters((s) => !s)}
        filterButtonRef={filterButtonRef}
      />
      {showFilters && (
        <div
          ref={dropdownRef}
          className="fixed left-20 top-16 z-50 bg-white rounded shadow p-3 min-w-auto"
        >
          <div className="flex items-center gap-3">
            <label className="font-medium whitespace-nowrap">Filter by:</label>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as any)}
              className="rounded border p-1 cursor-pointer"
            >
              <option value="name">Name</option>
              <option value="description">Description</option>
            </select>

            <input
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search..."
              className="rounded border p-1"
            />

            <button
              onClick={() => {
                setFilterQuery("");
                setAppliedFilterQuery("");
                setShowFilters(false);
              }}
              className="rounded border px-3 py-1 cursor-pointer"
            >
              Clear
            </button>
            <button
              onClick={() => {
                setAppliedFilterQuery(filterQuery);
                setShowFilters(false);
              }}
              className="rounded bg-blue-500 text-white px-3 py-1 cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>
      )}
      <div className="pt-25 px-6">
        <div className="grid grid-cols-4 gap-8 mx-auto w-full">
          {filtered.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};
