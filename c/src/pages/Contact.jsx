import React, { useState } from "react";
import {
  Mail,
  Phone,
  Send,
  MessageSquare,
  CheckCircle,
  GraduationCap,
  Code2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import myImage from "@/assets/images/me.png";
import bgImage from "@/assets/images/bg.png";

const bgStyle = {
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const subjects = [
    "General Inquiry",
    "Sales & Pricing",
    "Technical Support",
    "Billing",
    "Partnership",
    "Other",
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
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            We'd Love to
            <span className="text-primary block mt-1">Hear From You</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Whether you have a question, need support, or just want to say hi —
            our team is ready to help.
          </p>
        </div>
      </section>

      {/* Form + Side */}
      <section style={bgStyle} className="relative py-20 px-4">
        <div className="absolute inset-0 bg-white/90" />
        <div className="relative max-w-5xl mx-auto grid lg:grid-cols-5 gap-12">
          {/* Left Side */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4 w-fit">
              Send a Message
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              Let's Start a <span className="text-primary">Conversation</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Fill out the form and I'll get back to you as soon as possible. I
              typically respond within a few hours during business days.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageSquare className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    Quick Response
                  </div>
                  <div className="text-sm text-gray-500">
                    Average reply time under 2 hours
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    Expert Support
                  </div>
                  <div className="text-sm text-gray-500">
                    Real person, not a bot
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    Call or Message
                  </div>
                  <div className="text-sm text-gray-500">
                    +63 994 443 5770 via call or Viber
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center h-full flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-500 max-w-sm">
                  Thanks for reaching out,{" "}
                  <span className="font-semibold text-gray-700">
                    {formData.name}
                  </span>
                  ! I'll get back to you at{" "}
                  <span className="font-semibold text-primary">
                    {formData.email}
                  </span>{" "}
                  within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      subject: "",
                      message: "",
                    });
                  }}
                  className="mt-6 text-primary font-semibold text-sm hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Full Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Juan dela Cruz"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Email Address <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="juan@example.com"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Subject <span className="text-primary">*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white appearance-none"
                    >
                      <option value="" disabled>
                        Select a subject
                      </option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Message <span className="text-primary">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us how we can help you..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group w-full bg-primary text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin w-4 h-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="relative bg-white py-20 px-4">
        <div className="absolute inset-0 bg-white/88" />
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Behind SukiPro
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Meet the <span className="text-primary">Team</span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-md mx-auto text-sm">
              SukiPro is proudly built and maintained by one dedicated
              developer.
            </p>
          </div>

          {/* Card — bigger, no border radius, no shadow */}
          <div className="flex justify-center">
            <div className="bg-white p-10 flex flex-col md:flex-row items-center gap-10 w-full max-w-3xl">
              {/* Photo — bigger, square, no border radius */}
              <div className="flex-shrink-0">
                <div className="w-60 h-72 overflow-hidden">
                  <img
                    src={myImage}
                    alt="Norway P. Mangorangca"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="text-center md:text-left flex-1">
                <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
                  Founder & CEO
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Norway P. Mangorangca
                </h3>

                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                  <GraduationCap className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-gray-500">
                    BSIT Graduate · Opol Community College
                  </span>
                </div>

                <div className="flex items-center gap-2 justify-center md:justify-start mb-6">
                  <Code2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-gray-500">
                    Full-Stack Developer & Designer
                  </span>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  The sole developer behind SukiPro — passionate about building
                  tools that help Filipino businesses grow and thrive in the
                  digital age.
                </p>

                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <a
                    href="mailto:occ.mangorangca.norway@gmail.com"
                    className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-primary/90 transition-all duration-200"
                  >
                    <Mail className="w-4 h-4" />
                    Send Email
                  </a>
                  <a
                    href="tel:+639944435770"
                    className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-200 transition-all duration-200"
                  >
                    <Phone className="w-4 h-4" />
                    Call Me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
