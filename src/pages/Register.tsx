import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, User, Eye, EyeOff, BookOpen, Check } from 'lucide-react';

type Message = { type: 'success' | 'error'; text: string };

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    authorType: 'first-time',
    agreeToTerms: false,
    subscribeNewsletter: true,
  });

  const handleInput = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.password.length >= 8 },
    { text: 'Uppercase letter', met: /[A-Z]/.test(formData.password) },
    { text: 'Lowercase letter', met: /[a-z]/.test(formData.password) },
    { text: 'Contains number', met: /\d/.test(formData.password) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeToTerms || formData.password !== formData.confirmPassword) return;

    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL ?? 'http://localhost:5000'}/api/authors/register`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          authorType: formData.authorType,
          subscribeNewsletter: formData.subscribeNewsletter,
        }
      );

      setMessage({ type: 'success', text: res.data.message || 'Account created!' });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        authorType: 'first-time',
        agreeToTerms: false,
        subscribeNewsletter: true,
      });
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Server error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-sage-100 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-sage-700 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-gold-100" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-sage-900">Join Zenjaura</h2>
          <p className="mt-2 text-sage-600">Start your publishing journey today</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {message && (
            <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['firstName', 'lastName'].map(field => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-semibold text-sage-900 mb-2">
                    {field === 'firstName' ? 'First Name' : 'Last Name'}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-5 h-5" />
                    <input
                      id={field}
                      type="text"
                      required
                      value={formData[field as keyof typeof formData] as string}
                      onChange={e => handleInput(field as keyof typeof formData, e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-sage-900 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => handleInput('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-500"
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-sage-900 mb-2">I am a...</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'first-time', label: 'First‑time Author' },
                  { key: 'experienced', label: 'Experienced Author' },
                  { key: 'publisher', label: 'Publisher / Agent' },
                ].map(option => (
                  <label key={option.key} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="authorType"
                      value={option.key}
                      checked={formData.authorType === option.key}
                      onChange={() => handleInput('authorType', option.key)}
                      className="text-gold-500"
                    />
                    <span className="text-sage-700 text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {['password', 'confirmPassword'].map(field => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-semibold text-sage-900 mb-2">
                  {field === 'password' ? 'Password' : 'Confirm Password'}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-5 h-5" />
                  <input
                    id={field}
                    type={
                      field === 'password'
                        ? showPassword
                          ? 'text'
                          : 'password'
                        : showConfirmPassword
                        ? 'text'
                        : 'password'
                    }
                    required
                    value={formData[field as keyof typeof formData] as string}
                    onChange={e => handleInput(field as keyof typeof formData, e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-gold-500"
                  />
                  <button
                    type="button"
                    onClick={() => field === 'password' ? setShowPassword(v => !v) : setShowConfirmPassword(v => !v)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sage-400"
                  >
                    {field === 'password'
                      ? showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />
                      : showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {field === 'password' && formData.password && (
                  <div className="mt-3 p-3 bg-sage-50 rounded-lg">
                    <p className="text-sm font-medium text-sage-900 mb-2">Password Requirements:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {passwordRequirements.map((r, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Check className={`w-4 h-4 ${r.met ? 'text-green-500' : 'text-sage-300'}`} />
                          <span className={`text-xs ${r.met ? 'text-green-700' : 'text-sage-600'}`}>
                            {r.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {field === 'confirmPassword' &&
                  formData.confirmPassword &&
                  formData.password !== formData.confirmPassword && (
                    <p className="text-red-600 mt-1 text-sm">Passwords do not match</p>
                  )}
              </div>
            ))}

            <div className="space-y-2">
              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={e => handleInput('agreeToTerms', e.target.checked)}
                  className="mt-1 w-4 h-4 text-gold-500"
                  required
                />
                <span className="text-sm text-sage-700">
                  I agree to the{' '}
                  <Link to="/terms" className="text-gold-600 font-medium">Terms of Service</Link> and{' '}
                  <Link to="/privacy" className="text-gold-600 font-medium">Privacy Policy</Link>.
                </span>
              </label>

              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={formData.subscribeNewsletter}
                  onChange={e => handleInput('subscribeNewsletter', e.target.checked)}
                  className="mt-1 w-4 h-4 text-gold-500"
                />
                <span className="text-sm text-sage-700">Subscribe to newsletter tips & updates.</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!formData.agreeToTerms || formData.password !== formData.confirmPassword || loading}
              className="w-full bg-gold-500 text-sage-900 py-3 rounded-lg font-semibold hover:bg-gold-400 transition disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {/* Place Google/Twitter auth buttons here */}
          </div>

          <p className="mt-6 text-center text-sage-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-gold-600 hover:text-gold-700">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

