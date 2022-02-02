export interface IUpdateOneTransactionDto {
  id: string;
  type?: string;
  idEmployee?: string;
  idVehicle?: string;
  date?: Date;
  amount?: number;
}
