import React, { useState } from 'react';
import { Upload, FileText, Palette, Globe, TrendingUp, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';

const Publish = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    manuscript: null,
    title: '',
    genre: '',
    description: '',
    targetAudience: '',
    publishingGoals: '',
    timeline: '',
    budget: '',
    previouslyPublished: false,
    marketingExperience: ''
  });

  const steps = [
    {
      number: 1,
      title: 'Manuscript Upload',
      description: 'Upload your completed manuscript',
      icon: Upload,
      completed: currentStep > 1
    },
    {
      number: 2,
      title: 'Book Details',
      description: 'Tell us about your book',
      icon: FileText,
      completed: currentStep > 2
    },
    {
      number: 3,
      title: 'Publishing Goals',
      description: 'Define your objectives',
      icon: TrendingUp,
      completed: currentStep > 3
    },
    {
      number: 4,
      title: 'Review & Submit',
      description: 'Review and submit your application',
      icon: CheckCircle,
      completed: false
    }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-sage-900 mb-4">Upload Your Manuscript</h2>
              <p className="text-sage-600 mb-8">
                Upload your completed manuscript in PDF, DOC, or DOCX format. Maximum file size: 50MB.
              </p>
            </div>

            <div className="border-2 border-dashed border-sage-300 rounded-xl p-12 text-center hover:border-gold-400 transition-colors">
              <Upload className="w-16 h-16 text-sage-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-sage-900 mb-2">
                Drag and drop your manuscript here
              </h3>
              <p className="text-sage-600 mb-4">or</p>
              <button className="bg-gold-500 text-sage-900 px-6 py-3 rounded-lg font-semibold hover:bg-gold-400 transition-colors">
                Browse Files
              </button>
              <p className="text-sm text-sage-500 mt-4">
                Supported formats: PDF, DOC, DOCX (Max 50MB)
              </p>
            </div>

            <div className="bg-sage-50 rounded-lg p-6">
              <h4 className="font-semibold text-sage-900 mb-3">Before you upload:</h4>
              <ul className="space-y-2 text-sm text-sage-700">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Ensure your manuscript is complete and properly formatted</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Include a title page with your name and contact information</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Double-check for any formatting issues or errors</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Make sure all chapters and sections are included</span>
                </li>
              </ul>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-sage-900 mb-4">Tell Us About Your Book</h2>
              <p className="text-sage-600">
                Help us understand your book better so we can provide the best publishing services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-sage-900 mb-2">
                  Book Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  placeholder="Enter your book title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-sage-900 mb-2">
                  Genre
                </label>
                <select
                  value={formData.genre}
                  onChange={(e) => handleInputChange('genre', e.target.value)}
                  className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                >
                  <option value="">Select a genre</option>
                  <option value="fiction">Fiction</option>
                  <option value="non-fiction">Non-Fiction</option>
                  <option value="poetry">Poetry</option>
                  <option value="biography">Biography</option>
                  <option value="business">Business</option>
                  <option value="self-help">Self-Help</option>
                  <option value="science">Science</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-sage-900 mb-2">
                Book Description
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                placeholder="Provide a brief description of your book (2-3 paragraphs)"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-sage-900 mb-2">
                Target Audience
              </label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                placeholder="Who is your ideal reader? (e.g., Young adults, business professionals, etc.)"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-sage-900 mb-3">
                Have you been previously published?
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="previouslyPublished"
                    value="true"
                    checked={formData.previouslyPublished === true}
                    onChange={() => handleInputChange('previouslyPublished', true)}
                    className="text-gold-500 focus:ring-gold-500"
                  />
                  <span className="text-sage-700">Yes</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="previouslyPublished"
                    value="false"
                    checked={formData.previouslyPublished === false}
                    onChange={() => handleInputChange('previouslyPublished', false)}
                    className="text-gold-500 focus:ring-gold-500"
                  />
                  <span className="text-sage-700">No</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-sage-900 mb-4">Your Publishing Goals</h2>
              <p className="text-sage-600">
                Understanding your goals helps us recommend the best package and services for you.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-sage-900 mb-2">
                What are your main publishing goals?
              </label>
              <textarea
                rows={3}
                value={formData.publishingGoals}
                onChange={(e) => handleInputChange('publishingGoals', e.target.value)}
                className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                placeholder="e.g., Reach a wide audience, establish credibility, generate income, share knowledge..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-sage-900 mb-2">
                  Preferred Timeline
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                  className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                >
                  <option value="">Select timeline</option>
                  <option value="rush">Rush (2-4 weeks)</option>
                  <option value="standard">Standard (6-8 weeks)</option>
                  <option value="extended">Extended (10-12 weeks)</option>
                  <option value="flexible">I'm flexible</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-sage-900 mb-2">
                  Budget Range
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                >
                  <option value="">Select budget range</option>
                  <option value="under-1000">Under $1,000</option>
                  <option value="1000-2500">$1,000 - $2,500</option>
                  <option value="2500-5000">$2,500 - $5,000</option>
                  <option value="over-5000">Over $5,000</option>
                  <option value="discuss">Let's discuss</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-sage-900 mb-2">
                Marketing Experience
              </label>
              <select
                value={formData.marketingExperience}
                onChange={(e) => handleInputChange('marketingExperience', e.target.value)}
                className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              >
                <option value="">Select your marketing experience</option>
                <option value="none">No marketing experience</option>
                <option value="basic">Basic social media presence</option>
                <option value="intermediate">Some marketing experience</option>
                <option value="advanced">Extensive marketing experience</option>
              </select>
            </div>

            <div className="bg-gold-50 rounded-lg p-6">
              <h4 className="font-semibold text-sage-900 mb-3">💡 Pro Tip</h4>
              <p className="text-sage-700 text-sm">
                Being clear about your goals and constraints helps us create a customized publishing plan 
                that maximizes your book's potential while staying within your budget and timeline.
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-sage-900 mb-4">Review Your Submission</h2>
              <p className="text-sage-600">
                Please review your information before submitting your publishing application.
              </p>
            </div>

            <div className="bg-white border border-sage-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-sage-900 mb-4">Manuscript Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-sage-600">Title:</span>
                  <span className="ml-2 text-sage-900 font-medium">{formData.title || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-sage-600">Genre:</span>
                  <span className="ml-2 text-sage-900 font-medium">{formData.genre || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-sage-600">Target Audience:</span>
                  <span className="ml-2 text-sage-900 font-medium">{formData.targetAudience || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-sage-600">Previously Published:</span>
                  <span className="ml-2 text-sage-900 font-medium">
                    {formData.previouslyPublished ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
              {formData.description && (
                <div className="mt-4">
                  <span className="text-sage-600">Description:</span>
                  <p className="mt-1 text-sage-900 text-sm">{formData.description}</p>
                </div>
              )}
            </div>

            <div className="bg-white border border-sage-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-sage-900 mb-4">Publishing Goals</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-sage-600">Timeline:</span>
                  <span className="ml-2 text-sage-900 font-medium">{formData.timeline || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-sage-600">Budget:</span>
                  <span className="ml-2 text-sage-900 font-medium">{formData.budget || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-sage-600">Marketing Experience:</span>
                  <span className="ml-2 text-sage-900 font-medium">{formData.marketingExperience || 'Not specified'}</span>
                </div>
              </div>
              {formData.publishingGoals && (
                <div className="mt-4">
                  <span className="text-sage-600">Goals:</span>
                  <p className="mt-1 text-sage-900 text-sm">{formData.publishingGoals}</p>
                </div>
              )}
            </div>

            <div className="bg-sage-50 rounded-lg p-6">
              <h4 className="font-semibold text-sage-900 mb-3">What happens next?</h4>
              <ul className="space-y-2 text-sm text-sage-700">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>We'll review your manuscript and goals within 24-48 hours</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Our team will prepare a customized publishing proposal</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>We'll schedule a consultation call to discuss your options</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Once approved, we'll begin your publishing journey</span>
                </li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-sage-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12 text-gold-500 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-sage-900">
              Publish Your Book
            </h1>
          </div>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto">
            Start your publishing journey with Zenjaura. We'll guide you through every step from manuscript to bestseller.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = step.completed;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                        isCompleted
                          ? 'bg-green-500 border-green-500 text-white'
                          : isActive
                          ? 'bg-gold-500 border-gold-500 text-sage-900'
                          : 'bg-white border-sage-300 text-sage-400'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="mt-2 text-center">
                      <div
                        className={`text-sm font-semibold ${
                          isActive ? 'text-sage-900' : 'text-sage-600'
                        }`}
                      >
                        {step.title}
                      </div>
                      <div className="text-xs text-sage-500">{step.description}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 ${
                        step.completed ? 'bg-green-500' : 'bg-sage-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              currentStep === 1
                ? 'bg-sage-100 text-sage-400 cursor-not-allowed'
                : 'bg-sage-200 text-sage-700 hover:bg-sage-300'
            }`}
          >
            Previous
          </button>

          <button
            onClick={currentStep === 4 ? () => console.log('Submit form') : handleNext}
            className="bg-gold-500 text-sage-900 px-8 py-3 rounded-lg font-semibold hover:bg-gold-400 transition-all flex items-center space-x-2"
          >
            <span>{currentStep === 4 ? 'Submit Application' : 'Next Step'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Support Section */}
        <div className="mt-12 bg-gradient-to-r from-gold-500 to-gold-600 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-sage-900 mb-4">
            Need Help Getting Started?
          </h2>
          <p className="text-sage-800 mb-6 max-w-2xl mx-auto">
            Our publishing experts are here to help. Schedule a free consultation to discuss your project and get personalized guidance.
          </p>
          <button className="bg-sage-900 text-gold-100 px-8 py-4 rounded-lg font-semibold hover:bg-sage-800 transition-colors">
            Schedule Free Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Publish;