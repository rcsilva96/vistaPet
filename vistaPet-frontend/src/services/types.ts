export interface Pet {
    id?: number;
    nome: string;
    especie: string;
    peso: number;
    raca: string;
    cor: string;
    observacao?: string;
    status: 'ATIVO' | 'INATIVO' | 'ADOTADO' | 'ARQUIVADO' | 'DESCONHECIDO';
}

export type Endereco = {
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
};

export interface Tutor {

    id?: number;
    nome: string;
    cpf: string;
    endereco: Endereco;
    telefone: string;
    email: string;
    observacoes?: string;
    status: 'APTO' | 'ATIVO' | 'SOB_OBSERVACAO' | 'BLOQUEADO' | 'ARQUIVADO' | 'DESCONHECIDO';

}

