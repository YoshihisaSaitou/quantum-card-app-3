'use client';

type NavSectionProps = {
    onShuffle: () => void;
    onBind: () => void;
    onVertical: () => void;
}

export default function NavSection({ onShuffle, onBind, onVertical }: NavSectionProps) {
    return (
        <div className="absolute top-0 right-0">
            <nav>
                <ul className="flex flex-col gap-4 p-4">
                    <li
                        className="cursor-pointer hover:text-blue-500 transition-colors"
                        onClick={onShuffle}
                    >
                        混ぜる
                    </li>
                    <li
                        className="cursor-pointer hover:text-blue-500 transition-colors"
                        onClick={onBind}
                    >
                        束ねる
                    </li>
                    <li
                        className="cursor-pointer hover:text-blue-500 transition-colors"
                        onClick={onVertical}
                    >
                        縦にする
                    </li>
                </ul>
            </nav>
        </div>
    );
}