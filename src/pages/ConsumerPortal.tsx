import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, QrCode, MapPin, Calendar, User, Package, CheckCircle } from 'lucide-react';

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

interface SupplyChainStep {
  id: string;
  step: string;
  actor: string;
  location: string;
  date: string;
  status: 'completed' | 'current' | 'pending';
  description: string;
}

const ConsumerPortal = () => {
  const [batchId, setBatchId] = useState('');
  const [batch, setBatch] = useState<Batch | null>(null);
  const [supplyChain, setSupplyChain] = useState<SupplyChainStep[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check for batchId in URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlBatchId = urlParams.get('batchId');
    if (urlBatchId) {
      setBatchId(urlBatchId);
      handleSearch(urlBatchId);
    }
  }, []);

  const generateSupplyChain = (batch: Batch): SupplyChainStep[] => {
    const harvestDate = new Date(batch.harvestDate);
    const processingDate = new Date(harvestDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days later
    const distributionDate = new Date(processingDate.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 days later
    const retailDate = new Date(distributionDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days later

   
  };

  const handleSearch = async (searchBatchId?: string) => {
    const idToSearch = searchBatchId || batchId;
    if (!idToSearch.trim()) {
      setError('Please enter a batch ID');
      return;
    }

    setLoading(true);
    setError('');
    setBatch(null);
    setSupplyChain([]);

    try {
      const res = await fetch(`/api/batch?id=${encodeURIComponent(idToSearch)}`);
      if (!res.ok) {
        if (res.status === 404) {
          setError('Batch not found. Please check the batch ID and try again.');
        } else {
          setError('Error searching for batch. Please try again.');
        }
        setBatch(null);
        setSupplyChain([]);
        return;
      }
      const data = await res.json();
      setBatch(data);
      setSupplyChain(generateSupplyChain(data));
    } catch (err) {
      setError('Error searching for batch. Please try again.');
      setBatch(null);
      setSupplyChain([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'current':
        return <div className="w-5 h-5 rounded-full bg-blue-500 animate-pulse" />;
      case 'pending':
        return <div className="w-5 h-5 rounded-full bg-gray-300" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'current':
        return 'border-blue-200 bg-blue-50';
      case 'pending':
        return 'border-gray-200 bg-gray-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-2 py-8 md:px-0">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-5xl font-extrabold text-green-900 mb-3 tracking-tight drop-shadow-sm">🛒 Consumer Portal</h1>
            <p className="text-xl text-green-700 font-medium">Track your herb's journey from farm to pharmacy</p>
          </div>

          {/* Search Section */}
          <Card className="mb-10 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Search className="w-5 h-5" />
                Track Your Product
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div>
                  <Label htmlFor="batchId" className="text-green-700 font-semibold">Batch ID or QR Code</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="batchId"
                      value={batchId}
                      onChange={(e) => setBatchId(e.target.value)}
                      placeholder="Enter batch ID (e.g., AYUR-ABC-123456)"
                      className="flex-1 border-green-200 focus:ring-green-400/40 focus:border-green-400/80 bg-white/70"
                    />
                    <Button 
                      onClick={() => handleSearch()}
                      disabled={loading}
                      className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 shadow-md"
                    >
                      {loading ? 'Searching...' : 'Search'}
                    </Button>
                  </div>
                </div>
                <div className="text-center">
                  <Button variant="outline" className="border-green-500 text-green-700 hover:bg-green-50/60">
                    <QrCode className="w-4 h-4 mr-2" />
                    Scan QR Code
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Message */}
          {error && (
            <Card className="mb-8 border-red-200 bg-red-50/80 shadow">
              <CardContent className="pt-6">
                <p className="text-red-600 text-center font-semibold">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Batch Details */}
          {batch && (
            <Card className="mb-10 shadow-lg border-0 bg-white/90">
              <CardHeader>
                <CardTitle className="text-green-800">Batch Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-green-600" />
                      <span className="font-medium">Herb:</span>
                      <span className="ml-2 text-green-900 font-semibold">{batch.herbName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-green-600" />
                      <span className="font-medium">Farmer:</span>
                      <span className="ml-2 text-green-900">{batch.farmerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <span className="font-medium">Origin:</span>
                      <span className="ml-2 text-green-900">{batch.location}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <span className="font-medium">Harvest Date:</span>
                      <span className="ml-2 text-green-900">{new Date(batch.harvestDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-green-600" />
                      <span className="font-medium">Quantity:</span>
                      <span className="ml-2 text-green-900">{batch.quantity} kg</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Quality:</span>
                      <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        {batch.quality}
                      </span>
                    </div>
                  </div>
                </div>
                {batch.notes && (
                  <div className="mt-5 p-4 bg-green-50/80 rounded-lg border border-green-100">
                    <span className="font-medium text-green-800">Notes:</span>
                    <p className="text-gray-700 mt-1">{batch.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Supply Chain Timeline */}
          {supplyChain.length > 0 && (
            <Card className="mb-10 shadow-lg border-0 bg-white/90">
              <CardHeader>
                <CardTitle className="text-green-800">Supply Chain Journey</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Progress Bar */}
                <div className="flex items-center justify-between mb-8 px-2">
                  {supplyChain.map((step, idx) => (
                    <React.Fragment key={step.id}>
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full border-4 ${
                          step.status === 'completed' ? 'border-green-500 bg-green-100' :
                          step.status === 'current' ? 'border-blue-400 bg-blue-50 animate-pulse' :
                          'border-gray-300 bg-gray-100'
                        }`}>
                          {getStatusIcon(step.status)}
                        </div>
                        <span className="mt-2 text-xs font-semibold text-green-800">{step.step}</span>
                      </div>
                      {idx < supplyChain.length - 1 && (
                        <div className={`flex-1 h-1 mx-1 md:mx-2 rounded-full ${
                          supplyChain[idx+1].status === 'completed' || step.status === 'completed'
                            ? 'bg-green-300' : 'bg-gray-200'
                        }`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                {/* Timeline Details */}
                <div className="space-y-6">
                  {supplyChain.map((step, index) => (
                    <div key={step.id} className={`flex items-start space-x-4 p-4 rounded-xl shadow-sm border ${getStatusColor(step.status)} transition-all duration-300`}>
                      <div className="flex flex-col items-center">
                        <div className={`p-2 rounded-full border-2 ${getStatusColor(step.status)}`}>
                          {getStatusIcon(step.status)}
                        </div>
                        {index < supplyChain.length - 1 && (
                          <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg text-green-900">{step.step}</h3>
                          <span className="text-sm text-gray-500">
                            {new Date(step.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-green-700 font-medium">{step.actor}</p>
                        <p className="text-gray-500 text-sm">{step.location}</p>
                        <p className="text-gray-700 mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* No Results */}
          {!batch && !loading && !error && (
            <Card className="shadow border-0 bg-white/80">
              <CardContent className="pt-8">
                <div className="text-center py-10">
                  <QrCode className="w-16 h-16 mx-auto text-green-200 mb-4" />
                  <h3 className="text-xl font-semibold text-green-700 mb-2">Track Your Product</h3>
                  <p className="text-gray-500">
                    Enter a batch ID above to see the complete journey of your herb from farm to pharmacy.
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

export default ConsumerPortal;
