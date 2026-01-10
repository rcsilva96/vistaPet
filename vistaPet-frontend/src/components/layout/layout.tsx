import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: 'bi-house-door-fill', label: 'Home' },
    { path: '/listar-pet', icon: 'bi-people-fill', label: 'Pets' },
    { path: '/listar-tutor', icon: 'bi-person-fill', label: 'Tutores' }
  ];

  const getPageTitle = () => {
    switch(location.pathname) {
      case '/': return 'Dashboard';
      case '/listar-pet': return 'Pets';
      default: return 'VistaPet';
    }
  };

  return (
    <>
      {/* Navbar Superior FIXA */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm border-bottom fixed-top">
        <div className="container-fluid px-3">
          <div className="d-flex align-items-center">
            {/* Botão Hambúrguer */}
            <button 
              className="btn btn-outline-primary me-3 border-0"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ fontSize: '1.2rem' }}
            >
              <i className="bi bi-list"></i>
            </button>
            
            {/* Logo e Título */}
            <div className="d-flex align-items-center">
              <i className="bi bi-briefcase-fill text-primary me-2" style={{ fontSize: '1.5rem' }}></i>
              <span className="navbar-brand mb-0 fw-bold text-primary">VistaPet</span>
              <span className="text-muted mx-2 d-none d-md-inline">|</span>
              <span className="fw-semibold text-dark d-none d-md-inline">{getPageTitle()}</span>
            </div>
          </div>

          {/* Ações da Navbar */}
          <div className="d-flex align-items-center">
            <button className="btn btn-outline-secondary me-2 border-0">
              <i className="bi bi-bell"></i>
            </button>
            
            <div className="dropdown">
              <button 
                className="btn btn-outline-secondary dropdown-toggle border-0" 
                type="button" 
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-person-circle me-1"></i>
                <span className="d-none d-md-inline">Amante de Pets</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#"><i className="bi bi-gear me-2"></i>Configurações</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item text-danger" href="#"><i className="bi bi-box-arrow-right me-2"></i>Sair</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay para Sidebar */}
      {sidebarOpen && (
        <div 
          className="position-fixed w-100 h-100 bg-dark bg-opacity-50"
          style={{ top: 0, left: 0, zIndex: 1040 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Lateral */}
      <div 
        className={`offcanvas offcanvas-start ${sidebarOpen ? 'show' : ''}`}
        style={{ 
          width: '280px',
          visibility: sidebarOpen ? 'visible' : 'hidden',
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        <div className="offcanvas-header bg-dark text-white">
          <h5 className="offcanvas-title">
            <i className="bi bi-briefcase-fill me-2"></i>
            Menu
          </h5>
          <button 
            type="button" 
            className="btn-close btn-close-white"
            onClick={() => setSidebarOpen(false)}
          ></button>
        </div>
        
        <div className="offcanvas-body p-0 bg-dark">
          <div className="list-group list-group-flush">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`list-group-item list-group-item-action bg-dark text-white border-0 py-3 ${
                  location.pathname === item.path ? 'bg-primary' : ''
                }`}
                onClick={() => setSidebarOpen(false)}
                style={{
                  borderLeft: location.pathname === item.path ? '4px solid #0d6efd' : '4px solid transparent'
                }}
              >
                <i className={`${item.icon} me-3`}></i>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Conteúdo Principal - LARGURA TOTAL GARANTIDA */}
      <main 
        style={{ 
          marginTop: '76px', // Altura da navbar fixa
          minHeight: 'calc(100vh - 76px)',
          width: '100%',
          maxWidth: 'none' // REMOVE qualquer limitação de largura
        }}
      >
        {children}
      </main>
    </>
  );
};

export default Layout;