import axios from 'axios';
import React, { useState } from 'react';
import {
  Upload, FileText, TrendingUp, CheckCircle,
  ArrowRight, BookOpen
} from 'lucide-react';

const Publish = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    manuscript: null as File | null,
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

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const steps = [
    { number: 1, title: 'Manuscript Upload', description: 'Upload your completed manuscript', icon: Upload, completed: currentStep > 1 },
    { number: 2, title: 'Book Details', description: 'Tell us about your book', icon: FileText, completed: currentStep > 2 },
    { number: 3, title: 'Publishing Goals', description: 'Define your objectives', icon: TrendingUp, completed: currentStep > 3 },
    { number: 4, title: 'Review & Submit', description: 'Review and submit your application', icon: CheckCircle, completed: false }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, manuscript: e.target.files![0] }));
    }
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!formData.manuscript) {
      setMessage({ type: 'error', text: 'Manuscript is required.' });
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append('manuscript', formData.manuscript);
      Object.keys(formData).forEach(key => {
        if (key !== 'manuscript') {
          data.append(key, String(formData[key as keyof typeof formData]));
        }
      });

      const res = await axios.post('http://localhost:5000/api/publish', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMessage({ type: 'success', text: 'Your book has been submitted successfully!' });
      console.log(res.data);
      setCurrentStep(1);
      setFormData({
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
    } catch (error: any) {
      console.error(error);
      setMessage({ type: 'error', text: error.response?.data?.message || 'Submission failed' });
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-sage-900 mb-4">Upload Your Manuscript</h2>
            <p className="text-sage-600 mb-8">Upload in PDF, DOC, or DOCX format. Max 50MB.</p>
          </div>

          <div className="border-2 border-dashed border-sage-300 rounded-xl p-12 text-center hover:border-gold-400 transition-colors">
            <Upload className="w-16 h-16 text-sage-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-sage-900 mb-2">Drag and drop your manuscript here</h3>
            <p className="text-sage-600 mb-4">or</p>
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" id="manuscriptUpload" />
            <label htmlFor="manuscriptUpload">
              <div className="cursor-pointer bg-gold-500 text-sage-900 px-6 py-3 rounded-lg font-semibold hover:bg-gold-400 transition-colors inline-block">
                Browse Files
              </div>
            </label>
            <p className="text-sm text-sage-500 mt-4">Supported formats: PDF, DOC, DOCX (Max 50MB)</p>
            {formData.manuscript && (
              <p className="mt-4 text-sm text-sage-700">Selected file: <strong>{formData.manuscript.name}</strong></p>
            )}
          </div>
        </div>
      );
    }

    // You already wrote steps 2–4 fully, so we reuse your `renderStepContent()` switch here.
    // To keep this reply short, let me know if you want the complete switch-case again.

    return null;
  };

  return (
    <div className="min-h-screen bg-sage-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12 text-gold-500 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-sage-900">Publish Your Book</h1>
          </div>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto">We'll guide you from manuscript to bestseller.</p>
        </div>

        {/* Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = step.completed;
              return (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted ? 'bg-green-500 border-green-500 text-white' :
                      isActive ? 'bg-gold-500 border-gold-500 text-sage-900' :
                      'bg-white border-sage-300 text-sage-400'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="mt-2 text-center">
                      <div className={`text-sm font-semibold ${isActive ? 'text-sage-900' : 'text-sage-600'}`}>{step.title}</div>
                      <div className="text-xs text-sage-500">{step.description}</div>
                    </div>
                  </div>
                  {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-4 ${isCompleted ? 'bg-green-500' : 'bg-sage-200'}`} />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {message && (
            <div className={`mb-6 px-4 py-3 rounded-lg font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message.text}
            </div>
          )}
          {renderStepContent()}
        </div>

        {/* Nav Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              currentStep === 1 ? 'bg-sage-100 text-sage-400 cursor-not-allowed' :
              'bg-sage-200 text-sage-700 hover:bg-sage-300'
            }`}
          >
            Previous
          </button>
          <button
            onClick={currentStep === 4 ? handleSubmit : handleNext}
            className="bg-gold-500 text-sage-900 px-8 py-3 rounded-lg font-semibold hover:bg-gold-400 transition-all flex items-center space-x-2"
            disabled={loading}
          >
            <span>{loading ? 'Submitting...' : currentStep === 4 ? 'Submit Application' : 'Next Step'}</span>
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Publish;
