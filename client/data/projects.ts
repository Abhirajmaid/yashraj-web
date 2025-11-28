export type Project = {
    id: string;
    title: string;
    description: string[];
    mainImage?: string;
    mainImageAlt?: string;
    secondaryImages?: {
        src: string;
        alt: string;
    }[];
    essentials: string[];
    gallery?: {
        src: string;
        alt: string;
    }[];
};

export const projects: Project[] = [];

