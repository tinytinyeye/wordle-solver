import { Box, Typography, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

interface LettersTitleProps {
    title: string;
    onClear: () => void;
    clearAriaLabel: string;
}

const LettersTitle = ({
    title,
    onClear,
    clearAriaLabel,
}: LettersTitleProps) => (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography
            variant="h6"
            sx={{ color: 'white', py: 2, textAlign: 'center' }}
        >
            {title}
        </Typography>
        <IconButton aria-label={clearAriaLabel} onClick={onClear}>
            <Delete sx={{ fill: 'white' }} />
        </IconButton>
    </Box>
);

export default LettersTitle;
