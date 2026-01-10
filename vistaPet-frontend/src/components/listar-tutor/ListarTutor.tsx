import React, { useContext, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TutorContext } from '../../contexts/TutorContext';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import type { Tutor } from '../../services/types';

/* =======================
   Tipos auxiliares
======================= */
type StatusTutor = Tutor['status'];
type FiltroStatus = 'TODOS' | StatusTutor;

/* =======================
   Componente
======================= */
const ListarTutor: React.FC = () => {
    const context = useContext(TutorContext);
    const navigate = useNavigate();

    if (!context) {
        throw new Error('TutorContext não encontrado');
    }

    const { tutores, disableTutor } = context;

    /* =======================
          Badges de status
      ======================= */

    const tutorStatusBadgeMap: Record<string, string> = {
        ATIVO: 'bg-success',
        APTO: 'bg-primary',
        SOB_OBSERVACAO: 'bg-info',
        BLOQUEADO: 'bg-danger',
        ARQUIVADO: 'bg-dark',
        DESCONHECIDO: 'bg-warning',
    };


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
            text: 'O tutor será bloqueado. Essa ação não pode ser revertida depois.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Bloquear',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                disableTutor(id);
                toast.success('Tutor bloqueado com sucesso!', { theme: 'colored' });
            }
        });
    };

    /* =======================
       Filtro (memoizado)
    ======================= */
    const tutoresFiltrados = useMemo(() => {
        return tutores.filter((tutor) => {
            const passaStatus =
                filtroStatus === 'TODOS' || tutor.status === filtroStatus;

            const termoBusca = busca.toLowerCase();

            const passaBusca =
                tutor.nome.toLowerCase().includes(termoBusca) ||
                tutor.cpf.toLowerCase().includes(termoBusca) ||
                tutor.email.toLowerCase().includes(termoBusca) ||
                tutor.telefone.toLowerCase().includes(termoBusca);

            return passaStatus && passaBusca;
        });
    }, [tutores, filtroStatus, busca]);

    /* =======================
       Render
    ======================= */
    return (
        <div className="d-flex justify-content-center p-4">
            <div className="w-100" style={{ maxWidth: '1200px' }}>
                <ToastContainer position="top-right" autoClose={3000} />

                <div className="card shadow-sm">
                    {/* Header */}
                    <div className="card-header bg-primary text-white py-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">

                            {/* Título */}
                            <h4 className="mb-0 fw-semibold">
                                Lista de Tutores
                            </h4>

                            {/* Toolbar */}
                            <div className="d-flex align-items-center gap-2 flex-wrap">

                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="Digite um nome para buscar"
                                    value={busca}
                                    onChange={(e) => setBusca(e.target.value)}
                                    style={{ width: '220px' }}
                                />

                                <select
                                    className="form-select form-select-sm"
                                    value={filtroStatus}
                                    onChange={(e) =>
                                        setFiltroStatus(e.target.value as FiltroStatus)
                                    }
                                    style={{ width: '150px' }}
                                >
                                    <option value="TODOS">Todos</option>
                                    <option value="ATIVO">Ativos</option>
                                    <option value="APTO">Aptos</option>
                                    <option value="SOB_OBSERVACAO">Sob observação</option>
                                    <option value="BLOQUEADO">Bloqueados</option>
                                    <option value="ARQUIVADO">Arquivados</option>
                                    <option value="DESCONHECIDO">Desconhecidos</option>
                                </select>

                                <button
                                    className="btn btn-success btn-sm"
                                    onClick={() => navigate('/criar-tutor')}
                                >
                                    <i className="fas fa-plus me-1"></i>
                                    Novo Tutor
                                </button>

                            </div>
                        </div>
                    </div>



                    {/* Body */}
                    <div className="card-body">
                        {tutoresFiltrados.length > 0 ? (
                            <table className="table table-striped align-middle">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>CPF</th>
                                        <th>Telefone</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th className="text-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tutoresFiltrados.map((tutor) => (
                                        <tr key={tutor.id}>
                                            <td>{tutor.nome}</td>
                                            <td>{tutor.cpf}</td>
                                            <td>{tutor.telefone}</td>
                                            <td>{tutor.email}</td>
                                            <td>
                                                <span
                                                    className={`badge ${tutorStatusBadgeMap[tutor.status] ?? 'bg-secondary'
                                                        }`}
                                                >
                                                    {tutor.status}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <button
                                                    className="btn btn-outline-primary btn-sm me-1"
                                                    onClick={() =>
                                                        navigate('/criar-tutor', { state: tutor })
                                                    }
                                                    title="Editar tutor"
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>

                                                <button
                                                    className="btn btn-outline-info btn-sm me-1"
                                                    onClick={() =>
                                                        Swal.fire({
                                                            title: 'Detalhes do Tutor',
                                                            html: `
                                <p><b>Nome:</b> ${tutor.nome}</p>
                                <p><b>CPF:</b> ${tutor.cpf}</p>
                                <p><b>Telefone:</b> ${tutor.telefone}</p>
                                <p><b>Email:</b> ${tutor.email}</p>
                                <p><b>Status:</b> ${tutor.status}</p>
                                ${tutor.observacoes
                                                                    ? `<p><b>Observação:</b> ${tutor.observacoes}</p>`
                                                                    : ''
                                                                }
                              `,
                                                            confirmButtonText: 'OK',
                                                        })
                                                    }
                                                    title="Visualizar Tutor"
                                                >
                                                    <i className="fas fa-eye"></i>
                                                </button>

                                                {tutor.status === 'ATIVO' && (
                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() => handleDisable(tutor.id!)}
                                                        title="Bloquear tutor"
                                                    >
                                                        <i className="fa-solid fa-lock"></i>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <h5 className="text-center mt-3">
                                Nenhum tutor encontrado
                            </h5>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListarTutor;
