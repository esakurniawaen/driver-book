import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    colorTheme?: 'BLUE' | 'GREEN'
}

export default function TripCard({colorTheme = 'BLUE', ...restProps}: InputProps) {
    return (
        <input
            className={`border transition h-9 outline-none w-full px-3 ${
                colorTheme === "BLUE" ? "focus:border-blue-500" : "focus:border-emerald-500"
            }  border-slate-300 text-slate-500 rounded-md`}
            {...restProps}
        />
    );
}
