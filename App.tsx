import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import KnowledgeBase from './components/KnowledgeBase';
import AIAssistant from './components/AIAssistant';
import WeatherSection from './components/WeatherSection';
import PestPredictor from './components/PestPredictor';
import LoginPage from './components/auth/LoginPage';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <div 
      className="min-h-screen bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80")',
      }}
    >
      <Navbar />
      <Hero />
      <Features />
      <KnowledgeBase />
      <AIAssistant />
      <PestPredictor />
      <WeatherSection />
    </div>
  );
}

export default App;