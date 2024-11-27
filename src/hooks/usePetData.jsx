import { useContext } from 'react';
import { PetContext } from '../contexts/post/PetContext';

export const usePetData = () => useContext(PetContext);
