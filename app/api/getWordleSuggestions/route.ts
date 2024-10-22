import WordleSolverService from '@/services/WordleSolverService';
import { None } from '@/utils/typeUtils';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    const placedLetters = req.nextUrl.searchParams.get('placedLetters');
    const validLetters = req.nextUrl.searchParams.get('validLetters');
    const badLetters = req.nextUrl.searchParams.get('badLetters');

    if (None(placedLetters) || None(validLetters) || None(badLetters)) {
        // res.statusCode = 500;
        // res.
        // res.json({ error: 'missing parameters', query: req.query });
        return NextResponse.error();
    } else {
        const query = {
            placedLetters,
            validLetters,
            badLetters,
        };
        const { suggestions, mostLikelyVowels, mostLikelyLetters } =
            WordleSolverService.getReport(query);
        return NextResponse.json({
            suggestions,
            mostLikelyVowels,
            mostLikelyLetters,
        });
    }
};
