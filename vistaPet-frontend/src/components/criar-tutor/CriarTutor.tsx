import React, { useState, useContext } from 'react';
import type { Tutor } from '../../services/types';
import { useNavigate, useLocation } from 'react-router-dom';
import { TutorContext } from '../../contexts/TutorContext';
import { toast, ToastContainer } from 'react-toastify';
import TutorFormTips from '../criar-tutor/TutorTips';
import 'react-toastify/dist/ReactToastify.css';

const CriarTutor: React.FC = () => {
    const location = useLocation();
    const tutorEdit = location.state as Tutor | undefined;

    const [tutor, setTutor] = useState<Tutor>({
        id: tutorEdit?.id,
        nome: tutorEdit?.nome ?? '',
        cpf: tutorEdit?.cpf ?? '',
        telefone: tutorEdit?.telefone ?? '',
        email: tutorEdit?.email ?? '',
        observacoes: tutorEdit?.observacoes ?? '',
        status: tutorEdit?.status ?? 'ATIVO',
        endereco: tutorEdit?.endereco ?? {
            cep: '',
            rua: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: '',
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    const [cepLoading, setCepLoading] = useState(false);

    const navigate = useNavigate();
    const context = useContext(TutorContext);

    if (!context) throw new Error('TutorContext não encontrado');
    const { addTutor, updateTutor } = context;

    /* ======================
       Handlers
    ====================== */
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setTutor(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEnderecoChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        if (name === 'cep') {
            const cepFormatado = value
                .replace(/\D/g, '')
                .replace(/^(\d{5})(\d)/, '$1-$2')
                .slice(0, 9);

            setTutor(prev => ({
                ...prev,
                endereco: {
                    ...prev.endereco,
                    cep: cepFormatado
                }
            }));
            return;
        }

        setTutor(prev => ({
            ...prev,
            endereco: {
                ...prev.endereco,
                [name]: value
            }
        }));
    };

    /* ======================
       ViaCEP
    ====================== */
    const buscarEnderecoPorCep = async (cep: string) => {
        const cepLimpo = cep.replace(/\D/g, '');

        if (cepLimpo.length !== 8) {
            toast.error('CEP inválido', { theme: 'colored' });
            return;
        }

        setCepLoading(true);

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            const data = await response.json();

            if (data.erro) {
                toast.error('CEP não encontrado', { theme: 'colored' });
                return;
            }

            setTutor(prev => ({
                ...prev,
                endereco: {
                    ...prev.endereco,
                    cep: data.cep,
                    rua: data.logradouro,
                    bairro: data.bairro,
                    cidade: data.localidade,
                    estado: data.uf,
                }
            }));
        } catch {
            toast.error('Erro ao consultar CEP', { theme: 'colored' });
        } finally {
            setCepLoading(false);
        }
    };

    /* ======================
       Submit
    ====================== */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!tutor.nome.trim()) {
            toast.error('Você deve informar o nome do tutor', { theme: 'colored' });
            return;
        }

        setIsLoading(true);

        try {
            if (tutor.id) {
                await updateTutor(tutor);
                toast.success(`Tutor ${tutor.nome} atualizado com sucesso!`, { theme: 'colored' });
            } else {
                await addTutor(tutor);
                toast.success(`Tutor ${tutor.nome} criado com sucesso!`, { theme: 'colored' });
            }

            setTimeout(() => navigate('/listar-tutor'), 1000);
        } catch {
            toast.error('Erro ao salvar tutor. Tente novamente.', { theme: 'colored' });
        } finally {
            setIsLoading(false);
        }
    };

    /* ======================
       Render
    ====================== */
    return (
        <div className="d-flex justify-content-center p-4">
            <div className="w-100" style={{ maxWidth: '1200px' }}>
                <ToastContainer position="top-right" autoClose={3000} />

                <div className="row g-4">

                    <div className="col-lg-8 col-md-7">
                        <div className="card shadow-sm">
                            <div className="card-header bg-primary text-white">
                                <h4 className="mb-0">
                                    {tutor.id ? 'Editar Tutor' : 'Criar Novo Tutor'}
                                </h4>
                            </div>

                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    {/* Nome */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Nome *</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            name="nome"
                                            value={tutor.nome}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* CPF */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">CPF</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            name="cpf"
                                            value={tutor.cpf}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <h5 className="mt-4 mb-3">Endereço</h5>

                                    {/* CEP + Rua */}
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <label className="form-label">CEP</label>
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="cep"
                                                    placeholder="00000-000"
                                                    value={tutor.endereco.cep}
                                                    onChange={handleEnderecoChange}
                                                    onBlur={(e) => buscarEnderecoPorCep(e.target.value)}
                                                />
                                                {cepLoading && (
                                                    <span className="input-group-text">
                                                        <span className="spinner-border spinner-border-sm" />
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-8 mb-3">
                                            <label className="form-label">Rua</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="rua"
                                                value={tutor.endereco.rua}
                                                onChange={handleEnderecoChange}
                                                disabled={cepLoading}
                                            />
                                        </div>
                                    </div>

                                    {/* Número / Complemento / Bairro */}
                                    <div className="row">
                                        <div className="col-md-3 mb-3">
                                            <label className="form-label">Número</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="numero"
                                                value={tutor.endereco.numero}
                                                onChange={handleEnderecoChange}
                                            />
                                        </div>

                                        <div className="col-md-5 mb-3">
                                            <label className="form-label">Complemento</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="complemento"
                                                value={tutor.endereco.complemento}
                                                onChange={handleEnderecoChange}
                                            />
                                        </div>

                                        <div className="col-md-4 mb-3">
                                            <label className="form-label">Bairro</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="bairro"
                                                value={tutor.endereco.bairro}
                                                onChange={handleEnderecoChange}
                                                disabled={cepLoading}
                                            />
                                        </div>
                                    </div>

                                    {/* Cidade / Estado */}
                                    <div className="row">
                                        <div className="col-md-8 mb-3">
                                            <label className="form-label">Cidade</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="cidade"
                                                value={tutor.endereco.cidade}
                                                onChange={handleEnderecoChange}
                                                disabled={cepLoading}
                                            />
                                        </div>

                                        <div className="col-md-4 mb-3">
                                            <label className="form-label">Estado</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="estado"
                                                value={tutor.endereco.estado}
                                                onChange={handleEnderecoChange}
                                                disabled={cepLoading}
                                            />
                                        </div>
                                    </div>

                                    {/* Telefone */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Telefone</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            name="telefone"
                                            value={tutor.telefone}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Email</label>
                                        <input
                                            type="email"
                                            className="form-control form-control-lg"
                                            name="email"
                                            value={tutor.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Observações */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Observações</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            name="observacoes"
                                            value={tutor.observacoes}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Status */}
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">Status</label>
                                        <select
                                            className="form-control form-control-lg"
                                            name="status"
                                            value={tutor.status}
                                            onChange={handleChange}
                                        >
                                            <option value="ATIVO">Ativo</option>
                                            <option value="APTO">Apto</option>
                                            <option value="SOB_OBSERVACAO">Sob observação</option>
                                            <option value="BLOQUEADO">Bloqueado</option>
                                            <option value="ARQUIVADO">Arquivado</option>
                                            <option value="DESCONHECIDO">Desconhecido</option>
                                        </select>
                                    </div>

                                    {/* Ações */}
                                    <div className="d-flex justify-content-end gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary btn-lg"
                                            onClick={() => navigate('/listar-tutor')}
                                            disabled={isLoading}
                                        >
                                            Voltar
                                        </button>

                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Salvando...' : 'Salvar Tutor'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* BARRA DE DICAS */}
                    <div className="col-lg-4 col-md-5 position-sticky" style={{ top: 24 }}>
                        <TutorFormTips />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CriarTutor;
