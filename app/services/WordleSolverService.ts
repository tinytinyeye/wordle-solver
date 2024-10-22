import { Some } from '@/utils/typeUtils';
import dictionary from './dictionary.json';

export interface GetWordleSuggestionsRawQuery {
    placedLetters: string;
    validLetters: string;
    badLetters: string;
}

interface GetWordleSuggestionsQuery {
    placedLetters: string[];
    validLetters: string[];
    badLetters: string[];
}

const parseRawQuery = (
    query: GetWordleSuggestionsRawQuery
): GetWordleSuggestionsQuery => {
    const { placedLetters, validLetters, badLetters } = query;

    return {
        placedLetters: placedLetters.split(','),
        validLetters: validLetters.split(','),
        badLetters: badLetters.split(',').filter((char) => !!char),
    };
};

const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');
const vowels = 'aeiou'.split('');

const validateQuery = (query: GetWordleSuggestionsQuery) => {
    const { placedLetters, validLetters, badLetters } = query;

    const hasInvalidCharacters = ![
        ...placedLetters,
        ...validLetters,
        ...badLetters,
    ]
        .filter((char) => !!char)
        .every((char) => alphabets.includes(char));
    const hasInvalidLength =
        placedLetters.length !== 5 || validLetters.length !== 5;

    return !(hasInvalidCharacters || hasInvalidLength);
};

const isEmptyQuery = (query: GetWordleSuggestionsQuery) => {
    const { placedLetters, validLetters, badLetters } = query;

    return (
        placedLetters.every((char) => !char) &&
        validLetters.every((char) => !char) &&
        !badLetters.length
    );
};

const buildFilter = (query: GetWordleSuggestionsQuery) => {
    const { placedLetters, validLetters, badLetters } = query;

    const placedLettersFilters = placedLetters
        .map((char, i) => (char ? (word: string) => word[i] === char : null))
        .filter(Some);
    const validLettersFilters = validLetters
        .map((char, i) =>
            char
                ? (word: string) => word[i] !== char && word.includes(char)
                : null
        )
        .filter(Some);
    const badLettersFilters = badLetters.map(
        (char) => (word: string) => !word.includes(char)
    );

    const filters = [
        ...placedLettersFilters,
        ...validLettersFilters,
        ...badLettersFilters,
    ];

    return (word: string) =>
        filters.map((filter) => filter(word)).every(Boolean);
};

class WordleSolverService {
    dictionary: string[];
    constructor() {
        this.dictionary = dictionary;
    }

    getMostLikelyVowels(
        query: GetWordleSuggestionsQuery,
        suggestions: string[]
    ) {
        const { placedLetters, validLetters, badLetters } = query;
        const availableVowels = vowels.filter(
            (vowel) =>
                !placedLetters.includes(vowel) &&
                !validLetters.includes(vowel) &&
                !badLetters.includes(vowel)
        );
        const analysis = availableVowels
            .map((vowel) => ({ [vowel]: 0 }))
            .reduce((acc, cur) => Object.assign(acc, cur), {});

        suggestions.forEach((s) => {
            availableVowels.forEach((v) => {
                if (s.includes(v)) {
                    analysis[v] = analysis[v] + 1;
                }
            });
        });

        Object.keys(analysis).forEach((letter) => {
            analysis[letter] = analysis[letter] / suggestions.length;
        });

        return analysis;
    }

    getMostLikelyLetters(
        query: GetWordleSuggestionsQuery,
        suggestions: string[]
    ) {
        const { placedLetters, validLetters, badLetters } = query;
        const availableLetters = alphabets.filter(
            (l) =>
                !vowels.includes(l) &&
                !placedLetters.includes(l) &&
                !validLetters.includes(l) &&
                !badLetters.includes(l)
        );

        const analysis = availableLetters
            .map((vowel) => ({ [vowel]: 0 }))
            .reduce((acc, cur) => Object.assign(acc, cur), {});

        suggestions.forEach((s) => {
            availableLetters.forEach((v) => {
                if (s.includes(v)) {
                    analysis[v] = analysis[v] + 1;
                }
            });
        });

        Object.keys(analysis).forEach((letter) => {
            analysis[letter] = analysis[letter] / suggestions.length;
        });

        return analysis;
    }

    getSuggestions(query: GetWordleSuggestionsQuery) {
        const filter = buildFilter(query);

        return dictionary.filter(filter);
    }

    getReport(rawQuery: GetWordleSuggestionsRawQuery) {
        const query = parseRawQuery(rawQuery);
        if (!validateQuery(query) || isEmptyQuery(query)) {
            return {
                suggestions: [],
                mostLikelyVowels: {},
                mostLikelyLetters: {},
            };
        }

        const suggestions = this.getSuggestions(query);
        const mostLikelyVowels = this.getMostLikelyVowels(query, suggestions);
        const mostLikelyLetters = this.getMostLikelyLetters(query, suggestions);

        return { suggestions, mostLikelyVowels, mostLikelyLetters };
    }
}

const singleton = new WordleSolverService();

export default singleton;
