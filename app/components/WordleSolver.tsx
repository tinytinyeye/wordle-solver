'use client';
import { ComponentProps, useContext, useState } from 'react';
import { Box, Divider, Typography, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import PlacedLetters from './PlacedLetters';
import ValidLetters from './ValidLetters';
import BadLetters from './BadLetters';
import { LettersContext, Store } from './Store';
import { useLettersSuggestions } from '@/hooks/useLettersSuggestions';
import MostLikelyVowels from './MostLikelyVowels';
import MostLikelyLetters from './MostLikelyLetters';
import Suggestions from './Suggestions';
import { palette } from '@/utils/colors';

const WordleSolver = () => {
    const [state] = useContext(LettersContext);
    const { data, isLoading } = useLettersSuggestions(state);
    const suggestions = isLoading ? [] : data.suggestions;
    const mostLikelyVowels = isLoading ? {} : data.mostLikelyVowels;
    const mostLikelyLetters = isLoading ? {} : data.mostLikelyLetters;

    const [value, setValue] = useState('1');

    const handleChange: ComponentProps<typeof TabList>['onChange'] = (
        event,
        newValue
    ) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: palette.black,
            }}
        >
            <Box
                sx={{
                    minWidth: '80vw',
                    maxWidth: '80rem',
                    alignSelf: 'center',
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        color: palette.white,
                        py: 2,
                        fontWeight: '300',
                        textAlign: 'center',
                    }}
                >
                    Wordle Solver
                </Typography>
                <Divider sx={{ borderColor: palette.white, width: '100%' }} />
                <PlacedLetters />
                <ValidLetters />
                <BadLetters />
                <Box sx={{ display: 'flex', flexDirection: 'column', px: 4 }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList
                                onChange={handleChange}
                                aria-label="Suggestion tabs"
                                variant="fullWidth"
                            >
                                <Tab
                                    label="Letters"
                                    value="1"
                                    sx={{ color: palette.white }}
                                />
                                <Tab
                                    label="Words"
                                    value="2"
                                    sx={{ color: palette.white }}
                                />
                            </TabList>
                        </Box>
                        <TabPanel value="1" sx={{ px: 0 }}>
                            <MostLikelyVowels analysis={mostLikelyVowels} />
                            <MostLikelyLetters analysis={mostLikelyLetters} />
                        </TabPanel>
                        <TabPanel value="2" sx={{ px: 0 }}>
                            <Suggestions
                                suggestions={suggestions}
                                state={state}
                            />
                        </TabPanel>
                    </TabContext>
                </Box>
            </Box>
        </Box>
    );
};

const WordleSolverWithStore = () => (
    <Store>
        <WordleSolver />
    </Store>
);

export default WordleSolverWithStore;
