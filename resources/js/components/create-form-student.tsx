import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Textarea } from '@headlessui/react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { StudentFormData } from '@/types/StudentType';

export function CreateFormStudent() {
    const { data, setData, post, processing, reset } = useForm<StudentFormData>({
        first_name: '',
        last_name: '',
        gender: '', // Required now
        date_of_birth: '', // Required now
        start_date: '',
        phone_number: '',
        address: '',
    });

    const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (dateOfBirth) {
            setData('date_of_birth', format(dateOfBirth, 'yyyy-MM-dd'));
        }
    }, [dateOfBirth]);

    useEffect(() => {
        if (startDate) {
            setData('start_date', format(startDate, 'yyyy-MM-dd'));
        }
    }, [startDate]);

    const isFormValid = () => {
        const phoneRegex = /^[+]?[0-9]{8,15}$/;
        const today = new Date();
        const dob = dateOfBirth ? new Date(dateOfBirth) : null;
        const start = startDate ? new Date(startDate) : null;

        return (
            data.first_name.trim() !== '' &&
            data.last_name.trim() !== '' &&
            ['male', 'female'].includes(data.gender) && // Gender is required
            dob !== null && dob < today && // Date of birth is required and must be in the past
            start !== null && start >= today &&
            data.phone_number.trim() !== '' && phoneRegex.test(data.phone_number) &&
            data.address.trim() !== ''
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isFormValid()) {
            alert('Please fill in all required fields correctly.');
            return;
        }

        console.log('Submitting data:', data);

        post('/students', {
            onSuccess: () => {
                console.log('Student created successfully');
                reset();
                setDateOfBirth(undefined);
                setStartDate(undefined);
                setFormErrors({});
            },
            onError: (errors) => {
                console.error('Form submission errors:', errors);
                setFormErrors(errors);
            },
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="cursor-pointer bg-gradient-to-r from-[#FF3CAC] via-[#784BA0] to-[#2B86C5] uppercase">
                    Create Student
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <form onSubmit={handleSubmit}>
                    <section className="space-y-2">
                        <Label htmlFor="first_name" className="text-primary-color-text dark:text-secondary-color-text text-base font-medium">
                            First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="first_name"
                            name="first_name"
                            value={data.first_name}
                            onChange={(e) => setData('first_name', e.target.value)}
                            placeholder="Enter First Name"
                            className="border-light-border-color dark:text-secondary-color-text dark:bg-khotixs-background-dark rounded-[6px] p-2 text-lg placeholder:text-gray-300 dark:border dark:border-white"
                        />
                        {formErrors.first_name && <span className="text-red-500 text-sm">{formErrors.first_name}</span>}
                    </section>

                    <section className="space-y-2">
                        <Label htmlFor="last_name" className="text-primary-color-text dark:text-secondary-color-text text-base font-medium">
                            Last Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="last_name"
                            name="last_name"
                            value={data.last_name}
                            onChange={(e) => setData('last_name', e.target.value)}
                            placeholder="Enter Last Name"
                            className="border-light-border-color dark:text-secondary-color-text dark:bg-khotixs-background-dark rounded-[6px] p-2 text-lg placeholder:text-gray-300 dark:border dark:border-white"
                        />
                        {formErrors.last_name && <span className="text-red-500 text-sm">{formErrors.last_name}</span>}
                    </section>

                    <section className="space-y-2">
                        <Label htmlFor="gender" className="text-primary-color-text dark:text-secondary-color-text text-base font-medium">
                            Gender <span className="text-red-500">*</span>
                        </Label>
                        <Select onValueChange={(value) => setData('gender', value)} value={data.gender}>
                            <SelectTrigger className="border-light-border-color rounded-[6px] border">
                                <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>
                            <SelectContent className="bg-khotixs-background-white rounded-[6px]">
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                        </Select>
                        {formErrors.gender && <span className="text-red-500 text-sm">{formErrors.gender}</span>}
                    </section>

                    <section className="space-y-2">
                        <Label className="text-primary-color-text dark:text-secondary-color-text text-base font-medium">
                            Date of Birth <span className="text-red-500">*</span>
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={'outline'}
                                    className={cn('w-full justify-start text-left font-normal', !dateOfBirth && 'text-muted-foreground')}
                                >
                                    <CalendarIcon />
                                    {dateOfBirth ? format(dateOfBirth, 'PPP') : <span>Pick a date of birth</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={dateOfBirth}
                                    onSelect={(date) => setDateOfBirth(date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        {formErrors.date_of_birth && <span className="text-red-500 text-sm">{formErrors.date_of_birth}</span>}
                    </section>

                    <section className="space-y-2">
                        <Label className="text-primary-color-text dark:text-secondary-color-text text-base font-medium">
                            Start Date <span className="text-red-500">*</span>
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={'outline'}
                                    className={cn('w-full justify-start text-left font-normal', !startDate && 'text-muted-foreground')}
                                >
                                    <CalendarIcon />
                                    {startDate ? format(startDate, 'PPP') : <span>Pick a start date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={startDate}
                                    onSelect={(date) => setStartDate(date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        {formErrors.start_date && <span className="text-red-500 text-sm">{formErrors.start_date}</span>}
                    </section>

                    <section className="space-y-2">
                        <Label htmlFor="phone_number" className="text-primary-color-text dark:text-secondary-color-text text-base font-medium">
                            Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="phone_number"
                            name="phone_number"
                            value={data.phone_number}
                            onChange={(e) => setData('phone_number', e.target.value)}
                            placeholder="Enter Phone Number"
                            className="border-light-border-color dark:text-secondary-color-text dark:bg-khotixs-background-dark rounded-[6px] p-2 text-lg placeholder:text-gray-300 dark:border dark:border-white"
                        />
                        {formErrors.phone_number && <span className="text-red-500 text-sm">{formErrors.phone_number}</span>}
                    </section>

                    <section className="space-y-2">
                        <Label htmlFor="address" className="text-primary-color-text dark:text-secondary-color-text text-base font-medium">
                            Address <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="address"
                            name="address"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            placeholder="Enter Address"
                            className="border-light-border-color dark:text-secondary-color-text dark:bg-khotixs-background-dark w-full rounded-[6px] p-2 text-lg placeholder:text-gray-300 dark:border dark:border-white"
                        />
                        {formErrors.address && <span className="text-red-500 text-sm">{formErrors.address}</span>}
                    </section>

                    {formErrors.error && <span className="text-red-500 text-sm block mt-2">{formErrors.error}</span>}

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction type="submit" disabled={processing || !isFormValid()}>
                            Create
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
