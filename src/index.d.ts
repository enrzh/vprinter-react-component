import type { ReactNode, ReactElement } from 'react';

export type PrinterPhase = 'ready' | 'printing' | 'printed' | 'tearing';

export interface ReceiptItem {
  id?: string | number;
  name: string;
  quantity: number;
  unitAmount: number;
}

export interface ReceiptData {
  merchant: {
    name: string;
    address: string[];
    phone?: string;
  };
  orderId: string | number;
  issuedAt: string;
  timeZone: string;
  locale: string;
  currency: string;
  items: ReceiptItem[];
  taxBasisPoints: number;
  payment: {
    method: string;
    last4?: string;
    authorization: string;
  };
  footer: string;
}

export interface TicketItem {
  id?: string | number;
  name?: string;
  label?: string;
  quantity?: number | string;
  amount?: string | number;
  total?: string | number;
  price?: string | number;
}

export interface TicketData {
  title?: string;
  subtitle?: string;
  lines?: Array<string | number>;
  items?: TicketItem[];
  rows?: TicketItem[];
  total?: string | number;
  footer?: string;
}

export interface NormalizedTicket {
  title: string;
  subtitle: string;
  lines: Array<{ id: number; text: string }>;
  items: Array<{ id: string | number; label: string; amount: string }>;
  total: string;
  footer: string;
}

export interface VirtualPrinterProps {
  receipt?: ReceiptData;
  content?: string;
  ticket?: TicketData;
  logo?: ReactNode;
  initiallyPrinted?: boolean;
  orientation?: 'front' | 'up';
  scrollable?: boolean;
  paperMaxHeight?: string | number;
  resetKey?: string | number;
  className?: string;
  onPhaseChange?: (phase: PrinterPhase) => void;
  onPrintStart?: () => void;
  onPrinted?: () => void;
  onTear?: () => void;
}

export declare function VirtualPrinter(props: VirtualPrinterProps): ReactElement;
export declare const cafeReceipt: ReceiptData;
export declare const quickTicketExample: TicketData;
export declare const printerInputExamples: Record<string, string>;
export declare function calculateTotals(items: ReceiptItem[], taxBasisPoints: number): { subtotal: number; tax: number; total: number };
export declare function formatOrderDate(issuedAt: string, locale: string, timeZone: string): string;
export declare function moneyFormatter(locale: string, currency: string): (minorUnits: number) => string;
export declare function normalizePrinterMarkup(input: string): string;
export declare function parsePrinterMarkup(input: string): unknown[];
export declare function normalizeTicket(input: TicketData): NormalizedTicket;
export declare const SUPPORTED_PRINTER_TAGS: readonly string[];
