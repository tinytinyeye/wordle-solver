import React, { useContext } from 'react';
import { Check } from '@mui/icons-material';

import Letters from './Letters';
import { LettersContext } from './Store';
import { clearPlacedLetters, setPlacedLetter } from '@/hooks/useLetters';
import { variantToBackgroundColor } from './LetterInput';

const PlacedLetters = () => {
    const [state] = useContext(LettersContext);
    const { placedLetters } = state;

    return (
        <Letters
            variant="placed"
            letters={placedLetters}
            setLetter={setPlacedLetter}
            clearLetters={clearPlacedLetters}
            title="Placed letters"
            icon={<Check sx={{ fill: variantToBackgroundColor.placed }} />}
        />
    );
};

export default PlacedLetters;
