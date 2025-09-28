import type { NextApiRequest, NextApiResponse } from 'next';

// Dummy batch data
const dummyBatches = [
  {
    id: 'AYUR-ASH-082024-KER',
    herbName: 'Ashwagandha',
    location: 'Kerala, India',
    harvestDate: '2024-08-15',
    farmerName: 'Rajesh Kumar',
    quantity: '50',
    quality: 'Premium',
    notes: 'Organic cultivation, no pesticides used',
    createdAt: '2024-08-15T10:30:00Z',
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
    createdAt: '2024-08-20T14:15:00Z',
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
    createdAt: '2024-08-25T09:45:00Z',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'GET') {
    const batch = dummyBatches.find((b) => b.id === id);
    if (batch) {
      res.status(200).json(batch);
    } else {
      res.status(404).json({ error: 'Batch not found' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
