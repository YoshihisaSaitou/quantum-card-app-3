'use client';

import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { getRandom } from '@/lib/RandomValueGenerationUtility';
import { getCardBackFileName, getCardList } from '@/lib/QuantumCardUtility';
import { getPointerPosition } from '@/lib/EventUtility';
import Card from './Card';

type CardData = {
    src: string;
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
    bindCards: () => void;
    verticalCards: () => void;
};

const CardList = forwardRef<CardListHandle>((_, ref) => {
    const [cardList, setCardList] = useState<CardData[]>([]);
    const [isShuffling, setIsShuffling] = useState<boolean>(false);
    const [isBinding, setIsBinding] = useState<boolean>(false);
    const [isVertical, setIsVertical] = useState<boolean>(false);
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
    const [zIndexCount, setZIndexCount] = useState<number>(200);
    const [startMouseDownX, setStartMouseDownX] = useState<number>(0);
    const [startMouseDownY, setStartMouseDownY] = useState<number>(0);
    const [startMouseDownTop, setStartMouseDownTop] = useState<number>(0);
    const [startMouseDownLeft, setStartMouseDownLeft] = useState<number>(0);

    useImperativeHandle(ref, () => ({
        shuffleCards,
        bindCards,
        verticalCards
    }));

    useEffect(() => {
        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;

        // カード初期化
        const tmpList = getCardList();
        const dataList = tmpList.map(value => ({
            ...value,
            src: getCardBackFileName(),
            top: `${getRandom(0, Math.round(innerHeight / 2))}px`,
            left: `${getRandom(0, Math.round(innerWidth / 2))}px`,
            width: `clamp(3.125rem, 1.654rem + 7.35vw, 6.25rem)`,
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

        // zIndex用の重複しないランダム配列を生成
        const count = cardList.length;
        const zIndexArray = Array.from({ length: count }, (_, i) => i + 1);
        // フィッシャー–イェーツのシャッフルアルゴリズム
        for (let i = zIndexArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [zIndexArray[i], zIndexArray[j]] = [zIndexArray[j], zIndexArray[i]];
        }

        // アニメーション用の新しい位置を生成
        const newCardList = cardList.map((card, index) => ({
            ...card,
            src: getCardBackFileName(),
            top: `${getRandom(0, Math.round(innerHeight / 2))}px`,
            left: `${getRandom(0, Math.round(innerWidth / 2)) + 50}px`,
            transform: `rotate(${getRandom(0, 360)}deg)`,
            zIndex: zIndexArray[index] // ランダムなz-indexを割り当て
        }));
        setCardList(newCardList);

        // アニメーション完了後に状態をリセット
        setTimeout(() => {
            setIsShuffling(false);
        }, 1000);
    };

    const bindCards = () => {
        if (isBinding) return;
        setIsBinding(true);

        // zIndex用の重複しないランダム配列を生成
        const count = cardList.length;
        const zIndexArray = Array.from({ length: count }, (_, i) => i + 1);
        // フィッシャー–イェーツのシャッフルアルゴリズム
        for (let i = zIndexArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [zIndexArray[i], zIndexArray[j]] = [zIndexArray[j], zIndexArray[i]];
        }

        // 束ねる処理
        const newCardList = cardList.map((card, index) => ({
            ...card,
            src: getCardBackFileName(),
            top: '16px', // 縦に並べる
            left: '32px',
            transform: `rotate(${getRandom(0, 1) ? 180 : 0}deg)`,
            zIndex: zIndexArray[index] // ランダムなz-indexを割り当て
        }));
        setCardList(newCardList);

        // アニメーション完了後に状態をリセット
        setTimeout(() => {
            setIsBinding(false);
        }, 1000);
    };

    const verticalCards = () => {
        if (isVertical) return;
        setIsVertical(true);

        // 縦にする処理
        const newCardList = cardList.map((card) => ({
            ...card,
            transform: `rotate(${getRandom(0, 1) ? 180 : 0}deg)`,
        }));
        setCardList(newCardList);

        // アニメーション完了後に状態をリセット
        setTimeout(() => {
            setIsVertical(false);
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
        const newLeft = startMouseDownLeft - (startMouseDownX - pageX);
        const newTop = startMouseDownTop - (startMouseDownY - pageY);

        // React状態を更新
        setCardList(prevList => {
            const cardIndex = parseInt(target.dataset.cardIndex || '0');
            return prevList.map((card, index) =>
                index === cardIndex
                    ? {
                        ...card,
                        left: `${newLeft}px`,
                        top: `${newTop}px`
                    }
                    : card
            );
        });
    }

    function handleMouseUp(e: React.MouseEvent | React.TouchEvent | React.PointerEvent) {
        if (!isMouseDown) return;
        e.stopPropagation();
        setIsMouseDown(false);
        const { pageX, pageY } = getPointerPosition(e);
        const target = e.currentTarget as HTMLImageElement;
        const newLeft = startMouseDownLeft - (startMouseDownX - pageX);
        const newTop = startMouseDownTop - (startMouseDownY - pageY);

        // React状態を更新
        setCardList(prevList => {
            const cardIndex = parseInt(target.dataset.cardIndex || '0');
            return prevList.map((card, index) =>
                index === cardIndex
                    ? {
                        ...card,
                        left: `${newLeft}px`,
                        top: `${newTop}px`
                    }
                    : card
            );
        });
    }

    function handleDoubleClick(e: React.MouseEvent | React.TouchEvent | React.PointerEvent) {
        e.stopPropagation();
        const target = e.currentTarget as HTMLImageElement;
        //target.src = target.src.includes(getCardBackFileName()) ? cardList[index].face_up_file_name : getCardBackFileName();
        // React状態を更新
        setCardList(prevList => {
            const cardIndex = parseInt(target.dataset.cardIndex || '0');
            return prevList.map((card, index) =>
                index === cardIndex
                    ? {
                        ...card,
                        src: card.src.includes(getCardBackFileName()) ? card.face_up_file_name : getCardBackFileName()
                    }
                    : card
            );
        });
    }

    return (
        <>
            {cardList.map((value: CardData, index: number) => (
                <Card
                    key={index}
                    src={value.src}
                    name={value.name}
                    commentary={value.commentary}
                    faceUpFileName={value.face_up_file_name}
                    handleMouseDown={handleMouseDown}
                    handleMouseMove={handleMouseMove}
                    handleMouseUp={handleMouseUp}
                    handleDoubleClick={handleDoubleClick}
                    top={value.top}
                    left={value.left}
                    width={value.width}
                    transform={value.transform}
                    isShuffling={isShuffling}
                    isBinding={isBinding}
                    isVertical={isVertical}
                    zIndex={value.zIndex}
                    dataCardIndex={index}
                />
            ))}
        </>
    );
});

CardList.displayName = 'CardList';

export default CardList;
