'use client';

import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import CardList from '../components/CardList';

export type MainSectionHandle = {
    handleShuffle: () => void;
    handleBind: () => void;
};

const MainSection = forwardRef<MainSectionHandle>((_, ref) => {
    const mainRef = useRef<HTMLElement | null>(null);
    const [showCard, setShowCard] = useState(false);
    const cardListRef = useRef<{
        shuffleCards: () => void,
        bindCards: () => void,
    } | null>(null);

    useImperativeHandle(ref, () => ({
        handleShuffle: () => {
            if (cardListRef.current) {
                cardListRef.current.shuffleCards();
            }
        },
        handleBind: () => {
            if (cardListRef.current) {
                cardListRef.current.bindCards();
            }
        }
    }));

    useEffect(() => {
        if (mainRef.current) {
            console.log('mainタグのDOM要素:', mainRef.current);
            console.log('高さ:', mainRef.current.offsetHeight);
            console.log('幅:', mainRef.current.offsetWidth);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setShowCard(true), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <main ref={mainRef} className="relative">
            {showCard && <CardList ref={cardListRef} />}
        </main>
    );
});

MainSection.displayName = 'MainSection';

export default MainSection;