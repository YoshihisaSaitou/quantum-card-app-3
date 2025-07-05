'use client';

import { useRef } from 'react';
import { getCardBackFileName } from '@/lib/QuantumCardUtility';
import Image from 'next/image';

type CardProps = {
    src: string;
    name: string;
    commentary: string;
    faceUpFileName: string;
    top: string;
    left: string;
    width: string;
    transform: string;
    isShuffling: boolean;
    isBinding: boolean;
    isVertical: boolean;
    zIndex: number;
    dataCardIndex: number;
    handleMouseDown: (e: React.MouseEvent | React.TouchEvent | React.PointerEvent) => void;
    handleMouseMove: (e: React.MouseEvent | React.TouchEvent | React.PointerEvent) => void;
    handleMouseUp: (e: React.MouseEvent | React.TouchEvent | React.PointerEvent) => void;
    handleDoubleClick: (e: React.MouseEvent | React.TouchEvent | React.PointerEvent) => void;
};

export default function Card({
    src,
    name,
    commentary,
    faceUpFileName,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDoubleClick,
    top,
    left,
    width,
    transform,
    isShuffling,
    isBinding,
    isVertical,
    zIndex,
    dataCardIndex
}: CardProps) {
    const imgRef = useRef<HTMLImageElement>(null);

    return (
        <Image
            ref={imgRef}
            src={src || getCardBackFileName()}
            alt={name + commentary + faceUpFileName}
            data-card-index={dataCardIndex}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
            onDoubleClick={handleDoubleClick}
            style={{
                position: 'absolute',
                top: top,
                left: left,
                width: width,
                height: 'auto',
                transform: transform,
                cursor: 'pointer',
                transition: isShuffling || isBinding || isVertical ? 'all 1s ease-in-out' : 'none',
                zIndex: zIndex
            }}
        />
    );
}
