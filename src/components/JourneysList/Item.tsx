import { ReactNode } from "react";

interface ItemProps {
    children: ReactNode
}

export default function Item({ children }: ItemProps) {
    return (
        <li className="py-2 px-3 text-slate-700 rounded-md border border-slate-300">
            {children}
        </li>
    );
}
