'use client';

type NavSectionProps = {
    onShuffle: () => void;
}

export default function NavSection({ onShuffle }: NavSectionProps) {
    return (
        <div className="absolute top-0 right-0">
            <nav>
                <ul className="flex gap-4 p-4">
                    <li
                        className="cursor-pointer hover:text-blue-500 transition-colors"
                        onClick={onShuffle}
                    >
                        混ぜる
                    </li>
                    <li className="cursor-pointer hover:text-blue-500 transition-colors">束ねる</li>
                </ul>
            </nav>
        </div>
    );
}