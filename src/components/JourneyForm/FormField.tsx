import { InputHTMLAttributes } from "react";
import Input from "../Input";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    onValueChange: (value: string) => void;
}

export default function FormField({
    label,
    value,
    onValueChange,
    ...restProps
}: FormFieldProps) {
    return (
        <>
            <div className="">
                <label>{label}</label>
                <Input
                    value={value}
                    onChange={(evt) => onValueChange(evt.target.value)}
                    {...restProps}
                />
            </div>
        </>
    );
}
