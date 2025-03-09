export type StudentType = {
    id: string;
    slug: string;
    first_name: string;
    last_name: string;
    gender: string;
    date_of_birth: string;
    address: string;
    start_date: string;
    end_date: string;
    department_name: string;
    phone_number: string;
    email: string;
    status: boolean;
    is_graduate: boolean;
    is_deleted: boolean;
};

export type StudentFormData = {
    first_name: string;
    last_name: string;
    gender: string;
    date_of_birth: string;
    start_date: string;
    phone_number: string;
    address: string;
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

