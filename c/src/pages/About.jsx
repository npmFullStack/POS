import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Target,
  Eye,
  Heart,
  Users,
  TrendingUp,
  ShieldCheck,
  Lightbulb,
  Store,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description:
        "Every feature we build starts with a real problem our customers face. We listen, then we build.",
    },
    {
      icon: ShieldCheck,
      title: "Reliability",
      description:
        "Businesses depend on us daily. We take that seriously with 99.9% uptime and automatic backups.",
    },
    {
      icon: Lightbulb,
      title: "Simplicity",
      description:
        "Powerful tools don't have to be complicated. We design for clarity so anyone can use SukiPRO from day one.",
    },
    {
      icon: TrendingUp,
      title: "Growth Mindset",
      description:
        "We grow when our customers grow. Our success is directly tied to helping businesses thrive.",
    },
  ];

  const stats = [
    { value: "10K+", label: "Businesses" },
    { value: "50K+", label: "Daily Transactions" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" },
  ];

  const team = [
    {
      name: "Carlos Reyes",
      role: "CEO & Co-Founder",
      initial: "C",
      bio: "10+ years in retail tech. Built SukiPRO after watching small businesses struggle with outdated systems.",
    },
    {
      name: "Maria Santos",
      role: "CTO & Co-Founder",
      initial: "M",
      bio: "Former engineer at leading fintech companies. Passionate about making enterprise tools accessible to everyone.",
    },
    {
      name: "Jose Dela Cruz",
      role: "Head of Product",
      initial: "J",
      bio: "Spent years on the ground with retailers. Knows firsthand what businesses actually need from a POS.",
    },
  ];

  return (
    <div className="font-poppins bg-white">
      <Header />

      {/* Hero */}
      <section
        className="pt-24 pb-20 px-4 text-center"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #fff 40%, #FF0800 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            About SukiPRO
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            Built for Filipino
            <span className="text-primary block mt-1">Business Owners</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            SukiPRO was born from a simple belief — every business, big or
            small, deserves tools that actually work. We're on a mission to
            modernize retail across the Philippines.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-primary">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
              We Started as <span className="text-primary">Customers Too</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                In 2021, our founders visited a sari-sari store in Davao and
                watched the owner manually count stock on a notebook while a
                line of customers waited. That moment sparked everything.
              </p>
              <p>
                We asked ourselves: why are the best inventory and POS tools
                only available to large corporations? Small and medium
                businesses are the backbone of the Philippine economy — they
                deserve the same power.
              </p>
              <p>
                SukiPRO was built to bridge that gap. Today, thousands of
                retailers, restaurants, and distributors across the Philippines
                trust SukiPRO to run their daily operations.
              </p>
            </div>
          </div>

          {/* Visual side */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary/5 rounded-2xl p-6 flex flex-col items-center text-center">
              <Store className="w-10 h-10 text-primary mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">2021</div>
              <div className="text-sm text-gray-500">Year Founded</div>
            </div>
            <div className="bg-primary rounded-2xl p-6 flex flex-col items-center text-center">
              <Users className="w-10 h-10 text-white mb-3" />
              <div className="text-2xl font-bold text-white mb-1">10K+</div>
              <div className="text-sm text-white/70">Active Businesses</div>
            </div>
            <div className="bg-primary rounded-2xl p-6 flex flex-col items-center text-center">
              <TrendingUp className="w-10 h-10 text-white mb-3" />
              <div className="text-2xl font-bold text-white mb-1">₱2B+</div>
              <div className="text-sm text-white/70">
                Transactions Processed
              </div>
            </div>
            <div className="bg-primary/5 rounded-2xl p-6 flex flex-col items-center text-center">
              <Heart className="w-10 h-10 text-primary mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">PH</div>
              <div className="text-sm text-gray-500">Proudly Filipino</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
              <Target className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To empower every Filipino business owner with affordable,
              easy-to-use tools that were once only available to large
              enterprises — so they can focus on what they love: running their
              business.
            </p>
          </div>
          <div className="bg-primary rounded-2xl p-8 shadow-lg shadow-primary/20">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-5">
              <Eye className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Our Vision</h3>
            <p className="text-white/85 leading-relaxed">
              A Philippines where every tindahan, restaurant, and shop runs on
              smart, modern systems — where no business owner is left behind
              because of cost or complexity.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              What Drives Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Core Values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <div
                  key={i}
                  className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              The People Behind SukiPRO
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Meet Our Team
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">
                    {member.initial}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-0.5">
                  {member.name}
                </h3>
                <div className="text-sm text-primary font-medium mb-3">
                  {member.role}
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Join Thousands of Filipino Businesses?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Start free today — no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/get-started"
              className="group bg-white text-primary px-8 py-3.5 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
