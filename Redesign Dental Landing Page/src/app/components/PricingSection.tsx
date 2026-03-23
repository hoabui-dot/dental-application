import { Check, Star } from "lucide-react";
import { Button } from "./ui/button";

const plans = [
  {
    name: "Basic Care",
    price: "$99",
    period: "per visit",
    description: "Essential dental care for everyday health",
    features: [
      "Comprehensive Examination",
      "Professional Cleaning",
      "Digital X-Rays",
      "Oral Health Consultation",
      "Basic Fluoride Treatment",
    ],
    popular: false,
  },
  {
    name: "Premium Care",
    price: "$299",
    period: "per month",
    description: "Complete coverage for optimal dental health",
    features: [
      "Everything in Basic Care",
      "Unlimited Emergency Visits",
      "Advanced Whitening Treatment",
      "Periodontal Maintenance",
      "Priority Scheduling",
      "20% Off Cosmetic Procedures",
    ],
    popular: true,
  },
  {
    name: "Smile Transformation",
    price: "Custom",
    period: "based on treatment",
    description: "Comprehensive cosmetic enhancement",
    features: [
      "Full Smile Assessment",
      "Customized Treatment Plan",
      "Veneers & Crowns",
      "Orthodontic Options",
      "Implant Solutions",
      "VIP Concierge Service",
    ],
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section className="py-20 bg-white" id="pricing">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that best fits your dental care needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 ${
                plan.popular
                  ? "outline-2 outline-sky-500 shadow-2xl scale-105"
                  : "outline-2 outline-sky-100 hover:border-sky-200 hover:shadow-xl"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-6 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <Star className="w-4 h-4 fill-white" />
                    <span className="font-semibold">Most Popular</span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                </div>
                <p className="text-gray-600">{plan.period}</p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-sky-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                className={`w-full py-6 rounded-full text-lg ${
                  plan.popular
                    ? "bg-sky-600 hover:bg-sky-700 text-white"
                    : "bg-sky-50 hover:bg-sky-100 text-sky-600"
                }`}
              >
                {plan.price === "Custom" ? "Get Consultation" : "Choose Plan"}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            All plans include consultation and personalized care. Insurance
            accepted.
          </p>
          <Button variant="link" className="text-sky-600">
            Compare All Plans →
          </Button>
        </div>
      </div>
    </section>
  );
}
