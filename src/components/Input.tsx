import { InputHTMLAttributes } from "react";

export default function TripCard(props: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className='border h-9 outline-none w-full px-3 focus:border-blue-500 border-slate-300 text-slate-500 rounded-md'
            {...props}
        />
    );
}
