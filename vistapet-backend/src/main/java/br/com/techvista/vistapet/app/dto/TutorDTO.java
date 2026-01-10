package br.com.techvista.vistapet.app.dto;

import br.com.techvista.vistapet.app.enums.TipoOcorrenciaEnum;
import br.com.techvista.vistapet.app.enums.TutorStatusEnum;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TutorDTO {

    private Long id;

    @NotBlank(message = "Você deve informar o nome do tutor")
    private String nome;

    @NotBlank(message = "Você deve informar o CPF do tutor")
    private String cpf;

    private EnderecoDTO endereco;

    @NotBlank(message = "Você deve informar o telefone do tutor")
    private String telefone;

    @NotBlank(message = "Você deve informar o e-mail do tutor")
    private String email;

    private String observacoes;

    private TutorStatusEnum status;

}
