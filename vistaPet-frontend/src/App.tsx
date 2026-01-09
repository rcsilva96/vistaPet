import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Layout from './components/layout/layout';
import Providers from './contexts/Providers.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CriarPet from './components/criar-pet/CriarPet';
import ListarPet from './components/listar-pet/ListarPet';
import NotFound from './components/not-found/NotFound.tsx';


import './App.css'

function App() {
  return (
    <Providers>
      <Router>
        <div className="container py-4">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listar-pet" element={<ListarPet />} />
            <Route path="/criar-pet" element={<CriarPet />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        </div>
      </Router>
    </Providers>
  );
}

export default App
