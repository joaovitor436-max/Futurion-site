import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import FuturionSeeds from './pages/FuturionSeeds';
import FuturionStock from './pages/FuturionStock';
import Partners from './pages/Partners';
import Contact from './pages/Contact';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solucoes" element={<Solutions />} />
          <Route path="/produtos/futurion-seeds" element={<FuturionSeeds />} />
          <Route path="/produtos/futurion-stock" element={<FuturionStock />} />
          <Route path="/parceiros" element={<Partners />} />
          <Route path="/contato" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout />
    </Router>
  );
}

export default App;
