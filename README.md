# Galleria - AI Art Platform

Galleria is a decentralized AI art platform that empowers creators to generate, showcase, and share unique AI-generated artwork. Built on Solana for high performance and low transaction costs.

![Galleria Logo](public/Galleria.png)

## Features

- **AI Art Generation**: Create unique artwork using state-of-the-art AI models through simple text prompts
- **Personal Galleries**: Each creator gets a personalized gallery linked to their wallet address
- **Social Integration**: Connect and share creations across Twitter, Instagram, and pump.fun
- **Blockchain Integration**: Secure ownership and attribution through Solana blockchain
- **Responsive Design**: Clean, modern interface with consistent styling

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Solana Web3.js
- React Hot Toast
- Next.js Image Optimization

## Getting Started

1. Clone the repository:

bash

git clone https://github.com/Galleria-Art/galleria.git

2. Install dependencies:

bash

cd galleria

npm install

3. Create a `.env` file in the root directory and add your environment variables:

env

NEXT_PUBLIC_RPC_URL=your_solana_rpc_url

4. Run the development server:

bash

npm run dev

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

galleria/
├── public/ # Static assets
├── src/
│ ├── app/ # Next.js app router pages
│ ├── components/ # React components
│ └── utils/ # Utility functions
├── .env # Environment variables
└── tailwind.config.ts # Tailwind configuration


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.