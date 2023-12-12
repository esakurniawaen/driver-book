import { ReactNode } from "react";

interface DetailProps {
    children: ReactNode
}

export default function Detail({ children }: DetailProps) {
    return (
        <li className="py-2 px-3 text-slate-700 rounded-md border border-slate-300">
            {children}
        </li>
    );
}
