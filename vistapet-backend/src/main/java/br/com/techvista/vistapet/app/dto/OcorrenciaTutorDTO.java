package br.com.techvista.vistapet.app.dto;

import br.com.techvista.vistapet.app.enums.TipoOcorrenciaEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OcorrenciaTutorDTO {
    private TipoOcorrenciaEnum tipo;
    private String descricao;
    private boolean confirmada;
    private LocalDateTime dataRegistro;
}

