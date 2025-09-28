import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Search, CheckCircle, Clock, AlertTriangle, Factory } from 'lucide-react';

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
  processingSteps?: ProcessingStep[];
}

interface ProcessingStep {
  id: string;
  stepName: string;
  status: 'pending' | 'in-progress' | 'completed';
  startDate?: string;
  endDate?: string;
  notes?: string;
  qualityCheck?: 'passed' | 'failed' | 'pending';
}

const ProcessorPortal = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [searchId, setSearchId] = useState('');
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [showProcessingForm, setShowProcessingForm] = useState(false);
  const [processingData, setProcessingData] = useState({
    stepName: '',
    notes: '',
    qualityCheck: 'pending' as 'passed' | 'failed' | 'pending'
  });

  // Load batches from localStorage
  useEffect(() => {
    const savedBatches = localStorage.getItem('ayurchain-batches');
    if (savedBatches) {
      setBatches(JSON.parse(savedBatches));
    }
  }, []);

  const handleSearch = () => {
    if (!searchId.trim()) return;
    
    const foundBatch = batches.find(batch => batch.id === searchId);
    if (foundBatch) {
      setSelectedBatch(foundBatch);
    } else {
      alert('Batch not found. Please check the batch ID.');
    }
  };

  const addProcessingStep = () => {
    if (!selectedBatch || !processingData.stepName.trim()) return;

    const newStep: ProcessingStep = {
      id: Date.now().toString(),
      stepName: processingData.stepName,
      status: 'completed',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      notes: processingData.notes,
      qualityCheck: processingData.qualityCheck
    };

    const updatedBatch = {
      ...selectedBatch,
      processingSteps: [...(selectedBatch.processingSteps || []), newStep]
    };

    // Update the batch in the batches array
    const updatedBatches = batches.map(batch => 
      batch.id === selectedBatch.id ? updatedBatch : batch
    );
    
    setBatches(updatedBatches);
    setSelectedBatch(updatedBatch);
    
    // Save to localStorage
    localStorage.setItem('ayurchain-batches', JSON.stringify(updatedBatches));
    
    // Reset form
    setProcessingData({
      stepName: '',
      notes: '',
      qualityCheck: 'pending'
    });
    setShowProcessingForm(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'pending':
        return <AlertTriangle className="w-5 h-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const getQualityIcon = (quality: string) => {
    switch (quality) {
      case 'passed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-teal-800 mb-4">🏭 Processor Portal</h1>
            <p className="text-lg text-teal-600">Process and track herb batches through your facility</p>
          </div>

          {/* Search Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Find Batch for Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter batch ID (e.g., AYUR-ABC-123456)"
                  className="flex-1"
                />
                <Button 
                  onClick={handleSearch}
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Batch Details */}
          {selectedBatch && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Batch Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Package className="w-4 h-4 mr-2 text-teal-600" />
                        <span className="font-medium">Herb:</span>
                        <span className="ml-2">{selectedBatch.herbName}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Farmer:</span>
                        <span className="ml-2">{selectedBatch.farmerName}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Origin:</span>
                        <span className="ml-2">{selectedBatch.location}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="font-medium">Harvest Date:</span>
                        <span className="ml-2">{new Date(selectedBatch.harvestDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Quantity:</span>
                        <span className="ml-2">{selectedBatch.quantity} kg</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Quality:</span>
                        <span className="ml-2 px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                          {selectedBatch.quality}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Processing Steps */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Processing Steps</CardTitle>
                    <Button 
                      onClick={() => setShowProcessingForm(!showProcessingForm)}
                      className="bg-teal-600 hover:bg-teal-700 text-white"
                    >
                      <Factory className="w-4 h-4 mr-2" />
                      Add Processing Step
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {showProcessingForm && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-4">Add New Processing Step</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="stepName">Step Name</Label>
                          <Input
                            id="stepName"
                            value={processingData.stepName}
                            onChange={(e) => setProcessingData({...processingData, stepName: e.target.value})}
                            placeholder="e.g., Quality Testing, Cleaning, Drying"
                          />
                        </div>
                        <div>
                          <Label htmlFor="qualityCheck">Quality Check Result</Label>
                          <Select 
                            value={processingData.qualityCheck} 
                            onValueChange={(value: 'passed' | 'failed' | 'pending') => 
                              setProcessingData({...processingData, qualityCheck: value})
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="passed">Passed</SelectItem>
                              <SelectItem value="failed">Failed</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="notes">Notes</Label>
                          <Textarea
                            id="notes"
                            value={processingData.notes}
                            onChange={(e) => setProcessingData({...processingData, notes: e.target.value})}
                            placeholder="Additional notes about this processing step..."
                            rows={3}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={addProcessingStep} className="bg-teal-600 hover:bg-teal-700">
                            Add Step
                          </Button>
                          <Button variant="outline" onClick={() => setShowProcessingForm(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    {selectedBatch.processingSteps && selectedBatch.processingSteps.length > 0 ? (
                      selectedBatch.processingSteps.map((step, index) => (
                        <div key={step.id} className="flex items-start space-x-4 p-4 bg-[#FFF7ED] rounded-lg border">
                          <div className="flex flex-col items-center">
                            <div className="p-2 rounded-full bg-gray-100">
                              {getStatusIcon(step.status)}
                            </div>
                            {index < selectedBatch.processingSteps!.length - 1 && (
                              <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-lg">{step.stepName}</h3>
                              <div className="flex items-center space-x-2">
                                {getQualityIcon(step.qualityCheck || 'pending')}
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  step.qualityCheck === 'passed' 
                                    ? 'bg-green-100 text-green-800'
                                    : step.qualityCheck === 'failed'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {step.qualityCheck}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm">
                              Completed: {step.endDate ? new Date(step.endDate).toLocaleString() : 'N/A'}
                            </p>
                            {step.notes && (
                              <p className="text-gray-600 mt-2">{step.notes}</p>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Factory className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>No processing steps added yet. Add the first processing step to get started.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* No Batch Selected */}
          {!selectedBatch && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Search for a Batch</h3>
                  <p className="text-gray-500">
                    Enter a batch ID above to view and process the batch through your facility.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProcessorPortal;
