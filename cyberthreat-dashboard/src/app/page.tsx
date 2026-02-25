'use client';

import { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import { Shield, Zap, Mail, AlertTriangle } from 'lucide-react';

interface Threat {
  id: number;
  name: string;
  description: string;
  country: string;
  lat: number;
  lng: number;
  type: string;
  severity: 'low' | 'medium' | 'high';
}

const DEMO_THREATS: Threat[] = [
  { id: 1, name: 'NYC Banking DDoS', description: 'Massive DDoS attack targeting Wall Street banks', country: 'USA', lat: 40.71, lng: -74.00, type: 'DDoS', severity: 'high' },
  { id: 2, name: 'London Botnet', description: 'Active botnet C2 server network', country: 'UK', lat: 51.51, lng: -0.13, type: 'Botnet', severity: 'high' },
  { id: 3, name: 'Tokyo Phishing', description: 'Phishing campaign targeting crypto exchanges', country: 'Japan', lat: 35.68, lng: 139.77, type: 'Phishing', severity: 'medium' },
  { id: 4, name: 'Moscow Ransomware', description: 'New ransomware variant spreading', country: 'Russia', lat: 55.76, lng: 37.62, type: 'Ransomware', severity: 'high' },
  { id: 5, name: 'Paris Data Leak', description: 'Corporate data breach exposed', country: 'France', lat: 48.86, lng: 2.35, type: 'Breach', severity: 'medium' },
  { id: 6, name: 'Sydney Scam', description: 'Tech support scam campaign', country: 'Australia', lat: -33.87, lng: 151.21, type: 'Scam', severity: 'low' },
  { id: 7, name: 'Berlin Exploit', description: 'Zero-day vulnerability in the wild', country: 'Germany', lat: 52.52, lng: 13.40, type: 'Exploit', severity: 'high' },
  { id: 8, name: 'Mumbai Malware', description: 'Banking trojan targeting Indian users', country: 'India', lat: 19.08, lng: 72.88, type: 'Malware', severity: 'medium' },
  { id: 9, name: 'Sao Paulo Attack', description: 'DDoS against government infrastructure', country: 'Brazil', lat: -23.55, lng: -46.63, type: 'DDoS', severity: 'medium' },
  { id: 10, name: 'Cape Town Threat', description: 'Phishing emails targeting businesses', country: 'South Africa', lat: -33.92, lng: 18.42, type: 'Phishing', severity: 'low' },
];

export default function Home() {
  const [threats, setThreats] = useState<Threat[]>(DEMO_THREATS);
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [scanQuery, setScanQuery] = useState('');
  const [scanResult, setScanResult] = useState<{domain: string; risk: string; score: number} | null>(null);
  const globeEl = useRef();

  const arcsData = threats.map(threat => ({
    startLat: 40,
    startLng: -100,
    endLat: threat.lat,
    endLng: threat.lng,
    color: threat.severity === 'high' ? ['rgba(255,0,0,1)', 'rgba(255,0,0,0.1)'] : 
           threat.severity === 'medium' ? ['rgba(255,165,0,1)', 'rgba(255,165,0,0.1)'] : 
           ['rgba(255,255,0,1)', 'rgba(255,255,0,0.1)'],
  }));

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanQuery.trim()) return;
    setScanResult({
      domain: scanQuery,
      risk: 'Medium',
      score: Math.floor(Math.random() * 100),
    });
  };

  return (
    <main className="w-full h-screen bg-black overflow-hidden">
      {/* Globe */}
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundColor="#000000"
        arcsData={arcsData}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        pointsData={threats}
        pointLat="lat"
        pointLng="lng"
        pointColor={() => 'red'}
        pointAltitude={0.02}
        pointRadius={0.5}
        pointLabel={(d: any) => `
          <div class="bg-black/90 p-3 rounded-lg border border-red-500 text-white">
            <strong class="text-red-400">${d.name}</strong><br/>
            <span class="text-sm text-gray-300">${d.type}</span>
          </div>
        `}
        onPointClick={(point) => setSelectedThreat(point as Threat)}
        width={window.innerWidth}
        height={window.innerHeight}
      />

      {/* Header Overlay */}
      <div className="absolute top-0 left-0 w-full p-8 bg-gradient-to-b from-black/80 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-red-500/30">
                <Shield className="w-10 h-10 text-black" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white">
                CyberThreat<span className="text-orange-500">Command</span>
              </h1>
            </div>
            <div className="flex gap-4">
              <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full font-bold flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Pro
              </button>
            </div>
          </div>
          
          <p className="text-gray-400 text-lg mb-6">Live global cyber threat intelligence • {threats.length} active threats</p>

          <form onSubmit={handleScan} className="flex gap-2 max-w-2xl">
            <input
              type="text"
              value={scanQuery}
              onChange={(e) => setScanQuery(e.target.value)}
              placeholder="Scan domain or email (e.g. leapjuice.com)"
              className="flex-1 bg-gray-900/80 border border-gray-700 rounded-full px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
            <button type="submit" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-8 py-4 rounded-full font-bold flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Scan
            </button>
          </form>
        </div>
      </div>

      {/* Threat Counter */}
      <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur-sm border border-gray-800 rounded-xl p-4">
        <div className="text-sm text-gray-400">Active Threats</div>
        <div className="text-3xl font-black text-red-500">{threats.length}</div>
      </div>

      {/* Selected Threat Modal */}
      {selectedThreat && (
        <div 
          className="absolute inset-0 bg-black/70 flex items-center justify-center z-50 p-8"
          onClick={() => setSelectedThreat(null)}
        >
          <div 
            className="bg-gray-900 border-2 border-red-500 rounded-2xl p-8 max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-3xl font-black text-white mb-2">{selectedThreat.name}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  selectedThreat.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                  selectedThreat.severity === 'medium' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {selectedThreat.severity.toUpperCase()}
                </span>
              </div>
              <button onClick={() => setSelectedThreat(null)} className="text-gray-400 hover:text-white text-2xl">&times;</button>
            </div>
            <p className="text-gray-300 text-lg mb-6">{selectedThreat.description}</p>
            <div className="flex gap-4">
              <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full font-bold flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                AI Analysis
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-full font-bold flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Get Alerts
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scan Result Modal */}
      {scanResult && (
        <div 
          className="absolute inset-0 bg-black/70 flex items-center justify-center z-50 p-8"
          onClick={() => setScanResult(null)}
        >
          <div 
            className="bg-gray-900 border-2 border-orange-500 rounded-2xl p-8 max-w-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <AlertTriangle className="w-20 h-20 text-orange-500 mx-auto mb-4" />
            <h2 className="text-3xl font-black text-white mb-2">{scanResult.domain}</h2>
            <p className="text-5xl font-black text-orange-500 mb-4">{scanResult.risk}</p>
            <p className="text-gray-400 text-lg mb-6">Risk Score: {scanResult.score}/100</p>
            <div className="flex gap-4 justify-center">
              <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full font-bold">
                Deep Analysis (Pro)
              </button>
              <button onClick={() => setScanResult(null)} className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-full font-bold">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
