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

    return [
      {
        id: '1',
        step: 'Harvest',
        actor: batch.farmerName,
        location: batch.location,
        date: harvestDate.toISOString(),
        status: 'completed',
        description: `Harvested ${batch.quantity}kg of ${batch.herbName} from ${batch.location}`
      },
      {
        id: '2',
        step: 'Processing',
        actor: 'GreenHerbs Processing Co.',
        location: 'Kochi, Kerala',
        date: processingDate.toISOString(),
        status: 'completed',
        description: 'Quality testing, cleaning, and initial processing completed'
      },
      {
        id: '3',
        step: 'Distribution',
        actor: 'Ayurvedic Distributors Ltd.',
        location: 'Mumbai, Maharashtra',
        date: distributionDate.toISOString(),
        status: 'current',
        description: 'Batch distributed to regional warehouses'
      },
      {
        id: '4',
        step: 'Retail',
        actor: 'Wellness Pharmacy',
        location: 'Delhi, India',
        date: retailDate.toISOString(),
        status: 'pending',
        description: 'Ready for retail sale'
      }
    ];
  };

  const handleSearch = async (searchBatchId?: string) => {
    const idToSearch = searchBatchId || batchId;
    if (!idToSearch.trim()) {
      setError('Please enter a batch ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call - in real app, this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get batches from localStorage
      const savedBatches = localStorage.getItem('ayurchain-batches');
      let batches: Batch[] = savedBatches ? JSON.parse(savedBatches) : [];
      
      // Add dummy data if no batches exist
      if (batches.length === 0) {
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
        batches = dummyBatches;
        localStorage.setItem('ayurchain-batches', JSON.stringify(dummyBatches));
      }
      
      const foundBatch = batches.find(b => b.id === idToSearch);
      
      if (foundBatch) {
        setBatch(foundBatch);
        setSupplyChain(generateSupplyChain(foundBatch));
      } else {
        setError('Batch not found. Please check the batch ID and try again.');
        setBatch(null);
        setSupplyChain([]);
      }
    } catch (err) {
      setError('Error searching for batch. Please try again.');
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-800 mb-4">🛒 Consumer Portal</h1>
            <p className="text-lg text-green-600">Track your herb's journey from farm to pharmacy</p>
          </div>

          {/* Search Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Track Your Product
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="batchId">Batch ID or QR Code</Label>
                  <div className="flex gap-2">
                    <Input
                      id="batchId"
                      value={batchId}
                      onChange={(e) => setBatchId(e.target.value)}
                      placeholder="Enter batch ID (e.g., AYUR-ABC-123456)"
                      className="flex-1"
                    />
                    <Button 
                      onClick={() => handleSearch()}
                      disabled={loading}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {loading ? 'Searching...' : 'Search'}
                    </Button>
                  </div>
                </div>
                <div className="text-center">
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                    <QrCode className="w-4 h-4 mr-2" />
                    Scan QR Code
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Message */}
          {error && (
            <Card className="mb-8 border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <p className="text-red-600 text-center">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Batch Details */}
          {batch && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Batch Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Package className="w-4 h-4 mr-2 text-green-600" />
                      <span className="font-medium">Herb:</span>
                      <span className="ml-2">{batch.herbName}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-green-600" />
                      <span className="font-medium">Farmer:</span>
                      <span className="ml-2">{batch.farmerName}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-green-600" />
                      <span className="font-medium">Origin:</span>
                      <span className="ml-2">{batch.location}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-green-600" />
                      <span className="font-medium">Harvest Date:</span>
                      <span className="ml-2">{new Date(batch.harvestDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Package className="w-4 h-4 mr-2 text-green-600" />
                      <span className="font-medium">Quantity:</span>
                      <span className="ml-2">{batch.quantity} kg</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">Quality:</span>
                      <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {batch.quality}
                      </span>
                    </div>
                  </div>
                </div>
                {batch.notes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Notes:</span>
                    <p className="text-gray-600 mt-1">{batch.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Supply Chain Timeline */}
          {supplyChain.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Supply Chain Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supplyChain.map((step, index) => (
                    <div key={step.id} className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className={`p-2 rounded-full border-2 ${getStatusColor(step.status)}`}>
                          {getStatusIcon(step.status)}
                        </div>
                        {index < supplyChain.length - 1 && (
                          <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">{step.step}</h3>
                          <span className="text-sm text-gray-500">
                            {new Date(step.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-600 font-medium">{step.actor}</p>
                        <p className="text-gray-500 text-sm">{step.location}</p>
                        <p className="text-gray-600 mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* No Results */}
          {!batch && !loading && !error && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <QrCode className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Track Your Product</h3>
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
