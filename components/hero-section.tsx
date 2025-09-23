import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-jubol-pink/5 via-jubol-blue/5 to-pink-100/20 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                <span className="text-jubol-blue">Affordable</span> and <span className="text-jubol-pink">Quality</span>{" "}
                Products for <span className="text-jubol-black">Everyday Living</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Discover our collection of fans, bottles, lunchboxes, snack boxes, and more. Quality household
                essentials that make your daily life better.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg px-8 bg-jubol-pink hover:bg-jubol-pink/90 text-white">
                <Link href="/shop">Shop Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 bg-transparent border-jubol-blue text-jubol-blue hover:bg-jubol-blue hover:text-white"
              >
                <Link href="/categories">Browse Categories</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-jubol-pink/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-jubol-pink">500+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-jubol-blue">50+</div>
                <div className="text-sm text-muted-foreground">Quality Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-jubol-black">Fast</div>
                <div className="text-sm text-muted-foreground">Delivery</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-jubol-pink/10 via-jubol-blue/10 to-pink-50 p-8 flex items-center justify-center border border-jubol-pink/20">
              <img
                src="/colorful-household-products-bottles-fans-lunchboxe.jpg"
                alt="The Jubol Brand Products"
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-jubol-pink rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">NEW</span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-jubol-black rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xs">SALE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
