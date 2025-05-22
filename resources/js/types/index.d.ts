import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
    quizzes?: Quiz[];
    quiz?: Quiz;
    question?: Question;
    quiz_progress?: QuizProgress;
    corrent_answer?: string;
    answer_feedback?: boolean;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Quiz {
  id: number;
  title: string;
  icon: string;
  color: string;
  created_at: string,
  updated_at: string
};

export interface Question {
    id: number;
    body: string;
    options: string[]
}

export interface QuizProgress {
    completed: number;
    current_index: number;
    current_question: Question;
    percent: string;
    total: number;
}