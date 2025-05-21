'use client';

import { useRef } from 'react';
import NavSection from '../components/NavSection';
import MainSection from '../components/MainSection';

export default function Home() {
    const mainSectionRef = useRef<{ handleShuffle: () => void } | null>(null);

    const handleShuffle = () => {
        if (mainSectionRef.current) {
            mainSectionRef.current.handleShuffle();
        }
    };

    return (
        <div className="m-0 p-0 overflow-hidden bg-[#ccb7e0] min-h-screen">
            <NavSection onShuffle={handleShuffle} />
            <MainSection ref={mainSectionRef} />
        </div>
    );
}
