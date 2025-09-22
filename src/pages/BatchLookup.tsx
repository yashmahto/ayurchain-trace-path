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

  // Dummy data for demonstration
  const dummyBatches: Batch[] = [
    {
      id: 'AYUR-ASH-082024-KER',
      herbName: 'Ashwagandha',
      location: 'Kerala, India',
      harvestDate: '2024-08-15',
      farmerName: 'Rajesh Kumar',
      quantity: '50',
      quality: 'Premium',
      notes: 'Organic cultivation, no pesticides used',
      createdAt: '2024-08-15T10:30:00Z'
    },
    {
      id: 'AYUR-TUR-082024-TN',
      herbName: 'Turmeric',
      location: 'Tamil Nadu, India',
      harvestDate: '2024-08-20',
      farmerName: 'Priya Sharma',
      quantity: '75',
      quality: 'Standard',
      notes: 'Traditional farming methods',
      createdAt: '2024-08-20T14:15:00Z'
    },
    {
      id: 'AYUR-TUL-082024-HP',
      herbName: 'Tulsi (Holy Basil)',
      location: 'Himachal Pradesh, India',
      harvestDate: '2024-08-25',
      farmerName: 'Amit Singh',
      quantity: '30',
      quality: 'Premium',
      notes: 'High altitude cultivation, superior quality',
      createdAt: '2024-08-25T09:45:00Z'
    }
  ];

  const handleSearch = async () => {
    if (!batchId.trim()) {
      setError('Please enter a batch ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundBatch = dummyBatches.find(b => b.id === batchId);
      
      if (foundBatch) {
        setBatch(foundBatch);
      } else {
        setError('Batch not found. Please check the batch ID and try again.');
        setBatch(null);
      }
    } catch (err) {
      setError('Error searching for batch. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-800 mb-4">🔍 Batch Lookup</h1>
            <p className="text-lg text-green-600">Search and verify herb batch information</p>
          </div>

          {/* Search Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Search Batch Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="batchId">Batch ID</Label>
                  <div className="flex gap-2">
                    <Input
                      id="batchId"
                      value={batchId}
                      onChange={(e) => setBatchId(e.target.value)}
                      placeholder="Enter batch ID (e.g., AYUR-ASH-082024-KER)"
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSearch}
                      disabled={loading}
                      className="bg-green-600 hover:bg-green-700 text-white"
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
            <Card className="mb-8 border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                  <p className="text-red-600">{error}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Batch Details */}
          {batch && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  Batch Information Found
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Package className="w-5 h-5 mr-3 text-green-600" />
                      <div>
                        <span className="font-medium">Herb Name:</span>
                        <span className="ml-2">{batch.herbName}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <User className="w-5 h-5 mr-3 text-green-600" />
                      <div>
                        <span className="font-medium">Farmer:</span>
                        <span className="ml-2">{batch.farmerName}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-3 text-green-600" />
                      <div>
                        <span className="font-medium">Origin:</span>
                        <span className="ml-2">{batch.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-3 text-green-600" />
                      <div>
                        <span className="font-medium">Harvest Date:</span>
                        <span className="ml-2">{new Date(batch.harvestDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Package className="w-5 h-5 mr-3 text-green-600" />
                      <div>
                        <span className="font-medium">Quantity:</span>
                        <span className="ml-2">{batch.quantity} kg</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">Quality Grade:</span>
                      <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
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
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Additional Notes:</span>
                    <p className="text-gray-600 mt-1">{batch.notes}</p>
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
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Search for a Batch</h3>
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
