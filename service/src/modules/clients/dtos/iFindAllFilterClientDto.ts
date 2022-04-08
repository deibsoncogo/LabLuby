export interface IFindAllFilterClientDto {
  fullName: string;
  email: string;
  phone: number;
  cpfNumeric: number;
  address: string;
  city: string;
  state: string;
  zipCode: number;
  averageSalary: number;
  currentBalance: number;
  status: string;
  createdAtFrom: Date;
  createdAtTo: Date;
}
