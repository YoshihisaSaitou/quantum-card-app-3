type PointerPosition = {
    pageX: number;
    pageY: number;
};

export function getPointerPosition(e: React.MouseEvent | React.TouchEvent | React.PointerEvent): PointerPosition {
    if ('pageX' in e && 'pageY' in e) {
        // MouseEvent または PointerEvent
        return {
            pageX: e.pageX,
            pageY: e.pageY
        };
    } else if ('changedTouches' in e && e.changedTouches.length > 0) {
        // TouchEvent
        return {
            pageX: e.changedTouches[0].pageX,
            pageY: e.changedTouches[0].pageY
        };
    }

    // フォールバック（イベントが不明な場合）
    return { pageX: 0, pageY: 0 };
}