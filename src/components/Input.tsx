import { InputHTMLAttributes } from "react";

export default function TripCard(props: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className="border outline-none w-full py-1.5 px-3 focus:border-sky-500 border-slate-300 text-slate-500 rounded-md"
            {...props}
        />
    );
}
