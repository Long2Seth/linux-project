import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { StudentRegisterFormData } from '@/types/StudentType';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { LuUpload } from 'react-icons/lu';
import { useForm } from '@inertiajs/react';
import { InputField } from '@/components/InputField';

export function CreateFormStudent() {

    const { data, setData, post, processing, reset } = useForm<StudentRegisterFormData>({
        first_name: '',
        last_name: '',
        gender: '',
        date_of_birth: '',
        place_of_birth: '',
        phone_number: null,
        mother_name: '',
        father_name: '',
        date_of_birth_mother: '',
        date_of_birth_father: '',
        family_phone_number: '',
        profile_image: null,
        nationality: 'khmer',
        department_name: 'Information Technology',
        verified: false,
    });


    const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
    const [dateOfBirthMother, setDateOfBirthMother] = useState<Date | undefined>(undefined);
    const [dateOfBirthFather, setDateOfBirthFather] = useState<Date | undefined>(undefined);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [buttonLoading, setButtonLoading] = useState(false);
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (dateOfBirth) setData('date_of_birth', format(dateOfBirth, 'yyyy-MM-dd'));
    }, [dateOfBirth]);

    useEffect(() => {
        if (dateOfBirthMother) setData('date_of_birth_mother', format(dateOfBirthMother, 'yyyy-MM-dd'));
    }, [dateOfBirthMother]);

    useEffect(() => {
        if (dateOfBirthFather) setData('date_of_birth_father', format(dateOfBirthFather, 'yyyy-MM-dd'));
    }, [dateOfBirthFather]);

    const isFormValid = () => {
        const phoneRegex = /^[0-9]{8,20}$/;
        const today = new Date();
        const dob = dateOfBirth ? new Date(dateOfBirth) : null;
        const dobMother = dateOfBirthMother ? new Date(dateOfBirthMother) : null;
        const dobFather = dateOfBirthFather ? new Date(dateOfBirthFather) : null;

        return (
            data.first_name.trim() !== '' &&
            data.last_name.trim() !== '' &&
            ['Male', 'Female'].includes(data.gender) &&
            dob !== null &&
            dob < today &&
            data.place_of_birth.trim() !== '' &&
            data.mother_name.trim() !== '' &&
            data.father_name.trim() !== '' &&
            dobMother !== null &&
            dobMother < today &&
            dobFather !== null &&
            dobFather < today &&
            data.family_phone_number.trim() !== '' &&
            phoneRegex.test(data.family_phone_number) &&
            data.profile_image !== null &&
            data.profile_image.size <= 2048 * 1024 &&
            ['image/jpeg', 'image/png', 'image/jpg'].includes(data.profile_image.type) &&
            data.nationality.trim() !== '' &&
            data.department_name.trim() !== ''
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isFormValid()) {
            alert('Please fill in all required fields correctly.');
            return;
        }

        setButtonLoading(true);

        post('/register-student', {
            forceFormData: true,
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                reset();
                setDateOfBirth(undefined);
                setDateOfBirthMother(undefined);
                setDateOfBirthFather(undefined);
                setThumbnail(null);
                setFormErrors({});
                setButtonLoading(false);
                alert(page.props.success || 'Student registration successful!');
            },
            onError: (errors) => {
                console.log('onError triggered', errors);
                setFormErrors(errors);
                setButtonLoading(false);
            },
            onFinish: () => {
                console.log('onFinish triggered, Processing:', processing);
                setButtonLoading(false);
            },
        });
    };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2048 * 1024) {
                setFormErrors({ ...formErrors, profile_image: 'The profile image must not exceed 2MB.' });
                return;
            }
            if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
                setFormErrors({ ...formErrors, profile_image: 'The profile image must be a JPEG, PNG, or JPG file.' });
                return;
            }
            setData('profile_image', file);
            const imageUrl = URL.createObjectURL(file);
            setThumbnail(imageUrl);
            setFormErrors({ ...formErrors, profile_image: '' });
        }
    };

    const handleSectionClick = () => fileInputRef.current?.click();

    return (
        <section className={` w-full `}>
            <form onSubmit={handleSubmit}>
                <section className="flex flex-col w-full">
                    <section className="flex w-full gap-5">
                        <section className="w-full text-start space-y-2">
                            <InputField
                                id="first_name"
                                label="First Name"
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                placeholder="Enter First Name"
                                error={formErrors.first_name}
                            />
                            <InputField
                                id="last_name"
                                label="Last Name"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                placeholder="Enter Last Name"
                                error={formErrors.last_name}
                            />
                            <section className="space-y-2">
                                <label htmlFor="gender" className="block text-lg font-normal">
                                    Gender <span className="text-red-500">*</span>
                                </label>
                                <Select onValueChange={(value) => setData('gender', value)} value={data.gender}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                    </SelectContent>
                                </Select>
                                {formErrors.gender && <span className="text-sm text-red-500">{formErrors.gender}</span>}
                            </section>
                            <section className="space-y-2">
                                <label className="block text-lg font-normal">
                                    Date of Birth <span className="text-red-500">*</span>
                                </label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                'w-full justify-start text-left font-normal h-12',
                                                !dateOfBirth && 'text-muted-foreground'
                                            )}
                                        >
                                            <CalendarIcon />
                                            {dateOfBirth ? format(dateOfBirth, 'PPP') : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={dateOfBirth} onSelect={setDateOfBirth} initialFocus />
                                    </PopoverContent>
                                </Popover>
                                {formErrors.date_of_birth && (
                                    <span className="text-sm text-red-500">{formErrors.date_of_birth}</span>
                                )}
                            </section>
                            <InputField
                                id="place_of_birth"
                                label="Place of Birth"
                                value={data.place_of_birth}
                                onChange={(e) => setData('place_of_birth', e.target.value)}
                                placeholder="Enter Place of Birth"
                                error={formErrors.place_of_birth}
                            />
                            <InputField
                                id="nationality"
                                label="Nationality"
                                value={data.nationality}
                                onChange={(e) => setData('nationality', e.target.value)}
                                placeholder="Enter Nationality"
                                error={formErrors.nationality}
                            />
                            <InputField
                                id="phone_number"
                                label="Phone Number"
                                value={data.phone_number || ''}
                                onChange={(e) => setData('phone_number', e.target.value || null)}
                                placeholder="Enter Phone Number"
                                error={formErrors.phone_number}
                            />
                            <InputField
                                id="family_phone_number"
                                label="Parents Phone Number"
                                value={data.family_phone_number}
                                onChange={(e) => setData('family_phone_number', e.target.value)}
                                placeholder="Enter Family Phone Number"
                                error={formErrors.family_phone_number}
                            />
                        </section>
                        <section className="w-full pt-10">
                            <section
                                className="h-full w-full rounded-[6px] border border-dashed border-gray-400 cursor-pointer"
                                onClick={handleSectionClick}
                            >
                                <div className="flex h-full w-full flex-col items-center justify-center">
                                    {thumbnail ? (
                                        <img
                                            src={thumbnail}
                                            alt="Uploaded"
                                            className="h-full w-full rounded-[6px] object-cover"
                                        />
                                    ) : (
                                        <>
                                            <LuUpload className="h-[50px] w-[50px] text-gray-400" />
                                            <p className="text-gray-400 text-xl font-normal">
                                                Drop file here or click to upload
                                            </p>
                                        </>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    accept="image/jpeg,image/png,image/jpg"
                                />
                            </section>
                            {formErrors.profile_image && (
                                <span className="text-sm text-red-500">{formErrors.profile_image}</span>
                            )}
                        </section>
                    </section>
                    <section className="flex w-full gap-5">
                        <section className="w-full text-start space-y-2">
                            <InputField
                                id="mother_name"
                                label="Mother's Name"
                                value={data.mother_name}
                                onChange={(e) => setData('mother_name', e.target.value)}
                                placeholder="Enter Mother's Name"
                                error={formErrors.mother_name}
                            />
                            <section className="space-y-2">
                                <label className="block text-lg font-normal">
                                    Mother's Date of Birth <span className="text-red-500">*</span>
                                </label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                'w-full justify-start text-left font-normal h-12',
                                                !dateOfBirthMother && 'text-muted-foreground'
                                            )}
                                        >
                                            <CalendarIcon />
                                            {dateOfBirthMother ? format(dateOfBirthMother, 'PPP') : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={dateOfBirthMother}
                                            onSelect={setDateOfBirthMother}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                {formErrors.date_of_birth_mother && (
                                    <span className="text-sm text-red-500">{formErrors.date_of_birth_mother}</span>
                                )}
                            </section>
                        </section>
                        <section className="w-full text-start space-y-2">
                            <InputField
                                id="father_name"
                                label="Father's Name"
                                value={data.father_name}
                                onChange={(e) => setData('father_name', e.target.value)}
                                placeholder="Enter Father's Name"
                                error={formErrors.father_name}
                            />
                            <section className="space-y-2">
                                <label className="block text-lg font-normal">
                                    Father's Date of Birth <span className="text-red-500">*</span>
                                </label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                'w-full justify-start text-left font-normal h-12',
                                                !dateOfBirthFather && 'text-muted-foreground'
                                            )}
                                        >
                                            <CalendarIcon />
                                            {dateOfBirthFather ? format(dateOfBirthFather, 'PPP') : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={dateOfBirthFather}
                                            onSelect={setDateOfBirthFather}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                {formErrors.date_of_birth_father && (
                                    <span className="text-sm text-red-500">{formErrors.date_of_birth_father}</span>
                                )}
                            </section>
                        </section>
                    </section>
                </section>

                {formErrors.message && <span className="mt-2 block text-sm text-red-500">{formErrors.message}</span>}

                <div className="mt-4 flex w-full justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={() => reset()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={processing || buttonLoading || !isFormValid()}>
                        {buttonLoading || processing ? 'Registering...' : 'Register'}
                    </Button>
                </div>
            </form>
        </section>
    );
}

export default CreateFormStudent;
