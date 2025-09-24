import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { fetchProducts, formatPrice, type Product } from "@/lib/products"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

async function getProduct(id: string): Promise<Product | null> {
  const products = await fetchProducts()
  return products.find((product) => product.id === id) || null
}

async function getRelatedProducts(currentProduct: Product): Promise<Product[]> {
  const products = await fetchProducts()
  return products
    .filter((product) => product.id !== currentProduct.id && product.category === currentProduct.category)
    .slice(0, 4)
}

function getProductImage(product: Product): string {
  const productImageMap: { [key: string]: string } = {
    "BLACK JUBOL BOTTLE BOOT":
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BLACK%20JUBOL%20BOTTLE%20BOOT.PNG-FUGSW5eM4olsfFrzdLprQsX72LH7t7.jpeg",
    "BLACK JUBOL BAG FOR 1.9L JUG":
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BLACK%20JUBOL%20BAG%20FOR%201.9L%20JUG.png-NngDrg6XB9yIgf8NAocVAJwBshldWx.jpeg",
    "BLACK JUBOL COOL BLAST FAN":
      "https://blobs.vusercontent.net/blob/BLACK%20JUBOL%20COOL%20BLAST%20FAN.png-RhrjV5I56WgMYnpR5BgVdl7vesglhB.jpeg",
    "Cream Jubol Silicone Quencher Divider":
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CREAM%20JUBOL%20SILICONE%20QUENCHER%20DIVIDER.PNG-zzanMsbX7beVtRVAxQvgihcc5QftAL.jpeg",
    // ... add more mappings as needed
  }

  return (
    productImageMap[product.name] ||
    product.image ||
    `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(product.name)}`
  )
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Back to Products Link */}
        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-jubol-blue hover:text-jubol-pink transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-50">
              <Image
                src={getProductImage(product) || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {product.featured && <Badge className="absolute top-4 left-4 bg-jubol-pink text-white">Featured</Badge>}
              {!product.inStock && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    Out of Stock
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(4.8/5 - 124 reviews)</span>
              </div>
              <div className="text-3xl font-bold text-jubol-blue mb-4">{formatPrice(product.price)}</div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Category</h3>
              <Badge variant="outline" className="capitalize">
                {product.category.replace("-", " ")}
              </Badge>
            </div>

            {/* Product Features */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 bg-jubol-pink rounded-full" />
                  High-quality materials and construction
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 bg-jubol-pink rounded-full" />
                  Durable and long-lasting design
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 bg-jubol-pink rounded-full" />
                  Perfect for everyday use
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 bg-jubol-pink rounded-full" />
                  Easy to clean and maintain
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <AddToCartButton product={product} className="flex-1 bg-jubol-pink hover:bg-jubol-pink/90 text-white" />
              <Button variant="outline" size="lg" className="px-6 bg-transparent">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 text-sm">
              <div className={`h-2 w-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
              <span className={product.inStock ? "text-green-600" : "text-red-600"}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group hover:shadow-lg transition-all duration-300">
                  <Link href={`/products/${relatedProduct.id}`}>
                    <div className="aspect-square relative overflow-hidden rounded-t-lg bg-gray-50">
                      <Image
                        src={getProductImage(relatedProduct) || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <Link href={`/products/${relatedProduct.id}`}>
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-jubol-blue transition-colors">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    <div className="text-lg font-bold text-jubol-blue">{formatPrice(relatedProduct.price)}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
