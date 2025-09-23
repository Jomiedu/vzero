"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { fetchProducts, getCategories, type Product } from "@/lib/products"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([fetchProducts(), getCategories()])

        const updatedCategories = categoriesData
          .map((cat) => {
            if (cat.id === "lunchboxes") {
              return { id: "bags", name: "Bags" }
            }
            return cat
          })
          .filter((cat) => cat.id !== "lunchboxes" || cat.id === "bags")

        const updatedProducts = productsData.map((product) => {
          if (product.category === "lunchboxes" || product.name.toLowerCase().includes("bag")) {
            return { ...product, category: "bags" }
          }
          return product
        })

        setProducts(updatedProducts)
        setFilteredProducts(updatedProducts)
        setCategories(updatedCategories)
      } catch (error) {
        console.error("Failed to load products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter((product) => product.category === selectedCategory))
    }
  }, [selectedCategory, products])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our complete collection of quality household products designed to make your life easier.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={
                selectedCategory === category.id
                  ? "bg-jubol-pink hover:bg-jubol-pink/90 text-white"
                  : "bg-white hover:bg-gray-50"
              }
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jubol-pink mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found in this category.</p>
              </div>
            )}
          </>
        )}

        {/* Coming Soon Notice */}
        <div className="bg-white rounded-lg p-8 shadow-sm border-l-4 border-l-jubol-pink">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Coming Soon!</h3>
          <p className="text-gray-600 mb-4">
            Our snack boxes and straw covers are not available on the website yet, but they will be coming soon! In the
            meantime, you can visit our physical store to see these amazing products.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-jubol-pink/10 text-jubol-pink border-jubol-pink">
              Snack Boxes
            </Badge>
            <Badge variant="outline" className="bg-jubol-blue/10 text-jubol-blue border-jubol-blue">
              Straw Covers
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
