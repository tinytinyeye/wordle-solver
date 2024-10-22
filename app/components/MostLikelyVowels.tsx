import React from 'react';
import { Box } from '@mui/material';
import LetterResult from './LetterResult';

interface MostLikelyVowelsProps {
    analysis: Record<string, number>;
}

const MostLikelyVowels = ({ analysis }: MostLikelyVowelsProps) => {
    const entries = Object.entries(analysis)
        .sort(([, a], [, b]) => b - a)
        .filter(([, p]) => p >= 0.00001);

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                mb: 2,
            }}
        >
            {entries.map(([letter, probability]) => (
                <LetterResult
                    key={`letter_result_${letter}`}
                    letter={letter}
                    probability={probability}
                    variant="vowel"
                    sx={{ mr: 1 }}
                />
            ))}
        </Box>
    );
};

export default MostLikelyVowels;
