import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoriesSection } from "@/components/categories-section"

export default function CategoriesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        {/* Page Header */}
        <div className="container mx-auto px-4 text-center space-y-4 mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-balance">
            Product <span className="text-primary">Categories</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Browse our organized collection of household essentials by category
          </p>
        </div>
        <CategoriesSection />
      </main>
      <Footer />
    </div>
  )
}
