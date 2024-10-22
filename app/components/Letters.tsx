import { useContext } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

import LetterInput, { LetterVariant } from './LetterInput';
import { LettersContext } from './Store';
import {
    useLetters,
    SetLetterActionCreator,
    ClearLettersActionCreator,
} from '../hooks/useLetters';
import { palette } from '../utils/colors';

interface LettersProps {
    variant: LetterVariant;
    letters: string[];
    setLetter: SetLetterActionCreator;
    clearLetters: ClearLettersActionCreator;
    title: string;
    icon: React.ReactNode;
}

export const LETTERS_PER_ROW = 5;

const Letters = ({
    variant,
    letters,
    setLetter,
    clearLetters,
    title,
    icon,
}: LettersProps) => {
    const [, dispatch] = useContext(LettersContext);
    const { refs, onChangeHandlers } = useLetters(letters.length, (payload) =>
        dispatch(setLetter(payload))
    );

    return (
        <Box sx={{ mb: 1 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ mr: 1 }}>{icon}</Box>
                <Typography
                    variant="h6"
                    sx={{ color: palette.white, py: 1, textAlign: 'center' }}
                >
                    {title}
                </Typography>
                <IconButton
                    aria-label={`Clear ${title}`}
                    onClick={() => dispatch(clearLetters())}
                >
                    <Delete sx={{ fill: palette.white }} />
                </IconButton>
            </Box>
            {Array(letters.length / LETTERS_PER_ROW)
                .fill(null)
                .map((_, row) => (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            mt: row > 0 ? 0.5 : 0,
                        }}
                        key={`${variant}_letter_row_${row}P`}
                    >
                        {Array(LETTERS_PER_ROW)
                            .fill(null)
                            .map((_, column) => {
                                const i = row * LETTERS_PER_ROW + column;

                                return (
                                    <LetterInput
                                        variant={variant}
                                        value={letters[i]}
                                        onChange={onChangeHandlers[i]}
                                        sx={{ mr: 0.5 }}
                                        ref={(el) => {
                                            refs.current[i] = el;
                                        }}
                                        key={`${variant}_letter_${i}`}
                                    />
                                );
                            })}
                    </Box>
                ))}
        </Box>
    );
};

export default Letters;
