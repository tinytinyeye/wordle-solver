'use client';
import dynamic from 'next/dynamic';

const NoSSR = dynamic(() => import('./components/WordleSolver'), {
    ssr: false,
});

const Page = () => <NoSSR />;

export default Page;
