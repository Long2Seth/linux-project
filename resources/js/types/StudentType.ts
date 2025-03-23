
export interface StudentType {
    id: number;
    slug: string;
    profile_image: string | null;
    first_name: string;
    last_name: string;
    gender: string;
    date_of_birth: string;
    nationality: string;
    place_of_birth: string;
    address: string | null;
    start_date: string;
    end_date: string | null;
    department_name: string;
    phone_number: string | null;
    email: string;
    mother_name: string;
    father_name: string;
    date_of_birth_mother: string;
    date_of_birth_father: string;
    family_phone_number: string;
    is_status: boolean;  // Updated from 'status' to 'is_status'
    is_graduate: boolean;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
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
    phone_number: string | null;
    mother_name: string;
    father_name: string;
    date_of_birth_mother: string;
    date_of_birth_father: string;
    family_phone_number: string;
    profile_image: File | null;
    nationality: string;
    department_name: string;
    verified?: boolean;
    slug?: string;
};

export type StudentRegisterType = {
    id : string;
    first_name: string;
    last_name: string;
    gender: string;
    date_of_birth: string;
    place_of_birth: string;
    phone_number: string | null;
    mother_name: string;
    father_name: string;
    date_of_birth_mother: string;
    date_of_birth_father: string;
    family_phone_number: string;
    profile_image: File | null;
    nationality: string;
    department_name: string;
    verified: boolean;
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

