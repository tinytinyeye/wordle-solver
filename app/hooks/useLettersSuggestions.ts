import useSWR from 'swr';

import { fetcher } from '@/utils/network';
import { LettersState } from './useLetters';

export const useLettersSuggestions = (state: LettersState) => {
    const { placedLetters, validLetters, badLetters } = state;

    const placedLettersParam = placedLetters
        .map((char) => char.toLowerCase())
        .join(',');
    const validLettersParam = validLetters
        .map((char) => char.toLowerCase())
        .join(',');
    const badLettersParam = badLetters
        .map((char) => char.toLowerCase())
        .join(',');

    const { data, error } = useSWR(
        `/api/getWordleSuggestions?placedLetters=${placedLettersParam}&validLetters=${validLettersParam}&badLetters=${badLettersParam}`,
        fetcher
    );

    return {
        data,
        isLoading: !error && !data,
        isError: error,
    };
};
