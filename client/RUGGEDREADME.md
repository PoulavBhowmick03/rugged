# Rugged Game

A high-risk trading simulator game built with React.

## Setup Instructions

1. Install dependencies:
\`\`\`
npm install
\`\`\`

2. Start the development server:
\`\`\`
npm start
\`\`\`

The app will run on [http://localhost:3000](http://localhost:3000)

## Project Structure

- `/src` - Source code
- `/public` - Static assets including:
  - `/videos` - MP4 files (bg.mp4, win.mp4, lose.mp4)
  - `/images` - PNG files (play.png, playhover.png, screen.png)
  - `/paths` - SVG files for button containers

## Key Features

- Interactive button with hover states
- Video background with audio
- Win/loss outcome videos
- Score tracking system
- Scrolling stats display
- Responsive design

## Starknet Integration Notes

The game is ready for Starknet wallet integration:
- Popup modal for wallet connection
- Stats tracking system in place
- Button container prepared for transaction triggers

## Dependencies

- React
- React DOM
- Web Fonts (Press Start 2P, VT323)

## Development Notes

- Background video audio starts after initial popup closes
- Win probability set to 30%
- All elements maintain 16:9 aspect ratio
- SVG paths used for precise button mapping
"@