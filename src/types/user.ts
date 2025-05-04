
export interface ProfileUpdate {
    name:string,
    phone:string,
    email:string,
    profile?: string;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
    };
}

export interface userData {
    name:string,
    phone:string,
    email:string,
    profile?: string;
    address: {
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
    };
}