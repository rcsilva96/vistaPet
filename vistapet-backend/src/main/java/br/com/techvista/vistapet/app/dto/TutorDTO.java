package br.com.techvista.vistapet.app.dto;

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
    private Integer cpf;

    @NotBlank(message = "Você deve informar o endereço do tutor")
    private String endereco;

    @NotBlank(message = "Você deve informar o telefone do tutor")
    private String telefone;

    @NotBlank(message = "Você deve informar o e-mail do tutor")
    private String email;

}
