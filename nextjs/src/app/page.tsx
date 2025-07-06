'use client';

import { useRef } from 'react';
import NavSection from '../components/NavSection';
import MainSection from '../components/MainSection';

export default function Home() {
    const mainSectionRef = useRef<{
        handleShuffle: () => void,
        handleBind: () => void,
        handleVertical: () => void
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

    const handleVertical = () => {
        if (mainSectionRef.current) {
            mainSectionRef.current.handleVertical();
        }
    };

    return (
        <div className="m-0 p-0 overflow-hidden bg-[#ccb7e0] min-h-screen">
            <NavSection
                onShuffle={handleShuffle}
                onBind={handleBind}
                onVertical={handleVertical}
            />
            <MainSection ref={mainSectionRef} />
        </div>
    );
}
