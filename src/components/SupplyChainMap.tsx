import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Example supply chain journey coordinates (latitude, longitude)
const journey = [
  { name: 'Farm', position: [28.7041, 77.1025] }, // Delhi
  { name: 'Processor', position: [26.9124, 75.7873] }, // Jaipur
  { name: 'Warehouse', position: [25.3176, 82.9739] }, // Varanasi
  { name: 'Retailer', position: [19.0760, 72.8777] }, // Mumbai
];

const positions = journey.map(j => j.position);

export default function SupplyChainMap() {
  // Calculate bounds to fit all journey points
  const lats = journey.map(j => j.position[0]);
  const lngs = journey.map(j => j.position[1]);
  const southWest = [Math.min(...lats) - 1, Math.min(...lngs) - 1];
  const northEast = [Math.max(...lats) + 1, Math.max(...lngs) + 1];
  const bounds = [southWest, northEast];

  return (
    <MapContainer
      center={[23.2599, 77.4126]}
      zoom={5}
      minZoom={5}
      maxZoom={10}
      bounds={bounds}
      boundsOptions={{ maxBoundsViscosity: 1.0 }}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {journey.map((loc, idx) => (
        <Marker key={idx} position={loc.position}>
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
      <Polyline pathOptions={{ color: 'blue' }} positions={positions} />
    </MapContainer>
  );
}
