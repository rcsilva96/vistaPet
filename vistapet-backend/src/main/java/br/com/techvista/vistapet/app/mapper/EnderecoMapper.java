package br.com.techvista.vistapet.app.mapper;

import br.com.techvista.vistapet.app.dto.EnderecoDTO;
import br.com.techvista.vistapet.infra.embeddable.EnderecoEmbeddable;

public class EnderecoMapper {

    public static EnderecoEmbeddable toEmbeddable(EnderecoDTO dto) {
        if (dto == null) return null;

        EnderecoEmbeddable emb = new EnderecoEmbeddable();
        emb.setCep(dto.getCep());
        emb.setRua(dto.getRua());
        emb.setNumero(dto.getNumero());
        emb.setComplemento(dto.getComplemento());
        emb.setBairro(dto.getBairro());
        emb.setCidade(dto.getCidade());
        emb.setEstado(dto.getEstado());
        return emb;
    }

    public static EnderecoDTO toDTO(EnderecoEmbeddable emb) {
        if (emb == null) return null;

        EnderecoDTO dto = new EnderecoDTO();
        dto.setCep(emb.getCep());
        dto.setRua(emb.getRua());
        dto.setNumero(emb.getNumero());
        dto.setComplemento(emb.getComplemento());
        dto.setBairro(emb.getBairro());
        dto.setCidade(emb.getCidade());
        dto.setEstado(emb.getEstado());
        return dto;
    }
}

