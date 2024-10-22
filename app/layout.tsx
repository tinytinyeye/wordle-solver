import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box } from '@mui/material';

export const metadata: Metadata = {
    title: 'Wordle Solver',
    description: 'Solve Wordle puzzle in a bliz',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Box component="html" lang="en">
            <Box component="body">
                <Box sx={{ height: '100vh' }}>{children}</Box>
            </Box>
        </Box>
    );
}
