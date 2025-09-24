export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  description: string
  inStock: boolean
  featured?: boolean
}

// Sample product data - in a real app this would come from a database
function getSampleProducts(): Product[] {
  return []
}

let cachedProducts: Product[] = []
let lastFetchTime = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export async function fetchProducts(): Promise<Product[]> {
  const now = Date.now()

  // Return cached data if it's still fresh
  if (cachedProducts.length > 0 && now - lastFetchTime < CACHE_DURATION) {
    return cachedProducts
  }

  try {
    const csvUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vToiPMkFMUCaMmnqTzz4JwQoJPVeogL96FyrZTkkcB4v2yXNOvTSBIs2fEfEp6MYR86wGSWFgRsb8vw/pub?output=csv"
    const response = await fetch(csvUrl)

    if (!response.ok) {
      throw new Error("Failed to fetch CSV data")
    }

    const csvText = await response.text()
    const products = await parseCSV(csvText)

    cachedProducts = products
    lastFetchTime = now

    return products
  } catch (error) {
    console.error("Error fetching products from Google Sheets:", error)

    return getSampleProducts()
  }
}

function convertGoogleDriveUrl(url: string): string {
  if (!url || !url.includes("drive.google.com")) {
    return url
  }

  // Extract file ID from Google Drive URL
  const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/) || url.match(/id=([a-zA-Z0-9-_]+)/)
  if (fileIdMatch && fileIdMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`
  }

  return url
}

async function parseCSV(csvText: string): Promise<Product[]> {
  const lines = csvText.trim().split("\n")
  const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))

  const products: Product[] = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    const values: string[] = []
    let current = ""
    let inQuotes = false

    for (let j = 0; j < line.length; j++) {
      const char = line[j]
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === "," && !inQuotes) {
        values.push(current.trim())
        current = ""
      } else {
        current += char
      }
    }
    values.push(current.trim()) // Add the last value

    if (values.length >= 4) {
      const priceString = values[1] || "0"
      const priceNumber = Number.parseFloat(priceString.replace(/[₦,]/g, "")) || 0

      const product: Product = {
        id: `product-${i}`,
        name: values[0] || `Product ${i}`,
        price: priceNumber,
        image: convertGoogleDriveUrl(values[2]) || "/diverse-products-still-life.png",
        category: values[3]?.toLowerCase().replace(/\s+/g, "-") || "other",
        description: `High-quality ${values[0]} from Jubol Collections`,
        inStock: true,
        featured: i <= 3, // First 3 products are featured
      }
      products.push(product)
    }
  }

  return products
}

export async function getCategories(): Promise<Array<{ id: string; name: string }>> {
  const products = await fetchProducts()
  const categorySet = new Set(products.map((p) => p.category))

  const categories = [
    { id: "all", name: "All Products" },
    ...Array.from(categorySet).map((cat) => {
      if (cat === "lunchboxes") {
        return { id: "bags", name: "Bags" }
      }
      return {
        id: cat,
        name: cat
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      }
    }),
  ]

  const uniqueCategories = categories.filter(
    (category, index, self) => index === self.findIndex((c) => c.id === category.id),
  )

  return uniqueCategories
}

export async function fetchCategories(): Promise<string[]> {
  const products = await fetchProducts()
  const categorySet = new Set(products.map((p) => p.category))

  return Array.from(categorySet).map((cat) =>
    cat
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
  )
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price)
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await fetchProducts()
  if (category === "all") return products
  return products.filter((product) => product.category === category)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await fetchProducts()
  return products.filter((product) => product.featured)
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await fetchProducts()
  return products.find((product) => product.id === id) || null
}
