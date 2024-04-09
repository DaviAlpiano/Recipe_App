import { createContext } from 'react';
import { APIContextType } from '../../../types';

const APIContext = createContext({} as APIContextType);

export default APIContext;
