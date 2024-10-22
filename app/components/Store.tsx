'use client';
import { createContext, PropsWithChildren, useReducer } from 'react';

import {
    initialState,
    reducer,
    LettersState,
    LettersAction,
} from '@/hooks/useLetters';

export const LettersContext = createContext<
    [LettersState, React.Dispatch<LettersAction>]
>([initialState, () => {}]);

export const Store = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <LettersContext.Provider value={[state, dispatch]}>
            {children}
        </LettersContext.Provider>
    );
};
