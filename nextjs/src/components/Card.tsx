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
    transform
}: CardProps) {
    const imgRef = useRef<HTMLImageElement>(null);

    return (
        <Image
            ref={imgRef}
            src={src || getCardBackFileName()}
            alt={name + commentary + faceUpFileName}
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
                cursor: 'pointer'
            }}
        />
    );
}
