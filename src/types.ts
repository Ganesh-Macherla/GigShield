export interface Worker {
  id: string;
  name: string;
  partnerId: string;
  zone: string;
  status: 'active' | 'idle' | 'payout_pending' | 'paid';
  lastLocation: { lat: number; lng: number };
  upiId: string;
}

export interface Payout {
  id: string;
  workerId: string;
  workerName: string;
  amount: number;
  timestamp: string;
  trigger: string;
  status: 'completed' | 'processing';
  transactionId: string;
}

export interface ZoneData {
  name: string;
  rainfall: number; // mm/hr
  threshold: number;
  activeWorkers: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export const BENGALURU_ZONES: ZoneData[] = [
  { name: 'Koramangala', rainfall: 2.4, threshold: 15, activeWorkers: 142, riskLevel: 'low' },
  { name: 'Indiranagar', rainfall: 1.8, threshold: 15, activeWorkers: 98, riskLevel: 'low' },
  { name: 'HSR Layout', rainfall: 12.5, threshold: 15, activeWorkers: 215, riskLevel: 'medium' },
  { name: 'Whitefield', rainfall: 4.2, threshold: 15, activeWorkers: 167, riskLevel: 'low' },
  { name: 'Electronic City', rainfall: 0.5, threshold: 15, activeWorkers: 84, riskLevel: 'low' },
];
