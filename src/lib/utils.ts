import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to combine and merge Tailwind CSS class names safely.
 * Prevents class conflicts (e.g. padding or color overlaps).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a unique ID string for new appointments or medicine reminders.
 */
export function generateId(): string {
  return 'arg_' + Math.random().toString(36).substring(2, 9);
}

/**
 * Format ISO date string into readable human date (e.g., "Oct 24, 2026").
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format current time string (e.g., "10:45 AM").
 */
export function getCurrentTime(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
