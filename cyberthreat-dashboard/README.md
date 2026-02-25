# CyberThreat Command Center

A real-time interactive 3D globe dashboard showing live global cyber threats. Built with Next.js, react-globe.gl, and real threat intelligence APIs.

## Features

- **Interactive 3D Globe**: Rotating wireframe Earth with threat visualization
- **Live Threat Data**: Demonstrates threat intelligence from OTX and other sources
- **Scan Tool**: Domain/email risk scanning
- **AI Integration Ready**: Premium AI analysis features
- **Responsive Design**: Works on desktop and mobile

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **3D Globe**: react-globe.gl, Three.js
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: REST/OTX

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Leapjuice/cyberthreat-dashboard.git
cd cyberthreat-dashboard

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Deployment

### Production Build
```bash
npm run build
npm start
```

### Vercel (Recommended)
```bash
vercel --prod
```

### Docker
```bash
docker build -t cyberthreat .
docker run -p 3000:3000 cyberthreat
```

## Environment Variables

Create `.env.local`:
```env
OTX_API_KEY=your_alienvault_key
```

## License

MIT
