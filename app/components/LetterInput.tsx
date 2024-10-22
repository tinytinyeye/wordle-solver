import { Input, SxProps } from '@mui/material';
import { palette } from '@/utils/colors';
import { forwardRef } from 'react';

export type LetterVariant = 'placed' | 'valid' | 'bad';

interface LetterInputProps {
    variant: LetterVariant;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    sx?: SxProps;
}

export const variantToBackgroundColor = {
    placed: palette.green,
    valid: palette.yellow,
    bad: palette.gray,
};

const LetterInput = forwardRef<HTMLInputElement, LetterInputProps>(
    ({ variant, value, onChange, sx = {} }, ref) => {
        return (
            <Input
                sx={{
                    backgroundColor: value
                        ? variantToBackgroundColor[variant]
                        : palette.black,
                    border: `2px solid ${palette.gray}`,
                    color: value ? palette.white : palette.gray,
                    width: '3rem',
                    height: '3rem',
                    p: 0,
                    display: 'flex',
                    input: { textAlign: 'center', textTransform: 'uppercase' },
                    justifyContent: 'center',
                    fontSize: '32px',
                    ...sx,
                }}
                value={value}
                onChange={onChange}
                inputRef={ref}
            />
        );
    }
);

LetterInput.displayName = 'LetterInput';

export default LetterInput;
