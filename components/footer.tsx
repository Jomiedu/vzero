import Link from "next/link"
import Image from "next/image"
import { Instagram, Phone, Mail, MessageCircle } from "lucide-react"

export function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/categories" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image src="/jubol-logo.png" alt="Jubol Brand Logo" width={40} height={40} className="rounded-lg" />
              <span className="text-xl font-bold">The Jubol Brand</span>
            </div>
            <p className="text-primary-foreground/80 text-pretty leading-relaxed">
              Your one-stop shop for everyday essentials — from fans and bottles to snack boxes and silicone covers.
              Quality products for modern living.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                <span className="text-primary-foreground/80">+2348037215025</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                <span className="text-primary-foreground/80">thejubolbrand@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4" />
                <span className="text-primary-foreground/80">+2348137260940</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                href="https://instagram.com/thejubolbrand"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
            <p className="text-primary-foreground/80 text-sm">Stay updated with our latest products and offers</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Image src="/jubol-logo.png" alt="Jubol Brand Logo" width={24} height={24} className="rounded" />
            <span className="text-primary-foreground/80">© The Jubol Brand 2025. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
