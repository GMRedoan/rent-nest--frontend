import { LucideIcon } from "lucide-react";

export interface Service {
    number: string;
    title: string;
    description: string;
    icon: LucideIcon;
    tag: string;
    href?: string;
}
