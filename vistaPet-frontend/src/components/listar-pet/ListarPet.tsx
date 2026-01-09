import React, { useContext, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PetContext } from '../../contexts/PetContext';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import type { Pet } from '../../services/types';

/* =======================
   Tipos auxiliares
======================= */
type StatusPet = Pet['status'];
type FiltroStatus = 'TODOS' | StatusPet;

/* =======================
   Componente
======================= */
const ListarPet: React.FC = () => {
  const context = useContext(PetContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error('PetContext não encontrado');
  }

  const { pets, disablePet } = context;

  /* =======================
     Estados
  ======================= */
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>('TODOS');
  const [busca, setBusca] = useState('');

  /* =======================
     Ações
  ======================= */
  const handleDisable = (id: number) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'O pet será desativado. Essa ação pode ser revertida depois.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Desativar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        disablePet(id);
        toast.success('Pet desativado com sucesso!', { theme: 'colored' });
      }
    });
  };

  /* =======================
     Filtro (memoizado)
  ======================= */
  const petsFiltrados = useMemo(() => {
    return pets.filter((pet) => {
      const passaStatus =
        filtroStatus === 'TODOS' || pet.status === filtroStatus;

      const termoBusca = busca.toLowerCase();

      const passaBusca =
        pet.nome.toLowerCase().includes(termoBusca) ||
        pet.especie.toLowerCase().includes(termoBusca) ||
        pet.raca.toLowerCase().includes(termoBusca) ||
        pet.cor.toLowerCase().includes(termoBusca);

      return passaStatus && passaBusca;
    });
  }, [pets, filtroStatus, busca]);

  /* =======================
     Render
  ======================= */
  return (
    <div className="d-flex justify-content-center p-4">
      <div className="w-100" style={{ maxWidth: '1200px' }}>
        <ToastContainer position="top-right" autoClose={3000} />

        <div className="card shadow-sm">
          {/* Header */}
          <div className="card-header bg-primary text-white d-flex flex-column flex-md-row justify-content-between gap-2">
            <h4 className="mb-0">Lista de Pets</h4>

            <div className="d-flex gap-2 flex-wrap">
              <input
                type="text"
                placeholder="Buscar por nome, espécie, raça ou cor..."
                className="form-control"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />

              <select
                className="form-select"
                value={filtroStatus}
                onChange={(e) =>
                  setFiltroStatus(e.target.value as FiltroStatus)
                }
              >
                <option value="TODOS">Todos</option>
                <option value="ATIVO">Ativos</option>
                <option value="INATIVO">Inativos</option>
                <option value="ADOTADO">Adotados</option>
                <option value="ARQUIVADO">Arquivados</option>
                <option value="DESCONHECIDO">Desconhecido</option>
              </select>

              <button
                className="btn btn-success"
                onClick={() => navigate('/criar-pet')}
              >
                Novo Pet
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="card-body">
            {petsFiltrados.length > 0 ? (
              <table className="table table-striped align-middle">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Espécie</th>
                    <th>Raça</th>
                    <th>Cor</th>
                    <th>Status</th>
                    <th className="text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {petsFiltrados.map((pet) => (
                    <tr key={pet.id}>
                      <td>{pet.nome}</td>
                      <td>{pet.especie}</td>
                      <td>{pet.raca}</td>
                      <td>{pet.cor}</td>
                      <td>
                        <span
                          className={`badge ${
                            pet.status === 'ATIVO'
                              ? 'bg-success'
                              : pet.status === 'INATIVO'
                              ? 'bg-secondary'
                              : pet.status === 'ADOTADO'
                              ? 'bg-info'
                              : pet.status === 'ARQUIVADO'
                              ? 'bg-dark'
                              : 'bg-warning'
                          }`}
                        >
                          {pet.status}
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-outline-primary btn-sm me-1"
                          onClick={() =>
                            navigate('/criar-pet', { state: pet })
                          }
                          title="Editar pet"
                        >
                          <i className="fas fa-edit"></i>
                        </button>

                        <button
                          className="btn btn-outline-info btn-sm me-1"
                          onClick={() =>
                            Swal.fire({
                              title: 'Detalhes do Pet',
                              html: `
                                <p><b>Nome:</b> ${pet.nome}</p>
                                <p><b>Espécie:</b> ${pet.especie}</p>
                                <p><b>Raça:</b> ${pet.raca}</p>
                                <p><b>Cor:</b> ${pet.cor}</p>
                                <p><b>Status:</b> ${pet.status}</p>
                                ${
                                  pet.observacao
                                    ? `<p><b>Observação:</b> ${pet.observacao}</p>`
                                    : ''
                                }
                              `,
                              confirmButtonText: 'OK',
                            })
                          }
                          title="Visualizar pet"
                        >
                          <i className="fas fa-eye"></i>
                        </button>

                        {pet.status === 'ATIVO' && (
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDisable(pet.id!)}
                            title="Desativar pet"
                          >
                            <i className="fas fa-power-off"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h5 className="text-center mt-3">
                Nenhum pet encontrado 😿
              </h5>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListarPet;
