export interface ICreateOneTransactionDto {
  type: string;
  idEmployee: string;
  idVehicle: string;
  date: Date;
  amount: number;
}
