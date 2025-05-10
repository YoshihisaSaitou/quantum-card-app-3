'use client';

import { useState, useEffect } from 'react';
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
}

export default function CardList() {
    const [cardList, setCardList] = useState<CardData[]>([]);
    //const [windowInnerWidth, setWindowInnerWidth] = useState<number>(0);
    //const [windowInnerHeight, setWindowInnerHeight] = useState<number>(0);
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
    const [zIndexCount, setZIndexCount] = useState<number>(1);
    const [startMouseDownX, setStartMouseDownX] = useState<number>(0);
    const [startMouseDownY, setStartMouseDownY] = useState<number>(0);
    const [startMouseDownTop, setStartMouseDownTop] = useState<number>(0);
    const [startMouseDownLeft, setStartMouseDownLeft] = useState<number>(0);

    useEffect(() => {
        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;
        //setWindowInnerWidth(innerWidth);
        //setWindowInnerHeight(innerHeight);

        // カード初期化
        const tmpList = getCardList();
        const dataList = tmpList.map(value => ({
            ...value,
            top: `${getRandom(0, innerWidth / 2)}px`,
            left: `${getRandom(0, innerHeight / 2)}px`,
            width: `100px`,
            transform: `0deg`,//`rotate(${getRandom(0, 360)}deg)`,
        }));

        setCardList(dataList);
    }, []);

    function handleMouseDown(e: React.MouseEvent | React.TouchEvent | React.PointerEvent) {
        //console.log('handleMouseDown');
        //console.log(e);
        if (e.nativeEvent instanceof MouseEvent) {
            e.preventDefault();
        }
        e.stopPropagation();
        setIsMouseDown(true);
        const target = e.currentTarget as HTMLImageElement;
        //console.log(target);
        //console.log(target.style);
        const { pageX, pageY } = getPointerPosition(e);
        setStartMouseDownX(pageX);
        setStartMouseDownY(pageY);
        setStartMouseDownTop(parseInt(target.style.top || '0') || 0);
        setStartMouseDownLeft(parseInt(target.style.left || '0') || 0);
        target.style.zIndex = zIndexCount.toString();
        setZIndexCount((z: number) => z + 1);
    }

    function handleMouseMove(e: React.MouseEvent | React.TouchEvent | React.PointerEvent) {
        //console.log('handleMouseMove');
        if (!isMouseDown) return;
        e.stopPropagation();
        //console.log('handleMouseMove isMouseDown');
        const { pageX, pageY } = getPointerPosition(e);
        const target = e.currentTarget as HTMLImageElement;
        target.style.left = `${startMouseDownLeft - (startMouseDownX - pageX)}px`;
        target.style.top = `${startMouseDownTop - (startMouseDownY - pageY)}px`;
        //console.log('handleMouseMove startMouseDownLeft', startMouseDownLeft);
        //console.log('handleMouseMove startMouseDownX', startMouseDownX);
        //console.log('handleMouseMove pageX', pageX);
        //console.log('handleMouseMove target.style.left', target.style.left);
        //console.log('handleMouseMove target.style.top', target.style.top);
    }

    function handleMouseUp(e: React.MouseEvent | React.TouchEvent | React.PointerEvent) {
        //console.log('handleMouseUp');
        if (!isMouseDown) return;
        e.stopPropagation();
        setIsMouseDown(false);
        const { pageX, pageY } = getPointerPosition(e);
        const target = e.currentTarget as HTMLImageElement;
        target.style.left = `${startMouseDownLeft - (startMouseDownX - pageX)}px`;
        target.style.top = `${startMouseDownTop - (startMouseDownY - pageY)}px`;
        //console.log('handleMouseUp startMouseDownLeft', startMouseDownLeft);
        //console.log('handleMouseUp startMouseDownX', startMouseDownX);
        //console.log('handleMouseUp pageX', pageX);
        //console.log('handleMouseUp target.style.left', target.style.left);
        //console.log('handleMouseUp target.style.top', target.style.top);
    }

    function handleDoubleClick(e: React.MouseEvent | React.TouchEvent | React.PointerEvent, index: number) {
        //console.log('handleDoubleClick');
        e.stopPropagation();
        const target = e.currentTarget as HTMLImageElement;
        //console.log(target);
        //console.log(target.src);
        //console.log(index);
        //console.log(cardList[index]);
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
                />
            ))}
        </>
    );
}
