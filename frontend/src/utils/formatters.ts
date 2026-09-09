/**
 * UTIS Localization and Number/Date Formatting Utilities
 * Supports English (en-IN) and Hindi (hi-IN) locale standards
 */

import { Language } from '../types';

const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

export function toDevanagariNumerals(input: number | string): string {
  return String(input).replace(/[0-9]/g, (digit) => devanagariDigits[parseInt(digit, 10)]);
}

/**
 * Format numeric values respecting selected Indian locale
 * @param value Number to format
 * @param lang Language code ('en' | 'hi' | 'mr')
 * @param useHindiDigits If true and lang is 'hi', converts digits to Devanagari (०-९)
 */
export function formatNumber(
  value: number,
  lang: Language = 'en',
  useHindiDigits: boolean = false
): string {
  if (value === null || value === undefined || isNaN(value)) return '0';

  const locale = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN';
  const formatted = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 1
  }).format(value);

  if (lang === 'hi' && useHindiDigits) {
    return toDevanagariNumerals(formatted);
  }
  return formatted;
}

/**
 * Format percentages respecting selected locale
 */
export function formatPercent(
  value: number,
  lang: Language = 'en',
  useHindiDigits: boolean = false
): string {
  const formatted = `${formatNumber(value, lang, useHindiDigits)}%`;
  return formatted;
}

/**
 * Format dates respecting selected Indian locale
 */
export function formatDate(
  dateInput: Date | string | number,
  lang: Language = 'en'
): string {
  const date = typeof dateInput === 'string' || typeof dateInput === 'number' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return '';

  const locale = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN';
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date);
}

/**
 * Format time respecting selected Indian locale
 */
export function formatTime(
  dateInput: Date | string | number,
  lang: Language = 'en'
): string {
  const date = typeof dateInput === 'string' || typeof dateInput === 'number' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return '';

  const locale = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN';
  const timeStr = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(date);

  return lang === 'hi' ? `${timeStr} भा.मा.स.` : `${timeStr} IST`;
}

/**
 * Format currency in Indian Rupees (INR)
 */
export function formatCurrency(
  value: number,
  lang: Language = 'en'
): string {
  const locale = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
}
