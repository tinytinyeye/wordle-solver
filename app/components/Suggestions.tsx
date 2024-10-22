import { useState, forwardRef } from 'react';
import useSWR from 'swr';
import { Box, Paper, ClickAwayListener, Grid2 } from '@mui/material';

import { fetcher } from '../utils/network';
import { LettersState } from '@/hooks/useLetters';
import { Suggestion } from './Suggestion';
import { palette } from '@/utils/colors';

const useDefinition = (word = '') => {
    const { data, error } = useSWR(
        word ? `https://api.dictionaryapi.dev/api/v2/entries/en/${word}` : null,
        fetcher
    );

    const definition =
        (data || {})?.[0]?.meanings?.[0].definitions?.[0]?.definition ||
        'Loading';

    return error ? 'Not found' : definition;
};

const Definition = forwardRef<HTMLDivElement, { word: string }>(
    ({ word }, ref) => {
        const definition = useDefinition(word);

        return (
            word && (
                <Paper
                    sx={{
                        p: 1,
                        mb: 2,
                        backgroundColor: palette.gray,
                        color: palette.white,
                        textAlign: 'center',
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                        width: '100%',
                    }}
                    ref={ref}
                >
                    {definition}
                </Paper>
            )
        );
    }
);
Definition.displayName = 'Definition';

const Suggestions = ({
    suggestions,
    state,
}: {
    suggestions: string[];
    state: LettersState;
}) => {
    const [wordForDefinition, setWordForDefinition] = useState('');

    return (
        <ClickAwayListener onClickAway={() => setWordForDefinition('')}>
            <Box sx={{ flexGrow: 1, height: '20vh', overflowY: 'scroll' }}>
                <Definition word={wordForDefinition} />

                <Grid2 container spacing={2}>
                    {suggestions.map((suggestion) => (
                        <Grid2
                            size={{ xs: 4, md: 2 }}
                            key={`suggestion_${suggestion}`}
                        >
                            <Suggestion
                                word={suggestion}
                                state={state}
                                onClick={() => setWordForDefinition(suggestion)}
                            />
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
        </ClickAwayListener>
    );
};

export default Suggestions;
