import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  X,
  ArrowRight,
  Zap,
  Crown,
  Package,
  Printer,
  Store,
  ShieldCheck,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Pricing = () => {
  const [hovered, setHovered] = useState(null);

  const plans = [
    {
      id: "free",
      name: "Free",
      price: 0,
      period: "forever",
      description: "Perfect for small businesses just getting started",
      icon: Zap,
      accent: "#6b7280",
      features: [
        { icon: Package, text: "Up to 500 products", included: true },
        { icon: Store, text: "1 shop only", included: true },
        { icon: ShieldCheck, text: "Basic POS system", included: true },
        { icon: ShieldCheck, text: "Sales reports", included: true },
        { icon: Printer, text: "Print receipt", included: false },
        { icon: Store, text: "Multiple shops (up to 5)", included: false },
        { icon: Package, text: "Unlimited products", included: false },
      ],
      cta: "Get Started Free",
      ctaLink: "/get-started",
      popular: false,
    },
    {
      id: "premium",
      name: "Premium",
      price: 150,
      period: "per month",
      description:
        "For growing businesses that need more power and flexibility",
      icon: Crown,
      accent: "#FF0800",
      features: [
        { icon: Package, text: "Unlimited products", included: true },
        { icon: Store, text: "Up to 5 shops", included: true },
        { icon: ShieldCheck, text: "Full POS system", included: true },
        { icon: ShieldCheck, text: "Advanced analytics", included: true },
        { icon: Printer, text: "Print receipt", included: true },
        { icon: ShieldCheck, text: "Priority support", included: true },
        { icon: ShieldCheck, text: "All future features", included: true },
      ],
      cta: "Start 14-Day Free Trial",
      ctaLink: "/get-started",
      popular: true,
    },
  ];

  const comparison = [
    { feature: "Products", free: "Up to 500", premium: "Unlimited" },
    { feature: "Shops", free: "1 shop", premium: "Up to 5 shops" },
    { feature: "Print Receipt", free: false, premium: true },
    { feature: "POS System", free: "Basic", premium: "Full" },
    { feature: "Sales Reports", free: "Basic", premium: "Advanced" },
    { feature: "Customer Support", free: "Standard", premium: "Priority" },
    { feature: "Future Features", free: false, premium: true },
  ];

  return (
    <div className="font-poppins bg-white">
      <Header />

      {/* Hero */}
      <section
        className="pt-24 pb-16 text-center px-4"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #fff 40%, #FF0800 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Simple Pricing
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Choose the Plan That
            <span className="text-primary block mt-1">Fits Your Business</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Start free, upgrade when you're ready. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-stretch">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isHovered = hovered === plan.id;

            return (
              <div
                key={plan.id}
                onMouseEnter={() => setHovered(plan.id)}
                onMouseLeave={() => setHovered(null)}
                className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${
                  plan.popular
                    ? "bg-primary text-white shadow-2xl shadow-primary/30 scale-105"
                    : "bg-white text-gray-900 border-2 border-gray-100 hover:border-primary/30 shadow-lg hover:shadow-xl"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-white text-primary text-xs font-bold px-4 py-1.5 rounded-full shadow-md uppercase tracking-wide">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-8">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                      plan.popular ? "bg-white/20" : "bg-primary/10"
                    }`}
                  >
                    <Icon
                      className={`w-7 h-7 ${
                        plan.popular ? "text-white" : "text-primary"
                      }`}
                    />
                  </div>
                  <h2
                    className={`text-2xl font-bold mb-1 ${
                      plan.popular ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {plan.name}
                  </h2>
                  <p
                    className={`text-sm ${
                      plan.popular ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-end gap-1">
                    <span
                      className={`text-lg font-semibold ${
                        plan.popular ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      ₱
                    </span>
                    <span
                      className={`text-5xl font-bold ${
                        plan.popular ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-sm mb-2 ${
                        plan.popular ? "text-white/70" : "text-gray-400"
                      }`}
                    >
                      /{plan.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => {
                    const FIcon = feature.icon;
                    return (
                      <li key={i} className="flex items-center gap-3">
                        {feature.included ? (
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                              plan.popular ? "bg-white/20" : "bg-primary/10"
                            }`}
                          >
                            <Check
                              className={`w-3 h-3 ${
                                plan.popular ? "text-white" : "text-primary"
                              }`}
                            />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-100">
                            <X className="w-3 h-3 text-gray-400" />
                          </div>
                        )}
                        <span
                          className={`text-sm ${
                            !feature.included
                              ? "opacity-50"
                              : plan.popular
                                ? "text-white"
                                : "text-gray-700"
                          }`}
                        >
                          {feature.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {/* CTA */}
                <Link
                  to={plan.ctaLink}
                  className={`group flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    plan.popular
                      ? "bg-white text-primary hover:bg-gray-100"
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Compare Plans
            </h2>
            <p className="text-gray-500">
              See exactly what's included in each plan
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100">
              <div className="p-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Feature
              </div>
              <div className="p-4 text-center">
                <span className="text-sm font-bold text-gray-700">Free</span>
                <div className="text-xs text-gray-400 mt-0.5">₱0 / forever</div>
              </div>
              <div className="p-4 text-center bg-primary/5">
                <span className="text-sm font-bold text-primary">Premium</span>
                <div className="text-xs text-primary/60 mt-0.5">
                  ₱150 / month
                </div>
              </div>
            </div>

            {/* Table Rows */}
            {comparison.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 border-b border-gray-50 last:border-0 ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                }`}
              >
                <div className="p-4 text-sm text-gray-700 font-medium flex items-center">
                  {row.feature}
                </div>
                <div className="p-4 flex items-center justify-center">
                  {typeof row.free === "boolean" ? (
                    row.free ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300" />
                    )
                  ) : (
                    <span className="text-sm text-gray-600">{row.free}</span>
                  )}
                </div>
                <div className="p-4 flex items-center justify-center bg-primary/5">
                  {typeof row.premium === "boolean" ? (
                    row.premium ? (
                      <Check className="w-5 h-5 text-primary" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300" />
                    )
                  ) : (
                    <span className="text-sm font-semibold text-primary">
                      {row.premium}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / Bottom CTA */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-500 mb-8">
            Our team is here to help you find the right plan for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="group bg-primary text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Contact Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/get-started"
              className="bg-gray-100 text-gray-700 px-8 py-3.5 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
            >
              Start for Free
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
