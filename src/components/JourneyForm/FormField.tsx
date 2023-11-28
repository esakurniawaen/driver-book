import Input from "../Input";

interface FormFieldProps<T> {
    label: string;
    type?: "number" | "date";
    min?: string;
    required?: boolean;
    value: T;
    defaultValue?: string | undefined;
    onValueChange: (value: T) => void;
}

export default function FormField<T extends string | number | undefined>({
    label,
    type,
    min,
    required,
    defaultValue,
    value,
    onValueChange,
}: FormFieldProps<T>) {
    return (
        <>
            <div className="flex w-full flex-col">
                <label>{label}</label>
                <Input
                    required={required}
                    defaultValue={defaultValue}
                    type={type ?? "text"}
                    min={min}
                    value={value}
                    onChange={(evt) => onValueChange(evt.target.value as T)}
                />
            </div>
        </>
    );
}
