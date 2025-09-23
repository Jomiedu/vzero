"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Heart, User, Package, TrendingUp, Clock } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const { state: cartState } = useCart()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  const firstName = user.name.split(" ")[0]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {firstName}! 👋</h1>
          <p className="text-gray-600">Here's what's happening with your Jubol Brand account today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-l-4 border-l-jubol-pink">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cart Items</CardTitle>
              <ShoppingBag className="h-4 w-4 text-jubol-pink" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-jubol-blue">{cartState.itemCount}</div>
              <p className="text-xs text-muted-foreground">Total: ${cartState.total.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-l-jubol-blue">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-jubol-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-jubol-blue">0</div>
              <p className="text-xs text-muted-foreground">No orders yet</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-l-pink-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wishlist</CardTitle>
              <Heart className="h-4 w-4 text-pink-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-jubol-blue">0</div>
              <p className="text-xs text-muted-foreground">Items saved</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Member Since</CardTitle>
              <Clock className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-jubol-blue">Today</div>
              <p className="text-xs text-muted-foreground">Welcome to Jubol!</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-jubol-pink" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest interactions with Jubol Brand</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-jubol-pink rounded-full"></div>
                      <div>
                        <p className="font-medium">Account Created</p>
                        <p className="text-sm text-gray-600">Welcome to The Jubol Brand family!</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Just now</Badge>
                  </div>

                  {cartState.itemCount > 0 && (
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-jubol-blue rounded-full"></div>
                        <div>
                          <p className="font-medium">Items in Cart</p>
                          <p className="text-sm text-gray-600">
                            {cartState.itemCount} item{cartState.itemCount !== 1 ? "s" : ""} ready for checkout
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">Active</Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-jubol-blue" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Manage your account and orders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-start bg-jubol-pink hover:bg-jubol-pink/90 text-white"
                  onClick={() => router.push("/shop")}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>

                {cartState.itemCount > 0 && (
                  <Button
                    variant="outline"
                    className="w-full justify-start border-jubol-blue text-jubol-blue hover:bg-jubol-blue hover:text-white bg-transparent"
                    onClick={() => router.push("/checkout")}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Checkout ({cartState.itemCount})
                  </Button>
                )}

                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => router.push("/profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => router.push("/wishlist")}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  View Wishlist
                </Button>
              </CardContent>
            </Card>

            {/* Account Info */}
            <Card className="bg-white mt-6">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">Name</p>
                  <p className="text-gray-900">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Account Status</p>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
