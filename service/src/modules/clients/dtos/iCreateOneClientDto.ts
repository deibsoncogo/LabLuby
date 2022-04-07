export interface ICreateOneClientDto {
  fullName: string;
  email: string;
  password: string;
  phone: number;
  cpfNumeric: number;
  address: string;
  city: string;
  state: string;
  zipCode: number;
  averageSalary: number;
  currentBalance?: number;
  status?: string;
}
