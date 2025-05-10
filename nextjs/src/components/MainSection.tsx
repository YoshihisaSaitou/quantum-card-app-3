'use client';

import { useRef, useState, useEffect } from 'react';
import CardList from '../components/CardList';

export default function MainSection() {
    const mainRef = useRef<HTMLElement | null>(null);
    const [showCard, setShowCard] = useState(false);

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
            {showCard &&
                <CardList />
            }
        </main>
    );
}