package br.com.techvista.vistapet.app.service;

import br.com.techvista.vistapet.app.dto.TutorDTO;

import java.util.List;

public interface TutorService {

    TutorDTO createTutor(TutorDTO tutorDTO);
    TutorDTO getTutorById(Long id);
    List<TutorDTO> getAllTutors();
    TutorDTO updateTutor(Long id, TutorDTO tutorDTO);
    TutorDTO disableTutor(Long id);
    
}
