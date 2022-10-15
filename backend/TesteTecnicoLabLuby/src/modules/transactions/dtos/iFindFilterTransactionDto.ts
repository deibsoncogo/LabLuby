export interface IFindFilterTransactionDto {
  type?: string;
  idEmployee?: string;
  idVehicle?: string;
  date?: Date | undefined;
  amount?: number;
}
