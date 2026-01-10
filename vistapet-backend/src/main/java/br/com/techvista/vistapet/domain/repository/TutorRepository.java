package br.com.techvista.vistapet.domain.repository;

import br.com.techvista.vistapet.app.enums.TutorStatusEnum;
import br.com.techvista.vistapet.infra.entity.TutorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TutorRepository extends JpaRepository<TutorEntity, Long> {

    public boolean existsById(Long id);
    public List<TutorEntity> findByStatus(TutorStatusEnum status);

}
