import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Trims text to a specified length and adds ellipsis if needed
 * @param text The text to trim
 * @param maxLength Maximum length before trimming (default: 150)
 * @returns Trimmed text with ellipsis if needed
 */

export const trimText = (text: string, maxLength: number = 150): string => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};
