import type { ReactNode, ComponentType } from 'react';
import { PetProvider } from './PetContext';

type AppProvider = ComponentType<{ children: ReactNode }>;

const providers: AppProvider[] = [
  PetProvider,
  // TutorProvider amanhã
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
