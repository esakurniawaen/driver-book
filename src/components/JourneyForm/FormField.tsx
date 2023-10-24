import Input from "../Input";

interface FormFieldProps<T> {
    label: string;
    type?: "number" | "date";
    min?: string;
    value: T;
    onValueChange: (value: T) => void;
}

export default function FormField<T extends string | number | undefined>({
    label,
    type,
    min,
    value,
    onValueChange,
}: FormFieldProps<T>) {
    return (
        <>
            <div className="flex flex-col">
                <label>{label}</label>
                <Input
                    required
                    type={type ?? "text"}
                    min={min}
                    value={value}
                    onChange={(evt) => onValueChange(evt.target.value as T)}
                />
            </div>
        </>
    );
}
