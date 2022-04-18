export interface ICreateOneClientDto {
  userId: string;
  cpf: number;
  phone: number;
  address: string;
  city: string;
  state: string;
  zipCode: number;
  averageSalary: number;
  currentBalance?: number;
  status?: string;
  fullName?: string;
  email?: string;
}
