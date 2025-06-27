import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, Clock, Users } from 'lucide-react';

type Package = {
  icon: string;
  name: string;
  description: string;
  price: number;
  offer?: number;
  popular: boolean;
  features: string[];
  limitations: string[];
  deliveryTime: string;
  supportLevel: string;
  badge?: string;
};
type AddOn = { name: string; price: number; description: string };

const Packages: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const packages: Package[] = [ /* ...your packages data... */ ];
  const addOns: AddOn[] = [ /* ...your addOns data... */ ];

  const getDiscountPercent = (offer?: number, price?: number) =>
    offer ? Math.round(((offer - (price || 0)) / offer) * 100) : 0;

  const toggleAddOn = (addon: AddOn) => {
    setSelectedAddOns(prev =>
      prev.some(a => a.name === addon.name)
        ? prev.filter(a => a.name !== addon.name)
        : [...prev, addon]
    );
  };

  const handleSubmit = async () => {
    if (!selectedPackage) {
      setMessage({ type: 'error', text: 'Please select a package.' });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const payload = {
        packageName: selectedPackage.name,
        addOns: selectedAddOns.map(a => a.name),
      };
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/packages/choose`, payload);
      setMessage({ type: 'success', text: res.data.message || 'Selection saved!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Submission failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sage-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">/* ...same header... */</div>

        {message && (
          <div className={`mb-6 p-4 rounded ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {message.text}
          </div>
        )}

        {/* Package Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {packages.map(pkg => (
            <div
              key={pkg.name}
              className={`relative bg-white rounded-2xl shadow-lg transition-all ${
                pkg.popular ? 'ring-2 ring-gold-500 scale-105' : ''
              } ${selectedPackage?.name === pkg.name ? 'border-4 border-gold-500' : ''}`}
              onClick={() => setSelectedPackage(pkg)}
            >
              {pkg.badge && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gold-500 text-sage-900 px-4 py-1 rounded-full text-xs font-bold">
                    {pkg.badge}
                  </div>
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-sage-900 mb-2">{pkg.icon} {pkg.name}</h3>
                <p className="text-sage-600 mb-4">{pkg.description}</p>
                <div className="mb-4 flex flex-col items-center">
                  {pkg.offer && <span className="text-sm line-through text-sage-500">₹{pkg.offer}</span>}
                  <span className="text-4xl font-bold text-sage-900">₹{pkg.price}</span>
                  {pkg.offer && <span className="text-sm text-gold-600 font-medium">{getDiscountPercent(pkg.offer, pkg.price)}% OFF</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f,i) => (
                    <li key={i} className="flex items-start"><Check className="text-gold-500 mr-3"/> {f}</li>
                  ))}
                </ul>
                <div className="border-t pt-6 mb-8 text-sm">
                  <div className="flex justify-between mb-2"><span className="flex items-center"><Clock className="mr-2"/>Delivery:</span> {pkg.deliveryTime}</div>
                  <div className="flex justify-between"><span className="flex items-center"><Users className="mr-2"/>Support:</span> {pkg.supportLevel}</div>
                </div>
                <button className={`w-full py-4 rounded-lg font-semibold transition ${
                  selectedPackage?.name === pkg.name ? 'bg-gold-600 text-white' :
                  pkg.popular ? 'bg-gold-500 text-sage-900 hover:bg-gold-400' :
                  'bg-sage-700 text-gold-100 hover:bg-sage-800'
                }`}>
                  {selectedPackage?.name === pkg.name ? 'Selected' : 'Select Package'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-sage-900 mb-4">Optional Add-ons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addOns.map(addon => (
              <div key={addon.name} className="border p-6 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{addon.name}</h3>
                  <p className="text-sage-600 text-sm">{addon.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-xl font-bold text-gold-600">₹{addon.price}</span>
                  <input
                    type="checkbox"
                    checked={selectedAddOns.some(a => a.name === addon.name)}
                    onChange={() => toggleAddOn(addon)}
                    className="w-5 h-5 text-gold-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="text-center mb-16">
          <button
            onClick={handleSubmit}
            disabled={!selectedPackage || loading}
            className={`px-8 py-4 rounded-lg text-white font-semibold transition ${
              !selectedPackage || loading ? 'bg-sage-300 cursor-not-allowed' : 'bg-gold-600 hover:bg-gold-500'
            }`}
          >
            {loading ? 'Submitting...' : 'Confirm & Continue'}
          </button>
        </div>

        {/* FAQ & CTA */}
        {/* ...your FAQ block... */}
      </div>
    </div>
  );
};

export default Packages;



