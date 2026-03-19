import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Star,
  ShoppingCart,
  Package,
  TrendingUp,
  Users,
  BarChart3,
  Clock,
  ShieldCheck,
  CreditCard,
  Boxes,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home = () => {
  const features = [
    {
      icon: ShoppingCart,
      title: "Point of Sale",
      description:
        "Fast and intuitive checkout process with support for multiple payment methods",
    },
    {
      icon: Package,
      title: "Inventory Tracking",
      description:
        "Real-time stock management with low stock alerts and batch tracking",
    },
    {
      icon: TrendingUp,
      title: "Sales Analytics",
      description: "Comprehensive reports and insights to grow your business",
    },
    {
      icon: Users,
      title: "Customer Management",
      description:
        "Build customer relationships with loyalty programs and purchase history",
    },
    {
      icon: BarChart3,
      title: "Financial Reports",
      description:
        "Track profits, losses, and generate financial statements instantly",
    },
    {
      icon: Clock,
      title: "Real-time Sync",
      description: "All devices sync in real-time across multiple locations",
    },
  ];

  const testimonials = [
    {
      name: "David Martinez",
      role: "Retail Store Owner",
      content:
        "This system transformed how we manage inventory. Stockouts are now a thing of the past and our checkout process is 3x faster.",
      rating: 5,
    },
    {
      name: "Lisa Chen",
      role: "Restaurant Manager",
      content:
        "The real-time inventory tracking saved us thousands in wasted supplies. Absolutely essential for any food business.",
      rating: 5,
    },
    {
      name: "James Wilson",
      role: "Wholesale Distributor",
      content:
        "Managing 5000+ SKUs has never been easier. The batch tracking and expiry date alerts are game changers.",
      rating: 5,
    },
  ];

  return (
    <div className="font-poppins">
      {/* Hero Section */}
      <Header />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 h-full w-full"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 10%, #fff 40%, #FF0800 100%)",
          }}
        ></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Complete POS & Inventory
            <span className="text-primary block mt-1">Management System</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamline your retail operations with our all-in-one solution.
            Manage sales, track inventory in real-time, and grow your business
            smarter.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/get-started"
              className="group bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/pricing"
              className="bg-white text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200"
            >
              View Pricing
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">50K+</div>
              <div className="text-gray-600">Transactions Daily</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">10K+</div>
              <div className="text-gray-600">Businesses Trust Us</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">99.9%</div>
              <div className="text-gray-600">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Run Your
              <span className="text-primary block mt-2">
                Business Efficiently
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed for modern retail and inventory
              management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Thousands of Businesses{" "}
                <span className="text-primary">Choose SukiPRO</span>
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Secure & Reliable
                    </h3>
                    <p className="text-gray-600">
                      Enterprise-grade security with automatic backups and data
                      encryption
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CreditCard className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Multiple Payment Options
                    </h3>
                    <p className="text-gray-600">
                      Accept cash, card, mobile payments, and more with
                      integrated payment processing
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Boxes className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Smart Inventory Alerts
                    </h3>
                    <p className="text-gray-600">
                      Get notified when stock is low, products are expiring, or
                      reorder points are reached
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-primary/5 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    98%
                  </div>
                  <div className="text-sm text-gray-600">Faster Checkout</div>
                </div>
                <div className="bg-white p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    40%
                  </div>
                  <div className="text-sm text-gray-600">Less Stock Waste</div>
                </div>
                <div className="bg-white p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    24/7
                  </div>
                  <div className="text-sm text-gray-600">Support Available</div>
                </div>
                <div className="bg-white p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    100+
                  </div>
                  <div className="text-sm text-gray-600">Integrations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="text-center relative z-10 px-4 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Join thousands of successful businesses using SukiPRO to manage
            their operations efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/get-started"
              className="group bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Start Your 14-Day Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300"
            >
              Schedule a Demo
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 items-center">
            <div className="flex items-center gap-2 text-white/80">
              <CheckCircle className="w-5 h-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <CheckCircle className="w-5 h-5" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <CheckCircle className="w-5 h-5" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
