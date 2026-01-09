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