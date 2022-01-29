export interface ICreateTransactionDto {
  type: string;
  idEmployee: string;
  idVehicle: string;
  date: Date;
  amount: number;
}
