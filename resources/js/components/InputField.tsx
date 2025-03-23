import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    error?: string;
}

export function InputField({
                               id,
                               label,
                               value,
                               onChange,
                               placeholder,
                               error
                           }: InputFieldProps) {
    return (
        <section className="space-y-2">
            <Label htmlFor={id}>
                {label} <span className="text-red-500">*</span>
            </Label>
            <Input
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            {error && <span className="text-sm text-red-500">{error}</span>}
        </section>
    );
}
