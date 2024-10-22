import { useContext } from 'react';
import { QuestionMark } from '@mui/icons-material';

import Letters from './Letters';
import { LettersContext } from './Store';
import { clearValidLetters, setValidLetter } from '@/hooks/useLetters';
import { variantToBackgroundColor } from './LetterInput';

const ValidLetters = () => {
    const [state] = useContext(LettersContext);
    const { validLetters } = state;

    return (
        <Letters
            variant="valid"
            letters={validLetters}
            setLetter={setValidLetter}
            clearLetters={clearValidLetters}
            title="Valid letters"
            icon={
                <QuestionMark sx={{ fill: variantToBackgroundColor.valid }} />
            }
        />
    );
};

export default ValidLetters;
