import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Inspection from '../pages/Inspection';
import Events from '../pages/Events';
import AIAnalysis from '../pages/AIAnalysis';
import Cases from '../pages/Cases';
import Reports from '../pages/Reports';
import System from '../pages/System';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/inspection" element={<Inspection />} />
          <Route path="/events" element={<Events />} />
          <Route path="/ai-analysis" element={<AIAnalysis />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/system" element={<System />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;