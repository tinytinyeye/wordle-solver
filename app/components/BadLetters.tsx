import { useContext } from 'react';
import { Close } from '@mui/icons-material';

import Letters from './Letters';
import { LettersContext } from './Store';
import { clearBadLetters, setBadLetter } from '@/hooks/useLetters';
import { variantToBackgroundColor } from './LetterInput';

const BadLetters = () => {
    const [state] = useContext(LettersContext);
    const { badLetters } = state;

    return (
        <Letters
            variant="bad"
            letters={badLetters}
            setLetter={setBadLetter}
            clearLetters={clearBadLetters}
            title="Bad letters"
            icon={<Close sx={{ fill: variantToBackgroundColor.bad }} />}
        />
    );
};

export default BadLetters;
