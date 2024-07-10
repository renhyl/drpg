import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Tailwind clsx and twMerge utility for convient class override and conditional classes
 *
 * example use: <div className={cn('bg-black', { 'hidden': 1 === 1 })}
 * @param inputs
 * @returns
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
