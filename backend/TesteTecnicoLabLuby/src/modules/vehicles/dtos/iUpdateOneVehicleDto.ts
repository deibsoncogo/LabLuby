export interface IUpdateOneVehicleDto {
  id: string;
  category?: string;
  brand?: string;
  model?: string;
  year?: number;
  km?: number;
  color?: string;
  purchasePrice?: number;
}
