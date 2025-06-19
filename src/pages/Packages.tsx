import React from 'react';
import { Check, Clock, Users } from 'lucide-react';

const Packages = () => {
  const packages = [
    {
      icon: '🖋️',
      name: 'The WriteLite Plan',
      description: 'Perfect for first-time authors and young writers',
      price: 999,
      offer: 1999,
      popular: false,
      features: [
        'ISBN Allocation',
        'Professional Cover Design',
        'Interior Formatting',
        'Chapter Outlining',
        'Font Selection & Styling',
        'Grammer & Spell Check',
        'Proofreading for Minor Errors',
        'KDP(Kindle Direct Publishing) Upload',
        'Email Support'
      ],
      limitations: [
        'Limited to 1 book per year',
        'Basic marketing support only'
      ],
      deliveryTime: '6-8 weeks',
      supportLevel: 'Email Support',
      badge: null
    },
    {
      icon: '📚',
      name: 'The Book Nest Plan',
      description: 'Most popular choice for end-to-end publishing package',
      price: 4999,
      offer: 8999,
      popular: true,
      features: [
        'Premium Cover Design',
        'Copyright Registration',
        'ISBN Allocation',
        'Grammar & Language Polishing',
        'Deep Proofreading',
        'Diagrams & Layout Suggestions',
        'Creative Ideation Support',
        '5 Free Author Copies',
        'Print-on-Demand(POD) Setup',
        'Amazon & Flipkart Listing',
        'Weekly Zoom Meetings for Guidance',
        'Full Publishing Support- from draft to store'
      ],
      limitations: ['Limited to 2 books per year'],
      deliveryTime: '4-6 weeks',
      supportLevel: 'Priority Support',
      badge: 'Most Popular'
    },
    {
      icon: '🚀',
      name: 'The Legacy Launch Plan',
      description: 'For authors ready to launch big & build a brand',
      price: 7999,
      offer: 15999,
      popular: false,
      features: [
        'Premium Cover Design',
        'Copyright Registration',
        'ISBN Allocation',
        'Grammar & Language Polishing',
        'Deep Proofreading',
        'Diagrams & Layout Suggestions',
        'Creative Ideation Support',
        'Personalized Editing for Social Media Bio & Branding',
        'Full Marketing Strategy Blueprint',
        '10 Free Author Copies',
        'Print-on-Demand Setup with Priority Support(POD)',
        'One-on-One Personal Consultation Before Book Launch',
        'Exclusive Podcast Interview Questions(For Author Spotlight)',
        'Post-launch Guidance & Future Planning',
        'Premium, Fast-Track Author Support',
        'Private Support Group Access',
        'Smooth, Scamless Process with Personal Touch'
      ],
      limitations: [],
      deliveryTime: '2-4 weeks',
      supportLevel: 'Dedicated Manager',
      badge: 'Best Value'
    }
  ];

  const addOns = [
    {
      name: 'Audio Book Production',
      price: '2,999',
      description: 'Professional narration and audio production'
    },
    {
      name: 'Advanced Marketing Campaign',
      price: '1,499',
      description: 'Social media ads, influencer outreach, PR campaign'
    },
    {
      name: 'Additional Language Translation',
      price: '899',
      description: 'Professional translation to Spanish, French, or German'
    },
    {
      name: 'Extended Distribution',
      price: '299',
      description: 'Library networks, educational institutions, specialty retailers'
    }
  ];

  const getDiscountPercent = (offer, price) => {
    return Math.round(((offer - price) / offer) * 100);
  };

  return (
    <div className="min-h-screen bg-sage-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-sage-900 mb-4">
            Publishing Packages
          </h1>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto mb-8">
            Choose the perfect package for your publishing journey. From first-time authors to established writers, we have solutions for every need.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                pkg.popular ? 'ring-2 ring-gold-500 scale-105' : ''
              }`}
            >
              {pkg.badge && (
  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 z-10">
    <div className="bg-gold-500 text-sage-900 px-4 py-1 rounded-full text-xs font-bold shadow-lg border border-sage-300">
      {pkg.badge}
    </div>
  </div>
)}



              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-sage-900 mb-2">
                    {pkg.icon} {pkg.name}
                  </h3>
                  <p className="text-sage-600 mb-4">{pkg.description}</p>
                  <div className="mb-4 flex flex-col items-center">
                    {pkg.offer && (
                      <span className="text-sm text-sage-500 line-through">
                        ₹{pkg.offer}
                      </span>
                    )}
                    <span className="text-4xl font-bold text-sage-900">
                      ₹{pkg.price}
                    </span>
                    {pkg.offer && (
                      <span className="text-sm text-gold-600 font-medium mt-1">
                        {getDiscountPercent(pkg.offer, pkg.price)}% OFF
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-gold-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sage-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-sage-100 pt-6 mb-8">
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sage-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Delivery Time</span>
                      </div>
                      <span className="text-sage-900 font-semibold">{pkg.deliveryTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sage-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Support Level</span>
                      </div>
                      <span className="text-sage-900 font-semibold">{pkg.supportLevel}</span>
                    </div>
                  </div>
                </div>

                <button
                  className={`w-full py-4 rounded-lg font-semibold transition-all duration-200 ${
                    pkg.popular
                      ? 'bg-gold-500 text-sage-900 hover:bg-gold-400 shadow-lg'
                      : 'bg-sage-700 text-gold-100 hover:bg-sage-800'
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-sage-900 mb-4">Optional Add-ons</h2>
            <p className="text-sage-600">Enhance your publishing package with these professional services</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="border border-sage-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-sage-900">{addon.name}</h3>
                  <span className="text-xl font-bold text-gold-600">₹{addon.price}</span>
                </div>
                <p className="text-sage-600 text-sm mb-4">{addon.description}</p>
                <button className="text-gold-600 font-semibold hover:text-gold-700 transition-colors">
                  Add to Package →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-sage-100 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-sage-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: 'Can I upgrade my package later?',
                answer: 'Yes, you can upgrade to a higher tier at any time. We\'ll credit the unused portion of your current package.'
              },
              {
                question: 'What if I need more than the word limit?',
                answer: 'Additional editing services are available at ₹0.02 per word for the Starter package and ₹0.015 per word for Professional.'
              },
              {
                question: 'Do you offer refunds?',
                answer: 'We offer a 30-day satisfaction guarantee. If you\'re not happy with our services, we\'ll provide a full refund.'
              },
              {
                question: 'How long do I retain rights to my book?',
                answer: 'You retain 100% of your rights. We never claim ownership of your intellectual property.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-sage-900 mb-2">{faq.question}</h3>
                <p className="text-sage-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-sage-900 mb-4">
            Ready to Start Your Publishing Journey?
          </h2>
          <p className="text-sage-600 mb-8 max-w-2xl mx-auto">
            Join thousands of successful authors who have published with Zenjaura. Get started today with a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gold-500 text-sage-900 px-8 py-4 rounded-lg font-semibold hover:bg-gold-400 transition-colors">
              Schedule Free Consultation
            </button>
            <button className="border-2 border-sage-700 text-sage-700 px-8 py-4 rounded-lg font-semibold hover:bg-sage-700 hover:text-gold-100 transition-all">
              Compare All Features
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;


