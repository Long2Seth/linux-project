import { InputField } from '@/components/InputField';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { StudentRegisterFormData } from '@/types/StudentType';
import { useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { LuUpload } from 'react-icons/lu';

export function CreateFormStudent() {
    const { data, setData, post, processing, reset, errors } = useForm<StudentRegisterFormData>({
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
        nationality: 'Khmer',
        department_name: 'Information Technology',
        verified: false,
    });

    const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
    const [dateOfBirthMother, setDateOfBirthMother] = useState<Date | undefined>(undefined);
    const [dateOfBirthFather, setDateOfBirthFather] = useState<Date | undefined>(undefined);
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
        const phoneRegex = /^[+]?[0-9]{8,15}$/;
        const today = new Date();
        const dob = dateOfBirth ? new Date(dateOfBirth) : null;
        const dobMother = dateOfBirthMother ? new Date(dateOfBirthMother) : null;
        const dobFather = dateOfBirthFather ? new Date(dateOfBirthFather) : null;

        return (
            data.first_name.trim().length > 0 &&
            data.first_name.length <= 255 &&
            data.last_name.trim().length > 0 &&
            data.last_name.length <= 255 &&
            ['Male', 'Female'].includes(data.gender) &&
            dob !== null &&
            dob < today &&
            data.place_of_birth.trim().length > 0 &&
            data.place_of_birth.length <= 255 &&
            data.nationality.trim().length > 0 &&
            data.nationality.length <= 255 &&
            data.mother_name.trim().length > 0 &&
            data.mother_name.length <= 255 &&
            data.father_name.trim().length > 0 &&
            data.father_name.length <= 255 &&
            dobMother !== null &&
            dobMother < today &&
            dobFather !== null &&
            dobFather < today &&
            data.family_phone_number.trim().length > 0 &&
            data.family_phone_number.length <= 20 &&
            phoneRegex.test(data.family_phone_number) &&
            (!data.phone_number || (data.phone_number.length <= 20 && phoneRegex.test(data.phone_number))) &&
            data.department_name.trim().length > 0 &&
            data.department_name.length <= 255 &&
            (data.profile_image === null ||
                (data.profile_image.size <= 2048 * 1024 && ['image/jpeg', 'image/png', 'image/jpg'].includes(data.profile_image.type)))
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        if (!isFormValid()) {
            alert('Please fill in all required fields correctly.');
            return;
        }

        post('/register-student', {
            forceFormData: true,
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setDateOfBirth(undefined);
                setDateOfBirthMother(undefined);
                setDateOfBirthFather(undefined);
                setThumbnail(null);
            },
            onError: (formErrors) => {
                console.error('Registration errors:', formErrors);
            },
            onFinish: () => {},
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2048 * 1024) {
                alert('The profile image must not exceed 2MB.');
                return;
            }
            if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
                alert('The profile image must be a JPEG, PNG, or JPG file.');
                return;
            }
            setData('profile_image', file);
            const imageUrl = URL.createObjectURL(file);
            setThumbnail(imageUrl);
        }
    };

    const handleSectionClick = () => fileInputRef.current?.click();

    return (
        <section className="w-full">
            <form onSubmit={handleSubmit}>
                <section className="flex w-full flex-col">
                    <section className="flex w-full gap-5">
                        <section className="w-full space-y-2 text-start">
                            <InputField
                                id="first_name"
                                label="First Name"
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                placeholder="Enter First Name"
                                error={errors.first_name}
                            />
                            <InputField
                                id="last_name"
                                label="Last Name"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                placeholder="Enter Last Name"
                                error={errors.last_name}
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
                                {errors.gender && <span className="text-sm text-red-500">{errors.gender}</span>}
                            </section>
                            <section className="space-y-2">
                                <label className="block text-lg font-normal">
                                    Date of Birth <span className="text-red-500">*</span>
                                </label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn('h-12 w-full justify-start text-left font-normal', !dateOfBirth && 'text-muted-foreground')}
                                        >
                                            <CalendarIcon />
                                            {dateOfBirth ? format(dateOfBirth, 'PPP') : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={dateOfBirth} onSelect={setDateOfBirth} initialFocus />
                                    </PopoverContent>
                                </Popover>
                                {errors.date_of_birth && <span className="text-sm text-red-500">{errors.date_of_birth}</span>}
                            </section>
                            <InputField
                                id="place_of_birth"
                                label="Place of Birth"
                                value={data.place_of_birth}
                                onChange={(e) => setData('place_of_birth', e.target.value)}
                                placeholder="Enter Place of Birth"
                                error={errors.place_of_birth}
                            />
                            <InputField
                                id="nationality"
                                label="Nationality"
                                value={data.nationality}
                                onChange={(e) => setData('nationality', e.target.value)}
                                placeholder="Enter Nationality"
                                error={errors.nationality}
                            />
                            <InputField
                                id="phone_number"
                                label="Phone Number"
                                value={data.phone_number || ''}
                                onChange={(e) => setData('phone_number', e.target.value || null)}
                                placeholder="Enter Phone Number"
                                error={errors.phone_number}
                            />
                            <InputField
                                id="family_phone_number"
                                label="Parents Phone Number"
                                value={data.family_phone_number}
                                onChange={(e) => setData('family_phone_number', e.target.value)}
                                placeholder="Enter Family Phone Number"
                                error={errors.family_phone_number}
                            />
                        </section>
                        <section className="w-full pt-10">
                            <section
                                className="h-full w-full cursor-pointer rounded-[6px] border border-dashed border-gray-400"
                                onClick={handleSectionClick}
                            >
                                <div className="flex h-full w-full flex-col items-center justify-center">
                                    {thumbnail ? (
                                        <img src={thumbnail} alt="Uploaded" className="h-full w-full rounded-[6px] object-cover" />
                                    ) : (
                                        <>
                                            <LuUpload className="h-[50px] w-[50px] text-gray-400" />
                                            <p className="text-xl font-normal text-gray-400">Drop file here or click to upload</p>
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
                            {errors.profile_image && <span className="text-sm text-red-500">{errors.profile_image}</span>}
                        </section>
                    </section>
                    <section className="flex w-full gap-5">
                        <section className="w-full space-y-2 text-start">
                            <InputField
                                id="mother_name"
                                label="Mother's Name"
                                value={data.mother_name}
                                onChange={(e) => setData('mother_name', e.target.value)}
                                placeholder="Enter Mother's Name"
                                error={errors.mother_name}
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
                                                'h-12 w-full justify-start text-left font-normal',
                                                !dateOfBirthMother && 'text-muted-foreground',
                                            )}
                                        >
                                            <CalendarIcon />
                                            {dateOfBirthMother ? format(dateOfBirthMother, 'PPP') : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={dateOfBirthMother} onSelect={setDateOfBirthMother} initialFocus />
                                    </PopoverContent>
                                </Popover>
                                {errors.date_of_birth_mother && <span className="text-sm text-red-500">{errors.date_of_birth_mother}</span>}
                            </section>
                        </section>
                        <section className="w-full space-y-2 text-start">
                            <InputField
                                id="father_name"
                                label="Father's Name"
                                value={data.father_name}
                                onChange={(e) => setData('father_name', e.target.value)}
                                placeholder="Enter Father's Name"
                                error={errors.father_name}
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
                                                'h-12 w-full justify-start text-left font-normal',
                                                !dateOfBirthFather && 'text-muted-foreground',
                                            )}
                                        >
                                            <CalendarIcon />
                                            {dateOfBirthFather ? format(dateOfBirthFather, 'PPP') : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={dateOfBirthFather} onSelect={setDateOfBirthFather} initialFocus />
                                    </PopoverContent>
                                </Popover>
                                {errors.date_of_birth_father && <span className="text-sm text-red-500">{errors.date_of_birth_father}</span>}
                            </section>
                        </section>
                    </section>
                </section>

                {/*{errors.message && <span className="mt-2 block text-sm text-red-500">{errors.message}</span>}*/}

                <div className="mt-4 flex w-full justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={() => reset()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={processing || !isFormValid()}>
                        {processing ? 'Registering...' : 'Register'}
                    </Button>
                </div>
            </form>
        </section>
    );
}

export default CreateFormStudent;
