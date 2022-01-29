export interface IUpdateOneIdTransactionDto {
  id: string;
  type?: string;
  idEmployee?: string;
  idVehicle?: string;
  date?: Date;
  amount?: number;
}
