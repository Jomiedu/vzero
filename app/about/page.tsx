import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Shield, Truck, Heart, Star, Mail, Phone, MapPin, Send } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description:
        "Every product is carefully tested to ensure it meets our high standards for durability and functionality.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and reliable shipping across Nigeria to get your essentials to you when you need them.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Heart,
      title: "Customer Care",
      description: "Dedicated support team ready to help with any questions or concerns about your purchase.",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Star,
      title: "Affordable Pricing",
      description: "Quality products at prices that won't break the bank, making essentials accessible to everyone.",
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
  ]

  const stats = [
    { number: "500+", label: "Happy Customers" },
    { number: "50+", label: "Quality Products" },
    { number: "2+", label: "Years of Service" },
    { number: "99%", label: "Customer Satisfaction" },
  ]

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      value: "hello@jubolbrand.com",
      description: "Send us a message anytime",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+234 (0) 123 456 7890",
      description: "Mon-Fri, 9AM-6PM WAT",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "Lagos, Nigeria",
      description: "Serving customers nationwide",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <Badge className="bg-accent text-accent-foreground">About Us</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-balance">
                Your Trusted Partner for <span className="text-primary">Everyday Essentials</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                The Jubol Brand is a one-stop shop for everyday essentials — from fans and bottles to snack boxes and
                silicone covers. We're dedicated to bringing affordable, durable, and stylish products to homes across
                Nigeria.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-balance">
                  Our <span className="text-primary">Story</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded with a simple mission: to make quality household essentials accessible and affordable for
                    every Nigerian family. We started by recognizing the gap in the market for reliable, stylish, and
                    reasonably priced everyday products.
                  </p>
                  <p>
                    What began as a small venture has grown into a trusted brand that serves hundreds of satisfied
                    customers across the country. We carefully curate each product in our collection, ensuring that
                    every item meets our strict standards for quality, functionality, and value.
                  </p>
                  <p>
                    Today, The Jubol Brand continues to expand its product range while maintaining the same commitment
                    to excellence that our customers have come to expect. We're not just selling products; we're
                    enhancing daily life with solutions that work.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-8 flex items-center justify-center">
                  <img
                    src="/stylish-black-pink-shopping-bag-lifestyle.jpg"
                    alt="Stylish Jubol Brand shopping bag representing our commitment to quality and style"
                    className="w-full h-full object-contain rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-balance">
                What We <span className="text-primary">Stand For</span>
              </h2>
              <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
                Our core values guide everything we do, from product selection to customer service
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => {
                const IconComponent = value.icon
                return (
                  <Card key={value.title} className="text-center border-2 hover:border-primary/20 transition-colors">
                    <CardContent className="p-8 space-y-4">
                      <div
                        className={`w-16 h-16 mx-auto rounded-2xl ${value.bgColor} flex items-center justify-center`}
                      >
                        <IconComponent className={`h-8 w-8 ${value.color}`} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold">{value.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-balance">
                Our <span className="text-primary">Impact</span>
              </h2>
              <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
                Numbers that reflect our commitment to excellence and customer satisfaction
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="text-4xl lg:text-5xl font-bold text-primary">{stat.number}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-balance">Our Mission</h2>
              <p className="text-xl text-primary-foreground/90 text-pretty leading-relaxed">
                "To provide every Nigerian household with access to quality, affordable, and stylish everyday essentials
                that enhance daily living. We believe that everyone deserves products that are both functional and
                beautiful, without compromising on quality or breaking the budget."
              </p>
            </div>
          </div>
        </section>

        {/* Contact Us section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <Badge className="bg-accent text-accent-foreground">Contact Us</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-balance">
                Get in <span className="text-primary">Touch</span>
              </h2>
              <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
                Have questions about our products or need assistance? We're here to help!
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div className="space-y-6">
                  {contactInfo.map((contact) => {
                    const IconComponent = contact.icon
                    return (
                      <Card key={contact.title} className="border-2 hover:border-primary/20 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div
                              className={`w-12 h-12 rounded-xl ${contact.bgColor} flex items-center justify-center flex-shrink-0`}
                            >
                              <IconComponent className={`h-6 w-6 ${contact.color}`} />
                            </div>
                            <div className="space-y-1">
                              <h3 className="text-lg font-semibold">{contact.title}</h3>
                              <p className="text-lg font-medium text-primary">{contact.value}</p>
                              <p className="text-sm text-muted-foreground">{contact.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Contact Form */}
              <Card className="border-2">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">Send us a Message</h3>
                      <p className="text-muted-foreground">
                        Fill out the form below and we'll get back to you as soon as possible.
                      </p>
                    </div>

                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="firstName" className="text-sm font-medium">
                            First Name
                          </label>
                          <Input id="firstName" placeholder="Enter your first name" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="lastName" className="text-sm font-medium">
                            Last Name
                          </label>
                          <Input id="lastName" placeholder="Enter your last name" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </label>
                        <Input id="email" type="email" placeholder="Enter your email address" />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject
                        </label>
                        <Input id="subject" placeholder="What is this regarding?" />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <Textarea id="message" placeholder="Tell us how we can help you..." className="min-h-[120px]" />
                      </div>

                      <Button className="w-full" size="lg">
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
