export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  hireDate: string;
  status: 'active' | 'inactive';
}

export interface Opportunity {
  id: string;
  title: string;
  client: string;
  value: number;
  status: 'lead' | 'negotiation' | 'closed-won' | 'closed-lost';
  priority: 'low' | 'medium' | 'high';
  deadline: string;
  description: string;
}