import { Vehicle, MaintenanceRule, Contract, KpiMetrics, AiInsight, QuotedPartItem, TrafficFine, DriverScore } from '../types/fleet';

export const mockVehicles: Vehicle[] = [
  {
    id: 'veh-1',
    plate: 'QWE-4321',
    model: 'Fiat Cronos 1.3 Drive Flex',
    category: 'Sedan',
    year: 2023,
    currentKm: 42150,
    status: 'rented',
    photoUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=60',
    dailyRate: 110,
    weeklyRate: 560,
    currentDriver: 'Marcos Roberto',
    color: 'Prata Bari'
  },
  {
    id: 'veh-2',
    plate: 'ABC-1234',
    model: 'Hyundai HB20 1.0 Vision',
    category: 'Hatch',
    year: 2023,
    currentKm: 48210,
    status: 'rented',
    photoUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=60',
    dailyRate: 95,
    weeklyRate: 490,
    currentDriver: 'Carlos Eduardo',
    color: 'Branco Atlas'
  },
  {
    id: 'veh-3',
    plate: 'XYZ-9876',
    model: 'Chevrolet Onix Plus 1.0 LT Turbo',
    category: 'Sedan',
    year: 2024,
    currentKm: 28400,
    status: 'rented',
    photoUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=60',
    dailyRate: 120,
    weeklyRate: 590,
    currentDriver: 'Felipe Souza',
    color: 'Cinza Drake'
  },
  {
    id: 'veh-4',
    plate: 'KJH-5544',
    model: 'Fiat Argo 1.0 Trekking',
    category: 'Hatch',
    year: 2022,
    currentKm: 59850,
    status: 'maintenance',
    photoUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&auto=format&fit=crop&q=60',
    dailyRate: 100,
    weeklyRate: 510,
    color: 'Vermelho Montecarlo'
  },
  {
    id: 'veh-5',
    plate: 'TRK-9080',
    model: 'Chevrolet Tracker 1.0 Turbo Premier',
    category: 'SUV',
    year: 2024,
    currentKm: 14500,
    status: 'available',
    photoUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=60',
    dailyRate: 160,
    weeklyRate: 850,
    color: 'Azul Eclipse'
  },
  {
    id: 'veh-6',
    plate: 'RNT-2345',
    model: 'Renault Kwid 1.0 Zen',
    category: 'Hatch',
    year: 2023,
    currentKm: 38900,
    status: 'rented',
    photoUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=60',
    dailyRate: 85,
    weeklyRate: 440,
    currentDriver: 'Luciana Martins',
    color: 'Laranja Ocre'
  }
];

export const mockMaintenanceRules: MaintenanceRule[] = [
  {
    id: 'maint-1',
    vehicleId: 'veh-1',
    vehiclePlate: 'QWE-4321',
    vehicleModel: 'Cronos 1.3',
    serviceType: 'revisao_geral',
    serviceName: 'Revisão Geral & Correia',
    initialKm: 0,
    currentKm: 8083,
    intervalKm: 19000,
    lastServiceKm: 0,
    remainingKm: 10917,
    percentageReached: 43,
    status: 'green',
    estimatedCost: 850
  },
  {
    id: 'maint-2',
    vehicleId: 'veh-1',
    vehiclePlate: 'QWE-4321',
    vehicleModel: 'Cronos 1.3',
    serviceType: 'alinhamento',
    serviceName: 'Alinhamento & Balanceamento',
    initialKm: 0,
    currentKm: 8083,
    intervalKm: 20000,
    lastServiceKm: 0,
    remainingKm: 11917,
    percentageReached: 40,
    status: 'green',
    estimatedCost: 160
  },
  {
    id: 'maint-3',
    vehicleId: 'veh-1',
    vehiclePlate: 'QWE-4321',
    vehicleModel: 'Cronos 1.3',
    serviceType: 'rodizio_pneus',
    serviceName: 'Rodízio de Pneus',
    initialKm: 0,
    currentKm: 8083,
    intervalKm: 20000,
    lastServiceKm: 0,
    remainingKm: 11917,
    percentageReached: 40,
    status: 'green',
    estimatedCost: 80
  },
  {
    id: 'maint-4',
    vehicleId: 'veh-2',
    vehiclePlate: 'ABC-1234',
    vehicleModel: 'HB20 1.0',
    serviceType: 'filtro_oleo',
    serviceName: 'Filtro de Óleo & Cabine',
    initialKm: 0,
    currentKm: 2986,
    intervalKm: 8500,
    lastServiceKm: 0,
    remainingKm: 5514,
    percentageReached: 35,
    status: 'green',
    estimatedCost: 95
  },
  {
    id: 'maint-5',
    vehicleId: 'veh-2',
    vehiclePlate: 'ABC-1234',
    vehicleModel: 'HB20 1.0',
    serviceType: 'oleo',
    serviceName: 'Troca de Óleo 5W30 Sintético',
    initialKm: 0,
    currentKm: 2986,
    intervalKm: 8500,
    lastServiceKm: 0,
    remainingKm: 5514,
    percentageReached: 35,
    status: 'green',
    estimatedCost: 190
  },
  {
    id: 'maint-6',
    vehicleId: 'veh-4',
    vehiclePlate: 'KJH-5544',
    vehicleModel: 'Argo 1.0',
    serviceType: 'oleo',
    serviceName: 'Troca de Óleo Urgente',
    initialKm: 50000,
    currentKm: 59850,
    intervalKm: 10000,
    lastServiceKm: 50000,
    remainingKm: 150,
    percentageReached: 98,
    status: 'red',
    estimatedCost: 220
  },
  {
    id: 'maint-7',
    vehicleId: 'veh-3',
    vehiclePlate: 'XYZ-9876',
    vehicleModel: 'Onix Plus',
    serviceType: 'pastilhas',
    serviceName: 'Pastilhas de Freio Dianteiras',
    initialKm: 0,
    currentKm: 28400,
    intervalKm: 30000,
    lastServiceKm: 0,
    remainingKm: 1600,
    percentageReached: 94,
    status: 'red',
    estimatedCost: 240
  },
  {
    id: 'maint-8',
    vehicleId: 'veh-1',
    vehiclePlate: 'QWE-4321',
    vehicleModel: 'Cronos 1.3',
    serviceType: 'rodizio_pneus',
    serviceName: 'Pneus Dianteiros 185/65 R15',
    initialKm: 0,
    currentKm: 8083,
    intervalKm: 40000,
    lastServiceKm: 0,
    remainingKm: 31917,
    percentageReached: 20,
    status: 'green',
    estimatedCost: 680
  }
];

export const mockContracts: Contract[] = [
  {
    id: 'cont-1',
    vehicleId: 'veh-1',
    vehiclePlate: 'QWE-4321',
    vehicleModel: 'Fiat Cronos 1.3',
    driverName: 'Marcos Roberto da Silva',
    driverPhone: '(11) 98765-4321',
    driverCnh: '05492819283',
    billingCycle: 'weekly',
    rate: 560,
    depositAmount: 1000,
    dueDayOfWeek: 5, // Sexta
    dueDate: '2026-08-28',
    status: 'paid_this_week',
    weeksRented: 24
  },
  {
    id: 'cont-2',
    vehicleId: 'veh-2',
    vehiclePlate: 'ABC-1234',
    driverName: 'Carlos Eduardo Santos',
    driverPhone: '(11) 97654-3210',
    driverCnh: '04829104928',
    vehicleModel: 'Hyundai HB20 1.0',
    billingCycle: 'weekly',
    rate: 490,
    depositAmount: 800,
    dueDayOfWeek: 3, // Quarta
    dueDate: '2026-08-26',
    status: 'active',
    weeksRented: 12
  },
  {
    id: 'cont-3',
    vehicleId: 'veh-3',
    vehiclePlate: 'XYZ-9876',
    driverName: 'Felipe Souza Neves',
    driverPhone: '(11) 96543-2109',
    driverCnh: '06192837465',
    vehicleModel: 'Chevrolet Onix Plus',
    billingCycle: 'weekly',
    rate: 590,
    depositAmount: 1000,
    dueDayOfWeek: 1, // Segunda
    dueDate: '2026-08-24',
    status: 'overdue',
    weeksRented: 6
  }
];

export const mockKpiMetrics: KpiMetrics = {
  oilChangesPending: 1,
  inspectionsPending: 2,
  activeRentals: 4,
  availableVehicles: 1,
  rentedVehicles: 4,
  totalInvested: 385000,
  upcomingReceivables: 2180,
  receivedMonth: 12450,
  overdueAmount: 590,
  pendingFines: 380
};

export const mockAiInsights: AiInsight[] = [
  {
    id: 'ins-1',
    category: 'km_wear',
    title: 'Desgaste Acelerado de KM (Alerta Preditivo)',
    description: 'O motorista Carlos (HB20 - ABC-1234) está rodando uma média de 245 km/dia (40% acima da média da frota de 175 km/dia).',
    recommendation: 'A troca de óleo ocorrerá 14 dias antes do previsto. Recomendamos antecipar a compra do kit de óleo na cotação semanal.',
    severity: 'high',
    impactMetric: '+40% KM/dia'
  },
  {
    id: 'ins-2',
    category: 'profitability',
    title: 'Alta Rentabilidade na Linha Sedã',
    description: 'O Fiat Cronos e o Onix Plus apresentaram margem líquida média de 88.6% com baixo índice de paradas mecânicas na Uber.',
    recommendation: 'Na próxima expansão da frota da Cabral Locações, priorize sedãs compactos para motoristas de app.',
    severity: 'low',
    impactMetric: '88.6% Margem'
  },
  {
    id: 'ins-3',
    category: 'bottleneck',
    title: 'Prevenção de Gargalo em Oficinas Parceiras',
    description: '3 veículos da frota atingirão múltiplos de 10.000 km na primeira quinzena de Setembro.',
    recommendation: 'Escalone os agendamentos na Oficina São Cristóvão em dias alternados para não ter mais de 1 veículo parado no mesmo dia.',
    severity: 'medium',
    impactMetric: '3 Veículos'
  }
];

export const mockQuotedParts: QuotedPartItem[] = [
  {
    id: 'qp-1',
    vehicleId: 'veh-4',
    vehiclePlate: 'KJH-5544',
    vehicleModel: 'Argo 1.0',
    partName: 'Óleo 5W30 Sintético (Litro)',
    quantity: 4,
    unit: 'L',
    unitPrice: 38.00
  },
  {
    id: 'qp-2',
    vehicleId: 'veh-4',
    vehiclePlate: 'KJH-5544',
    vehicleModel: 'Argo 1.0',
    partName: 'Filtro de Óleo Fram',
    quantity: 1,
    unit: 'Un',
    unitPrice: 35.00
  },
  {
    id: 'qp-3',
    vehicleId: 'veh-3',
    vehiclePlate: 'XYZ-9876',
    vehicleModel: 'Onix Plus',
    partName: 'Jogo de Pastilhas de Freio Dianteiras',
    quantity: 1,
    unit: 'Jogo',
    unitPrice: 145.00
  },
  {
    id: 'qp-4',
    vehicleId: 'veh-3',
    vehiclePlate: 'XYZ-9876',
    vehicleModel: 'Onix Plus',
    partName: 'Fluido de Freio DOT4',
    quantity: 1,
    unit: 'Frasco',
    unitPrice: 32.00
  }
];

export const mockTrafficFines: TrafficFine[] = [
  {
    id: 'fine-1',
    vehiclePlate: 'XYZ-9876',
    vehicleModel: 'Chevrolet Onix Plus',
    driverName: 'Felipe Souza Neves',
    driverPhone: '(11) 96543-2109',
    driverCnh: '06192837465',
    infractionCode: '745-5-0',
    description: 'Transitar em velocidade superior à máxima permitida em até 20%',
    location: 'Av. das Nações Unidas, km 12.4 — São Paulo/SP',
    date: '18/08/2026 14:32',
    amount: 130.16,
    points: 4,
    status: 'pending_transfer',
    dueDate: '15/09/2026'
  },
  {
    id: 'fine-2',
    vehiclePlate: 'ABC-1234',
    vehicleModel: 'Hyundai HB20 1.0',
    driverName: 'Carlos Eduardo Santos',
    driverPhone: '(11) 97654-3210',
    driverCnh: '04829104928',
    infractionCode: '605-0-3',
    description: 'Avançar o sinal vermelho do semáforo',
    location: 'Av. Paulista x Rua da Consolação — São Paulo/SP',
    date: '12/08/2026 23:14',
    amount: 293.47,
    points: 7,
    status: 'transferred',
    dueDate: '08/09/2026'
  }
];

export const mockDriverScores: DriverScore[] = [
  {
    id: 'sc-1',
    driverName: 'Marcos Roberto da Silva',
    driverPhone: '(11) 98765-4321',
    score: 980,
    tier: 'Diamante',
    ontimePaymentRate: 100,
    odometerComplianceRate: 100,
    zeroFinesMonths: 6,
    depositDiscountPercent: 50
  },
  {
    id: 'sc-2',
    driverName: 'Carlos Eduardo Santos',
    driverPhone: '(11) 97654-3210',
    score: 840,
    tier: 'Ouro',
    ontimePaymentRate: 92,
    odometerComplianceRate: 95,
    zeroFinesMonths: 3,
    depositDiscountPercent: 25
  },
  {
    id: 'sc-3',
    driverName: 'Felipe Souza Neves',
    driverPhone: '(11) 96543-2109',
    score: 620,
    tier: 'Prata',
    ontimePaymentRate: 70,
    odometerComplianceRate: 80,
    zeroFinesMonths: 0,
    depositDiscountPercent: 0
  }
];

