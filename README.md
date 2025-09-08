# S-Game

S-Game is a full-stack web application for decentralized betting and gaming, built with Next.js, TypeScript, Drizzle ORM, and Tailwind CSS. It features user authentication, betting modes, play modes, profile management, and blockchain integration.

## Features
- **Decentralized Betting:** Place bets on matches and games with blockchain-backed security.
- **Play Mode:** Enjoy various games and track your play history.
- **Profile Management:** Manage your user profile and view rewards.
- **Crypto Integration:** Interact with smart contracts and NFTs using provided ABIs.
- **Modern UI:** Responsive design using Tailwind CSS and Radix UI components.
- **Authentication:** Secure login system with NextAuth.
- **Database:** PostgreSQL with Drizzle ORM for migrations and queries.

## Tech Stack
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, Radix UI
- **Backend:** Next.js API routes, Drizzle ORM, PostgreSQL
- **Blockchain:** Smart contract ABIs for Bet and NFT interactions
- **Authentication:** NextAuth
- **Linting/Formatting:** ESLint, Biome

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL database

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/S-game.git
   cd S-game
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```
3. Copy `.env.example` to `.env` and fill in your environment variables (especially `POSTGRES_URL`).

### Database Setup
- Generate and run migrations:
  ```bash
  npm run db:generate
  npm run db:migrate
  ```
- Open Drizzle Studio for DB management:
  ```bash
  npm run db:studio
  ```

### Development
- Start the development server:
  ```bash
  npm run dev
  ```
- The app will be available at `http://localhost:3000`.

### Build & Production
- Build the app:
  ```bash
  npm run build
  ```
- Start the production server:
  ```bash
  npm start
  ```

### Linting & Formatting
- Lint the code:
  ```bash
  npm run lint
  ```
- Fix lint issues:
  ```bash
  npm run lint:fix
  ```
- Format code:
  ```bash
  npm run format
  ```

## Project Structure
- `app/` - Next.js app directory (routes, pages, API)
- `components/` - Reusable UI and modal components
- `contracts_abi/` - Smart contract ABIs for blockchain integration
- `lib/db/` - Database schema, migrations, and queries
- `public/` - Static assets (images, fonts)
- `hooks/` - Custom React hooks
- `interfaces/` - TypeScript interfaces

## Scripts
- `dev` - Start development server
- `build` - Run DB migrations and build app
- `start` - Start production server
- `lint`, `lint:fix`, `format` - Code quality tools
- `db:generate`, `db:migrate`, `db:studio`, `db:push`, `db:pull`, `db:check`, `db:up` - Database management

## License
MIT

---

For more details, see the source code and comments in each directory.