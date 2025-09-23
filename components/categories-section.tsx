"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Fan, Coffee, Package, Shield, Utensils, Star as Straw, Box, Shirt } from "lucide-react"
import { useEffect, useState } from "react"
import { fetchCategories } from "@/lib/products"

const categoryIcons: Record<string, any> = {
  Fans: Fan,
  Bottles: Coffee,
  Lunchboxes: Package,
  "Snack Boxes": Utensils,
  "Silicone Covers": Shield,
  "Straw Covers": Straw,
  Accessories: Box,
  Clothing: Shirt,
  default: Package,
}

const categoryColors = [
  { color: "text-primary", bgColor: "bg-primary/10" },
  { color: "text-secondary", bgColor: "bg-secondary/10" },
  { color: "text-accent", bgColor: "bg-accent/10" },
  { color: "text-chart-4", bgColor: "bg-chart-4/10" },
  { color: "text-chart-5", bgColor: "bg-chart-5/10" },
  { color: "text-chart-1", bgColor: "bg-chart-1/10" },
]

export function CategoriesSection() {
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryList = await fetchCategories()
        setCategories(categoryList)
      } catch (error) {
        console.error("Failed to load categories:", error)
        // Fallback categories
        setCategories(["Fans", "Bottles", "Lunchboxes", "Snack Boxes", "Silicone Covers", "Straw Covers"])
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">
              Shop by <span className="text-primary">Category</span>
            </h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">Loading categories...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">
            Shop by <span className="text-primary">Category</span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Find exactly what you need from our carefully curated collection of household essentials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((categoryName, index) => {
            const IconComponent = categoryIcons[categoryName] || categoryIcons.default
            const colorScheme = categoryColors[index % categoryColors.length]
            const href = `/shop?category=${encodeURIComponent(categoryName)}`

            return (
              <Link key={categoryName} href={href}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20">
                  <CardContent className="p-8 text-center space-y-4">
                    <div
                      className={`w-16 h-16 mx-auto rounded-2xl ${colorScheme.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className={`h-8 w-8 ${colorScheme.color}`} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {categoryName}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Explore our {categoryName.toLowerCase()} collection
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
