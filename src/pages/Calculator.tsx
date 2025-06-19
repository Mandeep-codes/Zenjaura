import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, BookOpen, Palette, Globe, TrendingUp, DollarSign, Info } from 'lucide-react';

const Calculator = () => {
  const [formData, setFormData] = useState({
    wordCount: 50000,
    bookType: 'fiction',
    editingLevel: 'comprehensive',
    coverDesign: 'premium',
    formatOptions: ['print', 'ebook'],
    distribution: 'wide',
    marketing: 'basic',
    timeline: 'standard'
  });

  const [totalCost, setTotalCost] = useState(0);
  const [breakdown, setBreakdown] = useState<Record<string, number>>({});

  const pricing = {
    editing: {
      basic: 0.005,
      comprehensive: 0.008,
      premium: 0.012
    },
    cover: {
      basic: 299,
      premium: 599,
      custom: 999
    },
    formatting: {
      print: 199,
      ebook: 99,
      both: 249
    },
    distribution: {
      basic: 99,
      wide: 299,
      global: 499
    },
    marketing: {
      basic: 499,
      standard: 999,
      premium: 1999
    },
    timeline: {
      rush: 500,
      standard: 0,
      extended: -200
    }
  };

  useEffect(() => {
    calculateCost();
  }, [formData]);

  const calculateCost = () => {
    const costs: Record<string, number> = {};
    
    // Editing cost
    const editingRate = pricing.editing[formData.editingLevel as keyof typeof pricing.editing];
    costs.editing = formData.wordCount * editingRate;

    // Cover design
    costs.cover = pricing.cover[formData.coverDesign as keyof typeof pricing.cover];

    // Formatting
    const formatKey = formData.formatOptions.length === 2 ? 'both' : 
                     formData.formatOptions.includes('print') ? 'print' : 'ebook';
    costs.formatting = pricing.formatting[formatKey as keyof typeof pricing.formatting];

    // Distribution
    costs.distribution = pricing.distribution[formData.distribution as keyof typeof pricing.distribution];

    // Marketing
    costs.marketing = pricing.marketing[formData.marketing as keyof typeof pricing.marketing];

    // Timeline adjustment
    costs.timeline = pricing.timeline[formData.timeline as keyof typeof pricing.timeline];

    setBreakdown(costs);
    setTotalCost(Object.values(costs).reduce((sum, cost) => sum + cost, 0));
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const services = [
    {
      icon: BookOpen,
      title: 'Professional Editing',
      description: 'From basic proofreading to comprehensive developmental editing'
    },
    {
      icon: Palette,
      title: 'Cover Design',
      description: 'Eye-catching covers that sell books'
    },
    {
      icon: Globe,
      title: 'Global Distribution',
      description: 'Get your book in stores worldwide'
    },
    {
      icon: TrendingUp,
      title: 'Marketing Support',
      description: 'Professional marketing to boost your sales'
    }
  ];

  return (
    <div className="min-h-screen bg-sage-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <CalcIcon className="w-12 h-12 text-gold-500 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-sage-900">
              Publishing Cost Calculator
            </h1>
          </div>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto">
            Get an instant estimate for your publishing project. Transparent pricing with no hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-sage-900 mb-6">Project Details</h2>
              
              <div className="space-y-8">
                {/* Word Count */}
                <div>
                  <label className="block text-sm font-semibold text-sage-900 mb-2">
                    Word Count
                  </label>
                  <input
                    type="range"
                    min="10000"
                    max="200000"
                    step="1000"
                    value={formData.wordCount}
                    onChange={(e) => handleInputChange('wordCount', parseInt(e.target.value))}
                    className="w-full h-2 bg-sage-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-sage-600">10K</span>
                    <span className="text-lg font-semibold text-sage-900">
                      {formData.wordCount.toLocaleString()} words
                    </span>
                    <span className="text-sm text-sage-600">200K</span>
                  </div>
                </div>

                {/* Book Type */}
                <div>
                  <label className="block text-sm font-semibold text-sage-900 mb-3">
                    Book Type
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['fiction', 'non-fiction', 'poetry', 'technical'].map((type) => (
                      <button
                        key={type}
                        onClick={() => handleInputChange('bookType', type)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                          formData.bookType === type
                            ? 'border-gold-500 bg-gold-50 text-gold-700'
                            : 'border-sage-200 text-sage-600 hover:border-sage-300'
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Editing Level */}
                <div>
                  <label className="block text-sm font-semibold text-sage-900 mb-3">
                    Editing Level
                  </label>
                  <div className="space-y-3">
                    {[
                      { key: 'basic', name: 'Basic Proofreading', desc: 'Grammar, spelling, punctuation' },
                      { key: 'comprehensive', name: 'Comprehensive Editing', desc: 'Structure, flow, clarity + proofreading' },
                      { key: 'premium', name: 'Developmental Editing', desc: 'Complete manuscript development + comprehensive editing' }
                    ].map((level) => (
                      <label key={level.key} className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="editingLevel"
                          value={level.key}
                          checked={formData.editingLevel === level.key}
                          onChange={(e) => handleInputChange('editingLevel', e.target.value)}
                          className="mt-1 text-gold-500 focus:ring-gold-500"
                        />
                        <div>
                          <div className="font-medium text-sage-900">{level.name}</div>
                          <div className="text-sm text-sage-600">{level.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Cover Design */}
                <div>
                  <label className="block text-sm font-semibold text-sage-900 mb-3">
                    Cover Design
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { key: 'basic', name: 'Basic Design', price: '$299' },
                      { key: 'premium', name: 'Premium Design', price: '$599' },
                      { key: 'custom', name: 'Custom Design', price: '$999' }
                    ].map((cover) => (
                      <button
                        key={cover.key}
                        onClick={() => handleInputChange('coverDesign', cover.key)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          formData.coverDesign === cover.key
                            ? 'border-gold-500 bg-gold-50'
                            : 'border-sage-200 hover:border-sage-300'
                        }`}
                      >
                        <div className="font-medium text-sage-900">{cover.name}</div>
                        <div className="text-sm text-sage-600">{cover.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Format Options */}
                <div>
                  <label className="block text-sm font-semibold text-sage-900 mb-3">
                    Format Options
                  </label>
                  <div className="space-y-2">
                    {[
                      { key: 'print', name: 'Print Book' },
                      { key: 'ebook', name: 'E-book' }
                    ].map((format) => (
                      <label key={format.key} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.formatOptions.includes(format.key)}
                          onChange={(e) => {
                            const newFormats = e.target.checked 
                              ? [...formData.formatOptions, format.key]
                              : formData.formatOptions.filter(f => f !== format.key);
                            handleInputChange('formatOptions', newFormats);
                          }}
                          className="text-gold-500 focus:ring-gold-500"
                        />
                        <span className="text-sage-900">{format.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Distribution */}
                <div>
                  <label className="block text-sm font-semibold text-sage-900 mb-3">
                    Distribution Network
                  </label>
                  <div className="space-y-3">
                    {[
                      { key: 'basic', name: 'Basic Distribution', desc: 'Amazon, major online retailers' },
                      { key: 'wide', name: 'Wide Distribution', desc: 'Online + select physical stores' },
                      { key: 'global', name: 'Global Distribution', desc: 'Worldwide network including libraries' }
                    ].map((dist) => (
                      <label key={dist.key} className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="distribution"
                          value={dist.key}
                          checked={formData.distribution === dist.key}
                          onChange={(e) => handleInputChange('distribution', e.target.value)}
                          className="mt-1 text-gold-500 focus:ring-gold-500"
                        />
                        <div>
                          <div className="font-medium text-sage-900">{dist.name}</div>
                          <div className="text-sm text-sage-600">{dist.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Marketing */}
                <div>
                  <label className="block text-sm font-semibold text-sage-900 mb-3">
                    Marketing Package
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { key: 'basic', name: 'Basic Marketing', price: '$499' },
                      { key: 'standard', name: 'Standard Marketing', price: '$999' },
                      { key: 'premium', name: 'Premium Marketing', price: '$1,999' }
                    ].map((marketing) => (
                      <button
                        key={marketing.key}
                        onClick={() => handleInputChange('marketing', marketing.key)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          formData.marketing === marketing.key
                            ? 'border-gold-500 bg-gold-50'
                            : 'border-sage-200 hover:border-sage-300'
                        }`}
                      >
                        <div className="font-medium text-sage-900">{marketing.name}</div>
                        <div className="text-sm text-sage-600">{marketing.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-sm font-semibold text-sage-900 mb-3">
                    Timeline Preference
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { key: 'rush', name: 'Rush (2-4 weeks)', price: '+$500' },
                      { key: 'standard', name: 'Standard (6-8 weeks)', price: 'Included' },
                      { key: 'extended', name: 'Extended (10-12 weeks)', price: '-$200' }
                    ].map((timeline) => (
                      <button
                        key={timeline.key}
                        onClick={() => handleInputChange('timeline', timeline.key)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          formData.timeline === timeline.key
                            ? 'border-gold-500 bg-gold-50'
                            : 'border-sage-200 hover:border-sage-300'
                        }`}
                      >
                        <div className="font-medium text-sage-900">{timeline.name}</div>
                        <div className="text-sm text-sage-600">{timeline.price}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Summary */}
          <div className="space-y-6">
            {/* Total Cost */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <div className="text-center mb-6">
                <DollarSign className="w-12 h-12 text-gold-500 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-sage-900 mb-2">Estimated Total</h3>
                <div className="text-4xl font-bold text-gold-600">
                  ${totalCost.toLocaleString()}
                </div>
                <p className="text-sm text-sage-600 mt-2">
                  Complete publishing package
                </p>
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-sage-900 text-sm uppercase tracking-wide">
                  Cost Breakdown
                </h4>
                {Object.entries(breakdown).map(([service, cost]) => (
                  <div key={service} className="flex justify-between items-center py-1">
                    <span className="text-sage-600 capitalize text-sm">
                      {service === 'timeline' ? 'Timeline Adjustment' : service}
                    </span>
                    <span className={`font-medium text-sm ${cost < 0 ? 'text-green-600' : 'text-sage-900'}`}>
                      {cost < 0 ? '' : '+'}${cost.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-gold-500 text-sage-900 py-3 rounded-lg font-semibold hover:bg-gold-400 transition-colors">
                Get Started
              </button>

              <div className="mt-4 p-3 bg-sage-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Info className="w-4 h-4 text-sage-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-sage-600">
                    This is an estimate. Final pricing may vary based on specific requirements.
                  </p>
                </div>
              </div>
            </div>

            {/* Services Included */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-sage-900 mb-4">What's Included</h3>
              <div className="space-y-4">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-gold-100 p-2 rounded-lg">
                        <Icon className="w-5 h-5 text-gold-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sage-900 text-sm">{service.title}</div>
                        <div className="text-sage-600 text-xs">{service.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-sage-100 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-sage-900 mb-4">Why Use Our Calculator?</h2>
            <p className="text-sage-600 max-w-2xl mx-auto">
              Our transparent pricing tool helps you understand exactly what you're paying for, with no hidden fees or surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Transparent Pricing',
                description: 'See exactly how your total is calculated with detailed breakdowns.'
              },
              {
                title: 'Flexible Options',
                description: 'Customize your package to fit your specific needs and budget.'
              },
              {
                title: 'Professional Quality',
                description: 'All services are performed by industry professionals with proven track records.'
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center">
                <h3 className="font-semibold text-sage-900 mb-2">{benefit.title}</h3>
                <p className="text-sage-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;