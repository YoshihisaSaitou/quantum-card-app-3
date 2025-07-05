'use client';

import { useRef } from 'react';
import NavSection from '../components/NavSection';
import MainSection from '../components/MainSection';

export default function Home() {
    const mainSectionRef = useRef<{
        handleShuffle: () => void,
        handleBind: () => void
    } | null>(null);

    const handleShuffle = () => {
        if (mainSectionRef.current) {
            mainSectionRef.current.handleShuffle();
        }
    };

    const handleBind = () => {
        if (mainSectionRef.current) {
            mainSectionRef.current.handleBind();
        }
    };

    return (
        <div className="m-0 p-0 overflow-hidden bg-[#ccb7e0] min-h-screen">
            <NavSection
                onShuffle={handleShuffle}
                onBind={handleBind}
            />
            <MainSection ref={mainSectionRef} />
        </div>
    );
}
