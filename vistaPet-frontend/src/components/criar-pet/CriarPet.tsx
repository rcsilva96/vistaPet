import React, { useState, useContext } from 'react';
import type { Pet } from '../../services/types';
import { useNavigate, useLocation } from 'react-router-dom';
import { PetContext } from '../../contexts/PetContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CriarPet: React.FC = () => {
  const location = useLocation();
  const petEdit = location.state as Pet | undefined;

  // Estado inicial com garantia de cada campo
  const [pet, setPet] = useState<Pet>({
    id: petEdit?.id,
    nome: petEdit?.nome ?? '',
    especie: petEdit?.especie ?? '',
    peso: petEdit?.peso ?? 0,
    raca: petEdit?.raca ?? '',
    cor: petEdit?.cor ?? '',
    observacao: petEdit?.observacao ?? '',
    status: petEdit?.status ?? 'DESCONHECIDO',
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const context = useContext(PetContext);

  if (!context) throw new Error('PetContext não encontrado');
  const { addPet, updatePet } = context;

  // Atualiza o campo correto sem sobrescrever outros
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setPet(prev => ({
      ...prev,
      [name]: name === 'peso' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pet.nome.trim()) {
      toast.error('Você deve informar o nome do pet', { theme: 'colored' });
      return;
    }

    setIsLoading(true);
    try {
      if (pet.id) {
        await updatePet(pet);
        toast.success(`Pet ${pet.nome} atualizado com sucesso!`, { theme: 'colored' });
      } else {
        await addPet(pet);
        toast.success(`Pet ${pet.nome} criado com sucesso!`, { theme: 'colored' });
      }

      // Resetar apenas campos do formulário, mantendo softdelete
      setPet({ nome: '', especie: '', peso: 0, raca: '', cor: '', observacao: '', status: 'DESCONHECIDO' });

      setTimeout(() => navigate('/listar-pet'), 1000);
    } catch {
      toast.error('Erro ao salvar pet. Tente novamente.', { theme: 'colored' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center p-4">
      <div className="w-100" style={{ maxWidth: '1200px' }}>
        <ToastContainer position="top-right" autoClose={3000} />

        <div className="row">
          {/* Formulário */}
          <div className="col-12 col-lg-8 col-xl-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">{pet.id ? 'Editar Pet' : 'Criar Novo Pet'}</h4>
              </div>

              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="nome" className="form-label fw-semibold">Nome *</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="nome"
                      name="nome"
                      value={pet.nome}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="especie" className="form-label fw-semibold">Especie</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="especie"
                      name="especie"
                      value={pet.especie}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="peso" className="form-label fw-semibold">Peso</label>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      id="peso"
                      name="peso"
                      value={pet.peso}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="raca" className="form-label fw-semibold">Raça:</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="raca"
                      name="raca"
                      value={pet.raca}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="cor" className="form-label fw-semibold">Cor:</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="cor"
                      name="cor"
                      value={pet.cor}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="observacao" className="form-label fw-semibold">Observação:</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="observacao"
                      name="observacao"
                      value={pet.observacao}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="status" className="form-label fw-semibold">Status:</label>
                    <select
                      className="form-control form-control-lg"
                      id="status"
                      name="status"
                      value={pet.status}
                      onChange={handleChange}
                    >
                      <option value="ATIVO">Ativo</option>
                      <option value="INATIVO">Inativo</option>
                      <option value="ADOTADO">Adotado</option>
                      <option value="ARQUIVADO">Arquivado</option>
                      <option value="DESCONHECIDO">Desconhecido</option>
                    </select>
                  </div>

                  <div className="d-flex gap-2 justify-content-end">
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-lg"
                      onClick={() => navigate('/listar-pet')}
                      disabled={isLoading}
                    >
                      Voltar
                    </button>

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Salvando...' : pet.id ? 'Atualizar Pet' : 'Criar Pet'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Barra de dicas */}
          <div className="col-12 col-lg-4 col-xl-6 mb-4">
            <div className="card border-info h-100">
              <div className="card-body">
                <h6 className="card-title text-info">Dicas para cadastro</h6>
                <ul className="card-text mb-0">
                  <li>Os campos <strong>Nome e Peso</strong> são obrigatórios</li>
                  <li>Raça e cor são opcionais, mas recomendados</li>
                  <li>Você pode editar essas informações posteriormente</li>
                  <li>Para fins de registro, é recomendado preencher todas as informações</li>
                </ul>

                <hr />

                <h6 className="text-secondary">Próximos passos</h6>
                <p className="small text-muted">
                  Após registrar o pet, você poderá agendar consultas e outros compromissos relacionados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriarPet;
