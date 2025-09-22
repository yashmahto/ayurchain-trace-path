import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      inquiryType: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-emerald-800 mb-4">Contact Us</h1>
            <p className="text-lg text-emerald-600">Get in touch with the AyurChain team</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="w-6 h-6 mr-2 text-emerald-600" />
                    Get in Touch
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-6">
                    Have questions about AyurChain? We'd love to hear from you. 
                    Send us a message and we'll respond as soon as possible.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-3 text-emerald-600" />
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-gray-600">contact@ayurchain.com</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-3 text-emerald-600" />
                      <div>
                        <div className="font-medium">Phone</div>
                        <div className="text-gray-600">+91 98765 43210</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-3 text-emerald-600" />
                      <div>
                        <div className="font-medium">Address</div>
                        <div className="text-gray-600">
                          Tech Park, Bangalore<br />
                          Karnataka, India - 560001
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="inquiryType">Inquiry Type</Label>
                    <Select 
                      value={formData.inquiryType} 
                      onValueChange={(value) => setFormData({...formData, inquiryType: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="media">Media Inquiry</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="Brief subject of your message"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h4 className="font-semibold text-emerald-800 mb-2">How does AyurChain ensure data security?</h4>
                  <p className="text-gray-600">
                    AyurChain uses blockchain technology to create an immutable record of all transactions. 
                    Data is encrypted and distributed across multiple nodes, making it virtually impossible to tamper with.
                  </p>
                </div>
                
                <div className="border-b pb-4">
                  <h4 className="font-semibold text-emerald-800 mb-2">Can I track any herb batch?</h4>
                  <p className="text-gray-600">
                    You can track any batch that has been registered on the AyurChain platform. 
                    Simply enter the batch ID or scan the QR code to view the complete journey.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-emerald-800 mb-2">How can farmers join the platform?</h4>
                  <p className="text-gray-600">
                    Farmers can register through our Farmer Portal. We provide training and support 
                    to help them get started with blockchain-based batch tracking.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
