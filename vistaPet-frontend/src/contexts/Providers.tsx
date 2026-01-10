import type { ReactNode, ComponentType } from 'react';
import { PetProvider } from './PetContext';
import { TutorProvider } from './TutorContext';

type AppProvider = ComponentType<{ children: ReactNode }>;

const providers: AppProvider[] = [
  PetProvider,
  TutorProvider
  // Outros Providers podem ser adicionados aqui
];

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
};

export default Providers;
