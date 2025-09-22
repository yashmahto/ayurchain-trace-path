import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QrCode, Plus, Trash2, Eye } from 'lucide-react';
import QRCode from 'qrcode';

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

const FarmerPortal = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  
  const [formData, setFormData] = useState({
    herbName: '',
    location: '',
    harvestDate: '',
    farmerName: '',
    quantity: '',
    quality: 'Premium',
    notes: ''
  });

  // Load batches from localStorage on component mount
  useEffect(() => {
    const savedBatches = localStorage.getItem('ayurchain-batches');
    if (savedBatches) {
      setBatches(JSON.parse(savedBatches));
    }
  }, []);

  // Save batches to localStorage whenever batches change
  useEffect(() => {
    localStorage.setItem('ayurchain-batches', JSON.stringify(batches));
  }, [batches]);

  const generateBatchId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `AYUR-${random}-${timestamp}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBatch: Batch = {
      id: generateBatchId(),
      ...formData,
      createdAt: new Date().toISOString()
    };

    setBatches([...batches, newBatch]);
    setFormData({
      herbName: '',
      location: '',
      harvestDate: '',
      farmerName: '',
      quantity: '',
      quality: 'Premium',
      notes: ''
    });
    setShowForm(false);
  };

  const generateQRCode = async (batch: Batch) => {
    try {
      const qrData = {
        batchId: batch.id,
        herbName: batch.herbName,
        farmerName: batch.farmerName,
        harvestDate: batch.harvestDate,
        location: batch.location,
        url: `${window.location.origin}/consumer-portal?batchId=${batch.id}`
      };
      
      const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(qrData), {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      
      setQrCodeUrl(qrCodeDataURL);
      setSelectedBatch(batch);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const deleteBatch = (batchId: string) => {
    setBatches(batches.filter(batch => batch.id !== batchId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-emerald-800 mb-4">🌱 Farmer Portal</h1>
            <p className="text-lg text-emerald-600">Manage your herb batches and generate traceability codes</p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mb-8">
            <Button 
              onClick={() => setShowForm(!showForm)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Batch
            </Button>
            <div className="text-sm text-emerald-600">
              Total Batches: {batches.length}
            </div>
          </div>

          {/* Batch Form */}
          {showForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Create New Batch</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="herbName">Herb Name</Label>
                      <Input
                        id="herbName"
                        value={formData.herbName}
                        onChange={(e) => setFormData({...formData, herbName: e.target.value})}
                        placeholder="e.g., Ashwagandha, Turmeric"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="farmerName">Farmer Name</Label>
                      <Input
                        id="farmerName"
                        value={formData.farmerName}
                        onChange={(e) => setFormData({...formData, farmerName: e.target.value})}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        placeholder="e.g., Kerala, India"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="harvestDate">Harvest Date</Label>
                      <Input
                        id="harvestDate"
                        type="date"
                        value={formData.harvestDate}
                        onChange={(e) => setFormData({...formData, harvestDate: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="quantity">Quantity (kg)</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                        placeholder="e.g., 50"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="quality">Quality Grade</Label>
                      <Select value={formData.quality} onValueChange={(value) => setFormData({...formData, quality: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Premium">Premium</SelectItem>
                          <SelectItem value="Standard">Standard</SelectItem>
                          <SelectItem value="Organic">Organic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="Additional notes about the batch..."
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                      Create Batch
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Batches List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batches.map((batch) => (
              <Card key={batch.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{batch.herbName}</CardTitle>
                  <p className="text-sm text-gray-600">ID: {batch.id}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p><strong>Farmer:</strong> {batch.farmerName}</p>
                    <p><strong>Location:</strong> {batch.location}</p>
                    <p><strong>Harvest Date:</strong> {new Date(batch.harvestDate).toLocaleDateString()}</p>
                    <p><strong>Quantity:</strong> {batch.quantity} kg</p>
                    <p><strong>Quality:</strong> {batch.quality}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button 
                      size="sm" 
                      onClick={() => generateQRCode(batch)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <QrCode className="w-4 h-4 mr-1" />
                      QR Code
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => deleteBatch(batch.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {batches.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No batches created yet. Create your first batch to get started!</p>
            </div>
          )}

          {/* QR Code Modal */}
          {qrCodeUrl && selectedBatch && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                <h3 className="text-xl font-bold mb-4">QR Code for {selectedBatch.herbName}</h3>
                <div className="text-center">
                  <img src={qrCodeUrl} alt="QR Code" className="mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-4">
                    Batch ID: {selectedBatch.id}
                  </p>
                  <Button 
                    onClick={() => {
                      setQrCodeUrl('');
                      setSelectedBatch(null);
                    }}
                    className="w-full"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerPortal;
