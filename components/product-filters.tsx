"use client"

import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Product } from "@/lib/products"

interface ProductFiltersProps {
  selectedCategory: string
  sortBy: string
  onCategoryChange: (category: string) => void
  onSortChange: (sort: string) => void
  products: Product[]
}

export function ProductFilters({
  selectedCategory,
  sortBy,
  onCategoryChange,
  onSortChange,
  products,
}: ProductFiltersProps) {
  const categories = useMemo(() => {
    const categorySet = new Set(products.map((p) => p.category))

    return [
      { id: "all", name: "All Products" },
      ...Array.from(categorySet).map((cat) => ({
        id: cat,
        name: cat
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      })),
    ]
  }, [products])

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className="bg-transparent"
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Sort Options */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            <SelectItem value="price-asc">Price (Low to High)</SelectItem>
            <SelectItem value="price-desc">Price (High to Low)</SelectItem>
            <SelectItem value="featured">Featured First</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
