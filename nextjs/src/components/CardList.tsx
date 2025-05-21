'use client';

import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { getRandom } from '@/lib/RandomValueGenerationUtility';
import { getCardBackFileName, getCardList } from '@/lib/QuantumCardUtility';
import { getPointerPosition } from '@/lib/EventUtility';
import Card from './Card';

type CardData = {
    name: string;
    commentary: string;
    face_up_file_name: string;
    top: string;
    left: string;
    width: string;
    transform: string;
    zIndex: number;
}

export type CardListHandle = {
    shuffleCards: () => void;
};

const CardList = forwardRef<CardListHandle>((_, ref) => {
    const [cardList, setCardList] = useState<CardData[]>([]);
    const [isShuffling, setIsShuffling] = useState<boolean>(false);
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
    const [zIndexCount, setZIndexCount] = useState<number>(1);
    const [startMouseDownX, setStartMouseDownX] = useState<number>(0);
    const [startMouseDownY, setStartMouseDownY] = useState<number>(0);
    const [startMouseDownTop, setStartMouseDownTop] = useState<number>(0);
    const [startMouseDownLeft, setStartMouseDownLeft] = useState<number>(0);

    useImperativeHandle(ref, () => ({
        shuffleCards
    }));

    useEffect(() => {
        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;

        // カード初期化
        const tmpList = getCardList();
        const dataList = tmpList.map(value => ({
            ...value,
            top: `${getRandom(0, innerWidth / 2)}px`,
            left: `${getRandom(0, innerHeight / 2)}px`,
            width: `100px`,
            transform: `0deg`,
            zIndex: getRandom(1, 100)
        }));

        setCardList(dataList);
    }, []);

    const shuffleCards = () => {
        if (isShuffling) return;
        setIsShuffling(true);

        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;

        // アニメーション用の新しい位置を生成
        const newCardList = cardList.map(card => ({
            ...card,
            top: `${getRandom(0, innerWidth / 2)}px`,
            left: `${getRandom(0, innerHeight / 2)}px`,
            transform: `rotate(${getRandom(0, 360)}deg)`,
            zIndex: getRandom(1, 100)
        }));

        setCardList(newCardList);

        // アニメーション完了後に状態をリセット
        setTimeout(() => {
            setIsShuffling(false);
        }, 1000);
    };

    function handleMouseDown(e: React.MouseEvent | React.TouchEvent | React.PointerEvent) {
        if (e.nativeEvent instanceof MouseEvent) {
            e.preventDefault();
        }
        e.stopPropagation();
        setIsMouseDown(true);
        const target = e.currentTarget as HTMLImageElement;
        const { pageX, pageY } = getPointerPosition(e);
        setStartMouseDownX(pageX);
        setStartMouseDownY(pageY);
        setStartMouseDownTop(parseInt(target.style.top || '0') || 0);
        setStartMouseDownLeft(parseInt(target.style.left || '0') || 0);
        target.style.zIndex = zIndexCount.toString();
        setZIndexCount((z: number) => z + 1);
    }

    function handleMouseMove(e: React.MouseEvent | React.TouchEvent | React.PointerEvent) {
        if (!isMouseDown) return;
        e.stopPropagation();
        const { pageX, pageY } = getPointerPosition(e);
        const target = e.currentTarget as HTMLImageElement;
        target.style.left = `${startMouseDownLeft - (startMouseDownX - pageX)}px`;
        target.style.top = `${startMouseDownTop - (startMouseDownY - pageY)}px`;
    }

    function handleMouseUp(e: React.MouseEvent | React.TouchEvent | React.PointerEvent) {
        if (!isMouseDown) return;
        e.stopPropagation();
        setIsMouseDown(false);
        const { pageX, pageY } = getPointerPosition(e);
        const target = e.currentTarget as HTMLImageElement;
        target.style.left = `${startMouseDownLeft - (startMouseDownX - pageX)}px`;
        target.style.top = `${startMouseDownTop - (startMouseDownY - pageY)}px`;
    }

    function handleDoubleClick(e: React.MouseEvent | React.TouchEvent | React.PointerEvent, index: number) {
        e.stopPropagation();
        const target = e.currentTarget as HTMLImageElement;
        target.src = target.src.includes(getCardBackFileName()) ? cardList[index].face_up_file_name : getCardBackFileName();
    }

    return (
        <>
            {cardList.map((value: CardData, index: number) => (
                <Card
                    key={index}
                    src=''
                    name={value.name}
                    commentary={value.commentary}
                    faceUpFileName={value.face_up_file_name}
                    handleMouseDown={handleMouseDown}
                    handleMouseMove={handleMouseMove}
                    handleMouseUp={handleMouseUp}
                    handleDoubleClick={(e) => handleDoubleClick(e, index)}
                    top={value.top}
                    left={value.left}
                    width={value.width}
                    transform={value.transform}
                    isShuffling={isShuffling}
                    zIndex={value.zIndex}
                />
            ))}
        </>
    );
});

CardList.displayName = 'CardList';

export default CardList;
