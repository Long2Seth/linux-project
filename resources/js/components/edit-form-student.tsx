import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useEffect } from 'react';
import { EditStudentType } from '@/types/StudentType';

type EditFormStudentProps = {
    id: string;
    isOpen: boolean;
    onClose: () => void;
};

// Define the form data type

export function EditFormStudent({ id, isOpen, onClose }: EditFormStudentProps) {
    const { data, setData, patch, errors, processing, reset, setError } = useForm<EditStudentType>({
        first_name: '',
        last_name: '',
        gender: '',
        date_of_birth: '',
        start_date: '',
        end_date: '',
        phone_number: '',
        address: '',
    });

    // Fetch student data when dialog opens
    useEffect(() => {
        if (isOpen) {
            fetch(`/students/${id}`, {
                headers: {
                    'Accept': 'application/json',
                },
            })
                .then(response => response.json())
                .then(studentData => {
                    if (studentData.student) {
                        setData({
                            first_name: studentData.student.first_name || '',
                            last_name: studentData.student.last_name || '',
                            gender: studentData.student.gender || '',
                            date_of_birth: studentData.student.date_of_birth || '',
                            start_date: studentData.student.start_date || '',
                            end_date: studentData.student.end_date || '',
                            phone_number: studentData.student.phone_number || '',
                            address: studentData.student.address || '',
                        });
                    }
                })
                .catch(error => {
                    console.error('Failed to fetch student:', error);
                    // Use a known field name or custom error key
                    setError('first_name', 'Failed to load student data');
                });
        }
    }, [isOpen, id, setData, setError]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        patch(`/students/${id}`, {
            // Remove 'data' property since useForm already handles it
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                onClose();
                reset();
            },
            onError: (errors) => {
                console.error('Update failed:', errors);
            },
        });
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <section className="space-y-2">
                        <Label htmlFor="first_name">First Name <span className="text-red-500">*</span></Label>
                        <Input
                            id="first_name"
                            value={data.first_name}
                            onChange={(e) => setData('first_name', e.target.value)}
                            required
                        />
                        {errors.first_name && <span className="text-sm text-red-500">{errors.first_name}</span>}
                    </section>

                    <section className="space-y-2">
                        <Label htmlFor="last_name">Last Name <span className="text-red-500">*</span></Label>
                        <Input
                            id="last_name"
                            value={data.last_name}
                            onChange={(e) => setData('last_name', e.target.value)}
                            required
                        />
                        {errors.last_name && <span className="text-sm text-red-500">{errors.last_name}</span>}
                    </section>

                    <section className="space-y-2">
                        <Label htmlFor="gender">Gender <span className="text-red-500">*</span></Label>
                        <Select onValueChange={(value) => setData('gender', value)} value={data.gender}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.gender && <span className="text-sm text-red-500">{errors.gender}</span>}
                    </section>

                    <section className="space-y-2">
                        <Label htmlFor="phone_number">Phone Number <span className="text-red-500">*</span></Label>
                        <Input
                            id="phone_number"
                            value={data.phone_number}
                            onChange={(e) => setData('phone_number', e.target.value)}
                            required
                        />
                        {errors.phone_number && <span className="text-sm text-red-500">{errors.phone_number}</span>}
                    </section>

                    <section className="space-y-2">
                        <Label>Date of Birth <span className="text-red-500">*</span></Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn('w-full justify-start text-left font-normal', !data.date_of_birth && 'text-muted-foreground')}
                                >
                                    <CalendarIcon />
                                    {data.date_of_birth ? format(new Date(data.date_of_birth), 'PPP') : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Calendar
                                    mode="single"
                                    selected={data.date_of_birth ? new Date(data.date_of_birth) : undefined}
                                    onSelect={(date) => date && setData('date_of_birth', format(date, 'yyyy-MM-dd'))}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        {errors.date_of_birth && <span className="text-sm text-red-500">{errors.date_of_birth}</span>}
                    </section>

                    <section className="space-y-2">
                        <Label>Start Date <span className="text-red-500">*</span></Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn('w-full justify-start text-left font-normal', !data.start_date && 'text-muted-foreground')}
                                >
                                    <CalendarIcon />
                                    {data.start_date ? format(new Date(data.start_date), 'PPP') : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Calendar
                                    mode="single"
                                    selected={data.start_date ? new Date(data.start_date) : undefined}
                                    onSelect={(date) => date && setData('start_date', format(date, 'yyyy-MM-dd'))}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        {errors.start_date && <span className="text-sm text-red-500">{errors.start_date}</span>}
                    </section>

                    <section className="space-y-2">
                        <Label>End Date <span className="text-red-500">*</span></Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn('w-full justify-start text-left font-normal', !data.end_date && 'text-muted-foreground')}
                                >
                                    <CalendarIcon />
                                    {data.end_date ? format(new Date(data.end_date), 'PPP') : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Calendar
                                    mode="single"
                                    selected={data.end_date ? new Date(data.end_date) : undefined}
                                    onSelect={(date) => date && setData('end_date', format(date, 'yyyy-MM-dd'))}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        {errors.end_date && <span className="text-sm text-red-500">{errors.end_date}</span>}
                    </section>

                    <section className="space-y-2">
                        <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
                        <Textarea
                            id="address"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            required
                        />
                        {errors.address && <span className="text-sm text-red-500">{errors.address}</span>}
                    </section>

                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => { onClose(); reset(); }}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction type="submit" disabled={processing}>
                            {processing ? 'Updating...' : 'Update'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
