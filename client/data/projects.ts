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
    /** All images from backend in one list (no primary/lifestyle/city distinction). Used for detail page. */
    allImages?: { src: string; alt: string }[];
    /** Category for pill label on cards (e.g. from backend). */
    category?: string;
};

export const projects: Project[] = [];

