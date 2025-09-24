"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/products"
import { cn } from "@/lib/utils"

interface AddToCartButtonProps {
  product: Product
  className?: string
  size?: "sm" | "lg" | "default"
}

export function AddToCartButton({ product, className, size = "lg" }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useCart()

  const handleAddToCart = async () => {
    if (!product.inStock) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    dispatch({ type: "ADD_ITEM", payload: product })
    setIsLoading(false)
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={!product.inStock || isLoading}
      size={size}
      className={cn("gap-2", className)}
    >
      <ShoppingCart className="h-5 w-5" />
      {isLoading ? "Adding..." : "Add to Cart"}
    </Button>
  )
}
