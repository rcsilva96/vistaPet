import React from 'react';
import './NotFound.css';
//import NotFoundImage from './notfound.png'; // Ajuste o caminho da sua imagem

const NotFound: React.FC = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">Página ou recurso não encontrado</h1>
      {/* <img src={NotFoundImage} alt="Página não encontrada" className="notfound-image" /> */}
      <p className="notfound-text">
        Não conseguimos encontrar o recurso que você procurava. <a href="/">Clique aqui para voltar à página inicial</a>.
      </p>
    </div>
  );
};

export default NotFound;
