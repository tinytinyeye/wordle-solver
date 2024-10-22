import { Box } from '@mui/material';
import LetterResult from './LetterResult';
import { LETTERS_PER_ROW } from './Letters';

interface MostLikelyLettersProps {
    analysis: Record<string, number>;
}

const MostLikelyLetters = ({ analysis }: MostLikelyLettersProps) => {
    const entries = Object.entries(analysis)
        .sort(([, a], [, b]) => b - a)
        .filter(([, p]) => p >= 0.00001)
        .slice(0, 10);

    const numberOfRows = Math.ceil(entries.length / LETTERS_PER_ROW);

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            {Array(numberOfRows)
                .fill(null)
                .map((_, row) => (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            mt: row > 0 ? 2 : 0,
                        }}
                        key={`letter_result_row_${row}`}
                    >
                        {Array(LETTERS_PER_ROW)
                            .fill(null)
                            .map((_, column) => {
                                const i = row * LETTERS_PER_ROW + column;
                                if (!entries[i]) return null;

                                const [letter, probability] = entries[i];

                                return (
                                    <LetterResult
                                        key={`letter_result_${letter}`}
                                        letter={letter}
                                        probability={probability}
                                        variant="letter"
                                        sx={{ mr: 1 }}
                                    />
                                );
                            })}
                    </Box>
                ))}
        </Box>
    );
};

export default MostLikelyLetters;
