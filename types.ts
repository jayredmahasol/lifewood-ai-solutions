import { ReactNode } from 'react';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface StatItem {
  id: number;
  title: string;
  content: string;
  bgColor: string; // Tailwind class or hex
  textColor: string;
}

export interface ServiceCardProps {
  title: string;
  image: string;
  description?: string;
}

export interface ClientLogo {
  name: string;
  url: string;
}
