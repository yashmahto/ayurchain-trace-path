import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, Target, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-emerald-800 mb-4">About AyurChain</h1>
            <p className="text-lg text-emerald-600">Revolutionizing Ayurvedic Supply Chain Transparency</p>
          </div>

          {/* Mission Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-6 h-6 mr-2 text-emerald-600" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                AyurChain is dedicated to bringing complete transparency and traceability to the Ayurvedic supply chain. 
                We believe that consumers have the right to know exactly where their herbs come from, how they were grown, 
                and the journey they took from farm to pharmacy. By leveraging blockchain technology, we ensure that 
                every step of the supply chain is recorded immutably, creating trust and confidence in Ayurvedic products.
              </p>
            </CardContent>
          </Card>

          {/* Problem Statement */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-6 h-6 mr-2 text-emerald-600" />
                The Problem We Solve
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  The Ayurvedic industry faces significant challenges in supply chain transparency:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Lack of Traceability:</strong> Consumers cannot verify the origin and authenticity of herbs</li>
                  <li><strong>Quality Concerns:</strong> No standardized quality control across the supply chain</li>
                  <li><strong>Counterfeit Products:</strong> Fake or adulterated herbs in the market</li>
                  <li><strong>Farmer Exploitation:</strong> Limited visibility into fair trade practices</li>
                  <li><strong>Regulatory Compliance:</strong> Difficulty in meeting regulatory requirements</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Solution */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-6 h-6 mr-2 text-emerald-600" />
                Our Solution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  AyurChain provides a comprehensive blockchain-based solution:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-50 rounded-lg">
                      <h4 className="font-semibold text-emerald-800">Blockchain Technology</h4>
                      <p className="text-sm text-gray-600">Immutable record of every transaction and movement</p>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg">
                      <h4 className="font-semibold text-emerald-800">QR Code Integration</h4>
                      <p className="text-sm text-gray-600">Easy access to batch information for consumers</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-50 rounded-lg">
                      <h4 className="font-semibold text-emerald-800">Real-time Tracking</h4>
                      <p className="text-sm text-gray-600">Complete visibility from farm to pharmacy</p>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg">
                      <h4 className="font-semibold text-emerald-800">Quality Assurance</h4>
                      <p className="text-sm text-gray-600">Standardized quality control and testing</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-6 h-6 mr-2 text-emerald-600" />
                Our Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                AyurChain is developed by a passionate team of blockchain developers, Ayurvedic experts, 
                and supply chain professionals. We are committed to revolutionizing the Ayurvedic industry 
                through technology and ensuring that traditional knowledge meets modern transparency standards.
              </p>
            </CardContent>
          </Card>

          {/* Impact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-6 h-6 mr-2 text-emerald-600" />
                Our Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">99.9%</div>
                  <div className="text-sm text-gray-600">Traceability Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">100%</div>
                  <div className="text-sm text-gray-600">Blockchain Security</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">24/7</div>
                  <div className="text-sm text-gray-600">Real-time Monitoring</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
