export type Language = 'ka' | 'en';

export interface DemoFormData {
  fullName: string;
  phone: string;
  email: string;
  gymName: string;
  city?: string;
  membersCount?: string;
  estimatedMembers?: string;
  preferredTime?: string;
  plan?: string;
  notes?: string;
  message?: string;
}

export type NavigationTab =
  | 'dashboard'
  | 'registration'
  | 'search'
  | 'entry'
  | 'expired'
  | 'products'
  | 'trainers'
  | 'settings'
  | 'notifications'
  | 'excel';

export type MembershipType =
  | '12_workouts'
  | 'morning_unlimited'
  | 'unlimited'
  | 'other'
  | 'single_visit';

export type MemberStatus = 'active' | 'expired' | 'expiring_soon' | 'frozen';

export interface Member {
  id: string;
  cardNumber: string; // e.g. "1016"
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  personalId: string; // 11 digits
  birthDate?: string;
  notes?: string;
  membershipPlan: MembershipType;
  customPlanName?: string;
  price: number;
  status: MemberStatus;
  startDate: string; // DD/MM/YYYY
  endDate: string; // DD/MM/YYYY
  totalWorkouts?: number;
  remainingWorkouts?: number;
  trainerService?: boolean;
  trainerId?: string;
  freeTrainerBonus?: boolean;
  registrationDate: string;
  photoUrl?: string;
}

export interface Visit {
  id: string;
  memberId: string;
  memberName: string;
  cardNumber: string;
  time: string; // e.g. "14:25"
  date: string; // DD/MM/YYYY
  planName: string;
  remainingWorkouts?: number;
  status: 'allowed' | 'denied';
  reason?: string;
}

export interface Trainer {
  id: string;
  name: string;
  phone: string;
  specialty: string;
  clientCount: number;
  rating: number;
  status: 'active' | 'inactive';
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  costPrice: number;
  stock: number;
  soldCount: number;
}

export interface ProductSale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  time: string;
  date: string;
  memberId?: string;
  memberName?: string;
}

export interface SmsTemplate {
  id: string;
  title: string;
  text: string;
}
