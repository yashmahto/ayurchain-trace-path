import React, { useState } from 'react';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Calendar } from 'lucide-react';

const History = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex flex-col">
      <div className="max-w-7xl mx-auto px-6 py-12 flex-1">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Herbs History</h1>
          <p className="text-xl text-muted-foreground">
            Complete traceability records of all Ayurvedic herbs in the supply chain
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by batch ID, herb type, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Date Range</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>Historical Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No Records Found</h3>
                <p>No herb batches have been recorded in the system yet.</p>
                <p className="mt-2">Once stakeholders start using AyurChain, their complete herb journey will be displayed here.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default History;