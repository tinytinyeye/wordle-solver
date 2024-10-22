import { ChangeEventHandler, useRef } from 'react';

export interface LettersState {
    placedLetters: string[];
    validLetters: string[];
    badLetters: string[];
}

interface SetSlotPayload {
    slot: keyof LettersState;
    index: number;
    value: string;
}

interface ClearSlotPayload {
    slot: keyof LettersState;
}

export interface LettersAction<Payload = SetSlotPayload | ClearSlotPayload> {
    type: 'SET_LETTER' | 'CLEAR_LETTERS' | 'CLEAR_ALL';
    payload?: Payload;
}

export const initialState: LettersState = {
    placedLetters: Array(5).fill(''),
    validLetters: Array(5).fill(''),
    badLetters: Array(15).fill(''),
};

export const reducer = (state: LettersState, action: LettersAction) => {
    const { type, payload } = action;

    switch (type) {
        case 'SET_LETTER': {
            const { slot, index, value } = payload as SetSlotPayload;

            return {
                ...state,
                [slot]: [
                    ...state[slot].slice(0, index),
                    value,
                    ...state[slot].slice(index + 1, state[slot].length),
                ],
            };
        }
        case 'CLEAR_LETTERS': {
            const { slot } = payload as ClearSlotPayload;

            return {
                ...state,
                [slot]: Array(state[slot].length).fill(''),
            };
        }
        case 'CLEAR_ALL': {
            return initialState;
        }
        default:
            return state;
    }
};

type SetLetterActionCreatorArg = { value: string; index: number };
export type SetLetterActionCreator = ({
    value,
    index,
}: SetLetterActionCreatorArg) => LettersAction<SetSlotPayload>;
export type ClearLettersActionCreator = () => LettersAction<ClearSlotPayload>;

export const setPlacedLetter: SetLetterActionCreator = ({ value, index }) => ({
    type: 'SET_LETTER',
    payload: { slot: 'placedLetters', index, value },
});
export const setValidLetter: SetLetterActionCreator = ({ value, index }) => ({
    type: 'SET_LETTER',
    payload: { slot: 'validLetters', index, value },
});
export const setBadLetter: SetLetterActionCreator = ({ value, index }) => ({
    type: 'SET_LETTER',
    payload: { slot: 'badLetters', index, value },
});
export const clearPlacedLetters: ClearLettersActionCreator = () => ({
    type: 'CLEAR_LETTERS',
    payload: { slot: 'placedLetters' },
});
export const clearValidLetters: ClearLettersActionCreator = () => ({
    type: 'CLEAR_LETTERS',
    payload: { slot: 'validLetters' },
});
export const clearBadLetters: ClearLettersActionCreator = () => ({
    type: 'CLEAR_LETTERS',
    payload: { slot: 'badLetters' },
});
export const clearAll = (): LettersAction => ({ type: 'CLEAR_ALL' });

export const useLetters = (
    num: number,
    setChar: ({ value, index }: SetLetterActionCreatorArg) => void
) => {
    const refs = useRef<Array<null | HTMLInputElement>>(Array(num).fill(null));
    const onCompleteHandlers = Array(num)
        .fill(1)
        .map((_, i) => () => {
            const nextLetterIndex = i + 1;
            if (nextLetterIndex === num) return;

            refs.current[nextLetterIndex]?.focus();
        });
    const onChangeHandlers: ChangeEventHandler<HTMLInputElement>[] = Array(num)
        .fill(1)
        .map((_, i) => ({ target: { value } }) => {
            const char = value ? value[0] : '';
            setChar({ index: i, value: char.toLowerCase() });
            if (char) onCompleteHandlers[i]();
        });

    return {
        refs,
        onChangeHandlers,
    };
};
