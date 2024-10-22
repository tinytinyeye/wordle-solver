import { forwardRef } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';

import { palette } from '@/utils/colors';
import { LettersState } from '@/hooks/useLetters';

const Item = styled(Button)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    backgroundColor: palette.gray,
    ':hover': { backgroundColor: palette.gray },
    width: '100%',
}));

export const Suggestion = forwardRef<
    HTMLButtonElement,
    {
        word: string;
        state: LettersState;
        onClick: () => void;
    }
>(({ word: suggestion, state, onClick, ...props }, ref) => {
    const { placedLetters, validLetters } = state;

    return (
        <Item ref={ref} onClick={onClick} {...props}>
            {suggestion.split('').map((char, i) => {
                if (placedLetters[i] === char)
                    return (
                        <Box
                            key={`${suggestion}_${i}`}
                            component="span"
                            sx={{ color: palette.green, fontWeight: 'bold' }}
                        >
                            {char}
                        </Box>
                    );
                if (validLetters.includes(char))
                    return (
                        <Box
                            key={`${suggestion}_${i}`}
                            component="span"
                            sx={{ color: palette.yellow, fontWeight: 'bold' }}
                        >
                            {char}
                        </Box>
                    );
                return (
                    <Box
                        key={`${suggestion}_${i}`}
                        component="span"
                        sx={{ color: palette.white }}
                    >
                        {char}
                    </Box>
                );
            })}
        </Item>
    );
});

Suggestion.displayName = 'Suggestion';
