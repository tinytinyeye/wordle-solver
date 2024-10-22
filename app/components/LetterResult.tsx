import { Box, SxProps } from '@mui/material';
import { palette } from '@/utils/colors';

export type LetterResultVariant = 'vowel' | 'letter';

interface LetterResultProps {
    variant: LetterResultVariant;
    letter: string;
    probability: number;
    sx?: SxProps;
}

const variantToBackgroundColor = {
    vowel: palette.green,
    letter: palette.gray,
};

const LetterResult = ({
    variant,
    letter,
    probability,
    sx = {},
}: LetterResultProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: palette.white,
                width: '3rem',
                height: '3rem',
                ...sx,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    backgroundColor: variantToBackgroundColor[variant],
                    border: '2px solid #3a3a3c',
                    width: '1.5rem',
                    height: '1.5rem',
                    p: 0,
                    justifyContent: 'center',
                    fontSize: '20px',
                    mb: 1,
                    textTransform: 'uppercase',
                }}
            >
                {letter}
            </Box>
            <Box
                sx={{ fontSize: '12px' }}
            >{`${(probability * 100).toFixed(2)}%`}</Box>
        </Box>
    );
};

export default LetterResult;
