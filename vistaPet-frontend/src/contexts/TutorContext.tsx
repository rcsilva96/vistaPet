import React, { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import api from "../services/api";
import type { Tutor } from '../services/types';

interface TutorContextType {
  tutores: Tutor[];
  addTutor: (tutor: Tutor) => Promise<void>;
  updateTutor: (tutor: Tutor) => Promise<void>;
  disableTutor: (id: number) => Promise<void>;
}

export const TutorContext = createContext<TutorContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const TutorProvider: React.FC<Props> = ({ children }) => {
  const [tutores, setTutors] = useState<Tutor[]>([]);

  useEffect(() => {
    api.get<Tutor[]>("/tutores").then((response) => setTutors(response.data));
  }, []);

  const addTutor = async (tutor: Tutor) => {
    
    const response = await api.post<Tutor>("/tutores", tutor);
    setTutors(prev => [...prev, response.data]);

  };

  const updateTutor = async (tutor: Tutor) => {
    
    const response = await api.put<Tutor>(`/tutores/${tutor.id}`, tutor);
    setTutors(prev => 
      prev.map(a => (a.id === tutor.id ? response.data : a))
    )

  };

  const disableTutor = async (id: number) => {

    await api.put(`/tutores/${id}/disable`);
    setTutors(prev => prev.map(a => 
    a.id === id ? { ...a, ativo: false } : a
    
  ));
  };

  return (
    <TutorContext.Provider value={{ tutores, addTutor, updateTutor, disableTutor }}>
      {children}
    </TutorContext.Provider>
  );
};
