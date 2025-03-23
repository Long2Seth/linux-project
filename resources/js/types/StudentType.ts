export interface StudentType {
    id: number;
    slug: string;
    first_name: string;
    last_name: string;
    gender: string;
    date_of_birth: string;
    address?: string | null;
    start_date: string;
    end_date?: string | null;
    department_name: string;
    phone_number?: string | null;
    email: string;
    status: boolean;
    is_graduate: boolean;
    is_deleted: boolean;
}



export type StudentFormData = {
    first_name: string;
    last_name: string;
    gender: string;
    date_of_birth: string;
    start_date: string;
    phone_number: string;
    address: string;
};


export type StudentRegisterFormData = {
    first_name: string;
    last_name: string;
    gender: string;
    date_of_birth: string;
    place_of_birth: string;
    phone_number: string | null; // Nullable in backend
    mother_name: string;
    father_name: string;
    date_of_birth_mother: string;
    date_of_birth_father: string;
    family_phone_number: string;
    profile_image: File | null;
    nationality: string; // Added from backend
    department_name: string; // Added from backend
    verified?: boolean; // Added from backend, optional as it defaults in backend
    slug?: string;
};


export type EditStudentType = {
    first_name: string;
    last_name: string;
    gender: string;
    date_of_birth: string;
    start_date: string;
    end_date: string;
    phone_number: string;
    address: string;
};


export type StudentPageProps = {
    student: EditStudentType;
    errors?: Record<string, string>;
    flash?: {
        success?: string;
        error?: string;
    };
};

