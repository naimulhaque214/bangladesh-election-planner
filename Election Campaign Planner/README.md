# Bangladesh Election Campaign Planner

A web application for election campaign and leaflet distribution planning in Bangladesh. This tool helps campaign managers visualize constituencies, plan routes, and optimize campaign resource allocation.

## Features

- **Interactive Map Visualization**: View Bangladesh constituencies with detailed population and density data
- **Area Selection**: Choose multiple constituencies for campaign planning
- **Route Planning**: Optimize routes for efficient campaign coverage
- **Population Analytics**: Access demographic data for strategic planning
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Maps**: Leaflet with OpenStreetMap
- **Charts**: Recharts
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/naimulhaque214/bangladesh-election-planner.git
cd bangladesh-election-planner
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
├── components/          # React components
│   ├── ui/             # Shadcn UI components
│   └── figma/          # Figma-specific components
├── data/               # Static data files
├── styles/             # CSS and styling files
├── utils/              # Utility functions
└── App.tsx             # Main application component
```

## Key Components

- **CampaignPlanner**: Main dashboard component
- **MapView**: Interactive map with constituency visualization
- **AreaSelector**: Multi-select interface for constituencies
- **RouteOptimizer**: Route planning and optimization
- **PopulationStats**: Demographic data visualization

## Data Sources

- Bangladesh constituency boundaries and demographic data
- Population density information
- Geographic coordinates for mapping

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Bangladesh Election Commission for constituency data
- OpenStreetMap contributors for map data
- Shadcn for the excellent UI component library

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.