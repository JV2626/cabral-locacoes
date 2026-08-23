export type VehicleCategory = 'Hatch' | 'Sedan' | 'SUV' | 'Eletrico' | 'Utilitario';

export type VehicleStatus = 'available' | 'rented' | 'maintenance' | 'inactive';

export type MaintenanceStatus = 'green' | 'yellow' | 'red';

export type ServiceType = 
  | 'oleo' 
  | 'filtro_oleo' 
  | 'filtro_ar' 
  | 'filtro_combustivel' 
  | 'alinhamento' 
  | 'rodizio_pneus' 
  | 'pastilhas' 
  | 'correia_dentada' 
  | 'revisao_geral'
  | 'bateria_eletrica';

export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  category: VehicleCategory;
  year: number;
  currentKm: number;
  status: VehicleStatus;
  photoUrl: string;
  dailyRate: number;
  weeklyRate: number;
  currentDriver?: string;
  color: string;
}

export interface MaintenanceRule {
  id: string;
  vehicleId: string;
  vehiclePlate: string;
  vehicleModel: string;
  serviceType: ServiceType;
  serviceName: string;
  initialKm: number;
  currentKm: number;
  intervalKm: number;
  lastServiceKm: number;
  remainingKm: number;
  percentageReached: number;
  status: MaintenanceStatus;
  estimatedCost: number;
}

export interface Contract {
  id: string;
  vehicleId: string;
  vehiclePlate: string;
  vehicleModel: string;
  driverName: string;
  driverPhone: string;
  driverCnh: string;
  billingCycle: 'weekly' | 'monthly';
  rate: number;
  depositAmount: number;
  dueDayOfWeek: number; // 1 = Monday, 2 = Tuesday, ...
  dueDate: string;
  status: 'active' | 'overdue' | 'paid_this_week';
  weeksRented: number;
}

export interface KpiMetrics {
  oilChangesPending: number;
  inspectionsPending: number;
  activeRentals: number;
  availableVehicles: number;
  rentedVehicles: number;
  totalInvested: number;
  upcomingReceivables: number;
  receivedMonth: number;
  overdueAmount: number;
  pendingFines: number;
}

export interface AiInsight {
  id: string;
  category: 'km_wear' | 'profitability' | 'bottleneck' | 'loyalty';
  title: string;
  description: string;
  recommendation: string;
  severity: 'low' | 'medium' | 'high';
  impactMetric: string;
}

export interface QuotedPartItem {
  id: string;
  vehicleId: string;
  vehiclePlate: string;
  vehicleModel: string;
  partName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

export interface TrafficFine {
  id: string;
  vehiclePlate: string;
  vehicleModel: string;
  driverName: string;
  driverPhone: string;
  driverCnh: string;
  infractionCode: string;
  description: string;
  location: string;
  date: string;
  amount: number;
  points: number;
  status: 'pending_transfer' | 'transferred' | 'paid_by_driver';
  dueDate: string;
}

export interface DriverScore {
  id: string;
  driverName: string;
  driverPhone: string;
  score: number; // 0 to 1000
  tier: 'Diamante' | 'Ouro' | 'Prata' | 'Bronze';
  ontimePaymentRate: number; // %
  odometerComplianceRate: number; // %
  zeroFinesMonths: number;
  depositDiscountPercent: number;
}
