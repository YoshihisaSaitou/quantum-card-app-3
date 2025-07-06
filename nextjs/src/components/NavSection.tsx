'use client';

import { useState } from 'react';

type NavSectionProps = {
    onShuffle: () => void;
    onBind: () => void;
    onVertical: () => void;
}

export default function NavSection({ onShuffle, onBind, onVertical }: NavSectionProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleMenuClick = (action: () => void) => {
        action();
    };

    return (
        <div className="absolute top-4 right-4 z-999">
            {/* ハンバーガーメニューボタン */}
            <button
                onClick={toggleMenu}
                className="cursor-pointer flex flex-col justify-center items-center w-12 h-12 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
                aria-label="メニューを開く"
            >
                <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isOpen ? 'rotate-45 absolute top-0 bottom-0 m-auto' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-gray-600 mt-1.5 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isOpen ? 'rotate-135 absolute top-0 bottom-0 m-auto' : 'mt-1.5'}`}></span>
            </button>

            {/* ドロップダウンメニュー */}
            {isOpen && (
                <div className="absolute top-14 right-0 bg-white rounded-lg shadow-lg border border-gray-200 min-w-32">
                    <nav>
                        <ul className="py-2">
                            <li>
                                <button
                                    onClick={() => handleMenuClick(onShuffle)}
                                    className="cursor-pointer w-full text-left px-4 py-2 text-black transition-colors"
                                >
                                    混ぜる
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleMenuClick(onBind)}
                                    className="cursor-pointer w-full text-left px-4 py-2 text-black transition-colors"
                                >
                                    束ねる
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleMenuClick(onVertical)}
                                    className="cursor-pointer w-full text-left px-4 py-2 text-black transition-colors"
                                >
                                    縦にする
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
}