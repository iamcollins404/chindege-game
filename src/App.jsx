import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GamePage } from './pages/GamePage';
import { WalletPage } from './pages/WalletPage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="container mx-auto max-w-4xl">
            <Routes>
              <Route path="/" element={<Navigate to="/game" replace />} />
              <Route path="/game" element={<GamePage />} />
              <Route path="/game/wallet" element={<WalletPage />} />
              <Route path="/game/history" element={<HistoryPage />} />
              <Route path="/game/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;