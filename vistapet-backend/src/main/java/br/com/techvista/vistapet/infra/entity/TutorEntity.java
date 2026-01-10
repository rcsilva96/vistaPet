package br.com.techvista.vistapet.infra.entity;

import br.com.techvista.vistapet.app.enums.TutorStatusEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tutores")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TutorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String cpf;
    private String endereco;
    private String telefone;
    private String email;
    private String observacoes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TutorStatusEnum status;

    /*@OneToMany(mappedBy = "tutor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OcorrenciaTutorEntity> ocorrencias = new ArrayList<>();*/

}
