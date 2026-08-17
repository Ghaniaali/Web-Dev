import { Injectable, signal} from '@angular/core';

export interface Clients {
  id:               number;
  name:             string;
  avatar:           string;
  goal:             string;
  calories:         number;
  adherence:        number;
  status:           string;
  statusColor:      string;
  lastCheckin:      string;
  weight:           number;
  weightUnit:       string;
  sessions:         number;
  streak:           number;
  restrictions:     string[];
  email:            string;
  phone:            string;
  notes:            string;
  weeklyAdherence:  number[];
  weeklyWeight:     number[];
  weeklySessions:   number[];
}

@Injectable({ providedIn: 'root' })
export class ClientService {

  private _clients = signal<Clients[]>([
    {
      id: 1, name: 'Sarah M.', avatar: 'SM',
      email: 'sarah.m@email.com', phone: '+1 555 0101', notes: 'Prefers morning sessions. Has lower back sensitivity.',
      goal: 'Weight Loss', calories: 1800,
      adherence: 92, status: 'On Track', statusColor: '#00E096',
      lastCheckin: 'Today, 9am', weight: 68, weightUnit: 'kg',
      sessions: 24, streak: 12, restrictions: ['Gluten-free'],
      weeklyAdherence: [65, 70, 72, 78, 82, 88, 90, 92],
      weeklyWeight:    [72, 71.5, 71, 70.5, 70, 69.5, 69, 68],
      weeklySessions:  [3, 4, 3, 4, 5, 4, 5, 5],
    },
    {
      id: 2, name: 'James K.', avatar: 'JK',
      email: 'james.k@email.com', phone: '+1 555 0102', notes: 'Missing sessions on Fridays consistently.',
      goal: 'Muscle Gain', calories: 2800,
      adherence: 67, status: 'At Risk', statusColor: '#FFD32A',
      lastCheckin: 'Yesterday', weight: 82, weightUnit: 'kg',
      sessions: 18, streak: 3, restrictions: ['Dairy-free'],
      weeklyAdherence: [55, 60, 58, 62, 65, 63, 67, 67],
      weeklyWeight:    [79, 79.5, 80, 80.5, 81, 81.5, 82, 82],
      weeklySessions:  [2, 3, 2, 3, 3, 3, 4, 3],
    },
    {
      id: 3, name: 'Priya S.', avatar: 'PS',
      email: 'priya.s@email.com', phone: '+1 555 0103', notes: 'Training for a half marathon in April.',
      goal: 'Endurance', calories: 2200,
      adherence: 88, status: 'On Track', statusColor: '#00E096',
      lastCheckin: 'Today, 7am', weight: 61, weightUnit: 'kg',
      sessions: 31, streak: 18, restrictions: ['Vegetarian'],
      weeklyAdherence: [70, 74, 76, 80, 82, 85, 87, 88],
      weeklyWeight:    [63, 62.5, 62, 61.8, 61.5, 61.2, 61, 61],
      weeklySessions:  [4, 4, 5, 4, 5, 5, 5, 4],
    },
    {
      id: 4, name: 'Tom R.', avatar: 'TR',
      email: 'tom.r@email.com', phone: '+1 555 0104', notes: 'Needs accountability check-ins every 2 days.',
      goal: 'Weight Loss', calories: 1600,
      adherence: 41, status: 'Off Track', statusColor: '#FF4757',
      lastCheckin: '3 days ago', weight: 94, weightUnit: 'kg',
      sessions: 9, streak: 0, restrictions: [],
      weeklyAdherence: [50, 45, 48, 42, 44, 40, 38, 41],
      weeklyWeight:    [96, 95.5, 95, 95, 94.8, 94.5, 94.2, 94],
      weeklySessions:  [2, 2, 1, 2, 1, 1, 1, 2],
    },
    {
      id: 5, name: 'Emma L.', avatar: 'EL',
      email: 'emma.l@email.com', phone: '+1 555 0105', notes: 'Top performer. Excellent consistency.',
      goal: 'Toning', calories: 1900,
      adherence: 95, status: 'On Track', statusColor: '#00E096',
      lastCheckin: 'Today, 11am', weight: 59, weightUnit: 'kg',
      sessions: 42, streak: 24, restrictions: ['Nut allergy'],
      weeklyAdherence: [80, 85, 88, 90, 92, 93, 95, 95],
      weeklyWeight:    [62, 61.5, 61, 60.5, 60, 59.5, 59.2, 59],
      weeklySessions:  [5, 5, 5, 6, 5, 6, 6, 5],
    },
    {
      id: 6, name: 'Marcus T.', avatar: 'MT',
      email: 'marcus.t@email.com', phone: '+1 555 0106', notes: 'Struggles with diet on weekends.',
      goal: 'Muscle Gain', calories: 3000,
      adherence: 73, status: 'At Risk', statusColor: '#FFD32A',
      lastCheckin: 'Yesterday', weight: 77, weightUnit: 'kg',
      sessions: 15, streak: 5, restrictions: [],
      weeklyAdherence: [60, 65, 63, 68, 70, 72, 71, 73],
      weeklyWeight:    [74, 74.5, 75, 75.5, 76, 76.5, 77, 77],
      weeklySessions:  [3, 3, 4, 3, 4, 4, 3, 4],
    },
    {
      id: 7, name: 'Aisha B.', avatar: 'AB',
      email: 'aisha.b@email.com', phone: '+1 555 0107', notes: 'Ramadan schedule affects training in March.',
      goal: 'Weight Loss', calories: 1750,
      adherence: 89, status: 'On Track', statusColor: '#00E096',
      lastCheckin: 'Today, 8am', weight: 72, weightUnit: 'kg',
      sessions: 28, streak: 15, restrictions: ['Halal'],
      weeklyAdherence: [68, 72, 75, 78, 82, 85, 87, 89],
      weeklyWeight:    [76, 75.5, 75, 74.5, 74, 73.5, 72.5, 72],
      weeklySessions:  [3, 4, 4, 4, 5, 4, 5, 4],
    },
    {
      id: 8, name: 'Connor W.', avatar: 'CW',
      email: 'connor.w@email.com', phone: '+1 555 0108', notes: 'Travel schedule disrupts routine.',
      goal: 'Endurance', calories: 2400,
      adherence: 55, status: 'At Risk', statusColor: '#FFD32A',
      lastCheckin: '2 days ago', weight: 80, weightUnit: 'kg',
      sessions: 11, streak: 2, restrictions: [],
      weeklyAdherence: [45, 50, 48, 52, 55, 53, 54, 55],
      weeklyWeight:    [82, 81.5, 81, 81, 80.5, 80.5, 80, 80],
      weeklySessions:  [2, 3, 2, 2, 3, 2, 3, 3],
    },
  ]);

  readonly clients = this._clients.asReadonly();

  // Get single client by ID
  getClientById(id: number): Clients | undefined {
    return this._clients().find(c => c.id === id);
  }

  // Add new client
  addClient(client: Omit<Clients, 'id'>): void {
    const newId = Math.max(...this._clients().map(c => c.id)) + 1;
    this._clients.update(clients => [...clients, { ...client, id: newId }]);
  }

  // Update existing client
  updateClient(id: number, changes: Partial<Clients>): void {
    this._clients.update(clients =>
      clients.map(c => c.id === id ? { ...c, ...changes } : c)
    );
  }

  // Delete client
  deleteClient(id: number): void {
    this._clients.update(clients => clients.filter(c => c.id !== id));
  }

  // Helper: compute avatar initials from name
  static getAvatar(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  // Helper: compute status from adherence
  static getStatus(adherence: number): { status: string; statusColor: string } {
    if (adherence >= 80) return { status: 'On Track',  statusColor: '#00E096' };
    if (adherence >= 50) return { status: 'At Risk',   statusColor: '#FFD32A' };
    return                      { status: 'Off Track', statusColor: '#FF4757' };
  }
}