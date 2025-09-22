import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Package, Users, AlertTriangle, CheckCircle } from 'lucide-react';

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

const RegulatorDashboard = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [stats, setStats] = useState({
    totalBatches: 0,
    totalFarmers: 0,
    complianceRate: 0,
    qualityIssues: 0
  });

  // Load batches from localStorage and add dummy data
  useEffect(() => {
    const savedBatches = localStorage.getItem('ayurchain-batches');
    let allBatches: Batch[] = [];
    
    if (savedBatches) {
      allBatches = JSON.parse(savedBatches);
    }
    
    // Add dummy data if no batches exist
    if (allBatches.length === 0) {
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
      allBatches = dummyBatches;
      localStorage.setItem('ayurchain-batches', JSON.stringify(dummyBatches));
    }
    
    setBatches(allBatches);
    
    // Calculate stats
    const uniqueFarmers = new Set(allBatches.map((b: Batch) => b.farmerName));
    const qualityIssues = allBatches.filter((b: Batch) => b.quality === 'Standard').length;
    
    setStats({
      totalBatches: allBatches.length,
      totalFarmers: uniqueFarmers.size,
      complianceRate: Math.round((allBatches.length - qualityIssues) / allBatches.length * 100) || 100,
      qualityIssues: qualityIssues
    });
  }, []);

  // Dummy data for charts
  const herbsByType = [
    { name: 'Ashwagandha', value: 35, color: '#10B981' },
    { name: 'Turmeric', value: 28, color: '#F59E0B' },
    { name: 'Tulsi', value: 20, color: '#3B82F6' },
    { name: 'Brahmi', value: 12, color: '#8B5CF6' },
    { name: 'Neem', value: 5, color: '#EF4444' }
  ];

  const supplyChainFlow = [
    { month: 'Jan', batches: 45, compliance: 98 },
    { month: 'Feb', batches: 52, compliance: 96 },
    { month: 'Mar', batches: 48, compliance: 99 },
    { month: 'Apr', batches: 61, compliance: 97 },
    { month: 'May', batches: 55, compliance: 98 },
    { month: 'Jun', batches: 67, compliance: 99 }
  ];

  const complianceData = [
    { category: 'Quality Standards', value: 98 },
    { category: 'Documentation', value: 95 },
    { category: 'Traceability', value: 100 },
    { category: 'Safety Protocols', value: 97 }
  ];

  // Get recent batches for the table
  const recentBatches = batches.slice(-4).map(batch => ({
    ...batch,
    status: batch.quality === 'Premium' ? 'Compliant' : 'Under Review'
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">📊 Regulator Dashboard</h1>
            <p className="text-lg text-slate-600">AyurChain Supply Chain Monitoring & Compliance</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100">Total Batches</p>
                    <p className="text-3xl font-bold">{stats.totalBatches}</p>
                  </div>
                  <Package className="w-8 h-8 text-emerald-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Registered Farmers</p>
                    <p className="text-3xl font-bold">{stats.totalFarmers}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Compliance Rate</p>
                    <p className="text-3xl font-bold">{stats.complianceRate}%</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100">Quality Issues</p>
                    <p className="text-3xl font-bold">{stats.qualityIssues}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Herbs by Type Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Herbs by Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={herbsByType}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {herbsByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Supply Chain Flow Line Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Supply Chain Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={supplyChainFlow}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="batches" stroke="#10B981" strokeWidth={2} name="Batches Processed" />
                    <Line type="monotone" dataKey="compliance" stroke="#3B82F6" strokeWidth={2} name="Compliance %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Compliance and Recent Batches Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Compliance Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={complianceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Batches Table */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Batch Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBatches.length > 0 ? (
                    recentBatches.map((batch) => (
                      <div key={batch.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{batch.herbName}</p>
                          <p className="text-sm text-gray-600">ID: {batch.id}</p>
                          <p className="text-sm text-gray-600">Farmer: {batch.farmerName}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            batch.status === 'Compliant' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {batch.status}
                          </span>
                          <p className="text-sm text-gray-600 mt-1">
                            {new Date(batch.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No batches found. Create some batches in the Farmer Portal to see data here.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-semibold text-lg">Supply Chain Efficiency</h3>
                <p className="text-2xl font-bold text-green-600">94.2%</p>
                <p className="text-sm text-gray-600">Average processing time</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-semibold text-lg">Quality Assurance</h3>
                <p className="text-2xl font-bold text-blue-600">98.7%</p>
                <p className="text-sm text-gray-600">Pass rate for quality tests</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <h3 className="font-semibold text-lg">Stakeholder Satisfaction</h3>
                <p className="text-2xl font-bold text-purple-600">96.4%</p>
                <p className="text-sm text-gray-600">Platform adoption rate</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegulatorDashboard;
