package br.com.techvista.vistapet.infra.entity;

import br.com.techvista.vistapet.app.enums.TipoOcorrenciaEnum;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ocorrencias_tutor")
public class OcorrenciaTutorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "tutor_id", nullable = false)
    private TutorEntity tutor;

    @Enumerated(EnumType.STRING)
    private TipoOcorrenciaEnum tipo;

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false)
    private LocalDateTime dataRegistro;

    @Column(nullable = false)
    private Boolean confirmada;

    private String registradoPor;

    /*@OneToMany(mappedBy = "tutor", cascade = CascadeType.ALL)
    private List<OcorrenciaTutorEntity> ocorrencias = new ArrayList<>();*/
}
