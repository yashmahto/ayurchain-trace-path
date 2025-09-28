import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Package, MapPin, Calendar, User, CheckCircle, AlertTriangle } from 'lucide-react';

interface Batch {
  id: string;
  herbName: string;
  location: string;
  harvestDate: string;
  farmerName: string;
  quantity: string;
  quality: string;
  notes: string;
  createdAt: string;
}

const BatchLookup = () => {
  const [batchId, setBatchId] = useState('');
  const [batch, setBatch] = useState<Batch | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');



  const handleSearch = async () => {
    if (!batchId.trim()) {
      setError('Please enter a batch ID');
      return;
    }

    setLoading(true);
    setError('');
    setBatch(null);

    try {
      const res = await fetch(`/api/batch?id=${encodeURIComponent(batchId)}`);
      if (!res.ok) {
        if (res.status === 404) {
          setError('Batch not found. Please check the batch ID and try again.');
        } else {
          setError('Error searching for batch. Please try again.');
        }
        setBatch(null);
        return;
      }
      const data = await res.json();
      setBatch(data);
    } catch (err) {
      setError('Error searching for batch. Please try again.');
      setBatch(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-2 py-8 md:px-0">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-5xl font-extrabold text-green-900 mb-3 tracking-tight drop-shadow-sm">🔍 Batch Lookup</h1>
            <p className="text-xl text-green-700 font-medium">Search and verify herb batch information</p>
          </div>

          {/* Search Section */}
          <Card className="mb-10 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Search className="w-5 h-5" />
                Search Batch Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div>
                  <Label htmlFor="batchId" className="text-green-700 font-semibold">Batch ID</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="batchId"
                      value={batchId}
                      onChange={(e) => setBatchId(e.target.value)}
                      placeholder="Enter batch ID (e.g., AYUR-ASH-082024-KER)"
                      className="flex-1 border-green-200 focus:ring-green-400/40 focus:border-green-400/80 bg-white/70"
                    />
                    <Button 
                      onClick={handleSearch}
                      disabled={loading}
                      className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 shadow-md"
                    >
                      {loading ? 'Searching...' : 'Search'}
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p><strong>Available demo batch IDs:</strong></p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>AYUR-ASH-082024-KER (Ashwagandha)</li>
                    <li>AYUR-TUR-082024-TN (Turmeric)</li>
                    <li>AYUR-TUL-082024-HP (Tulsi)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Message */}
          {error && (
            <Card className="mb-8 border-red-200 bg-red-50/80 shadow">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                  <p className="text-red-600 font-semibold">{error}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Batch Details */}
          {batch && (
            <Card className="mb-10 shadow-lg border-0 bg-white/90">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800 gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Batch Information Found
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Herb Name:</span>
                      <span className="ml-2 text-green-900 font-semibold">{batch.herbName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Farmer:</span>
                      <span className="ml-2 text-green-900">{batch.farmerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Origin:</span>
                      <span className="ml-2 text-green-900">{batch.location}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Harvest Date:</span>
                      <span className="ml-2 text-green-900">{new Date(batch.harvestDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Quantity:</span>
                      <span className="ml-2 text-green-900">{batch.quantity} kg</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Quality Grade:</span>
                      <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
                        batch.quality === 'Premium' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {batch.quality}
                      </span>
                    </div>
                  </div>
                </div>
                {batch.notes && (
                  <div className="mt-5 p-4 bg-green-50/80 rounded-lg border border-green-100">
                    <span className="font-medium text-green-800">Additional Notes:</span>
                    <p className="text-gray-700 mt-1">{batch.notes}</p>
                  </div>
                )}
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="font-medium text-green-800">Verification Status</span>
                  </div>
                  <p className="text-green-700 mt-1">
                    This batch has been verified and is authentic. All information is recorded on the blockchain.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* No Results */}
          {!batch && !loading && !error && (
            <Card className="shadow border-0 bg-white/80">
              <CardContent className="pt-8">
                <div className="text-center py-10">
                  <Search className="w-16 h-16 mx-auto text-green-200 mb-4" />
                  <h3 className="text-xl font-semibold text-green-700 mb-2">Search for a Batch</h3>
                  <p className="text-gray-500">
                    Enter a batch ID above to view detailed information about the herb batch.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchLookup;
