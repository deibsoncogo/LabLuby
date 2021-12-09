export interface IUpdateEmployeeDto {
  id: string;
  name: string;
  cpf: number;
  email: string;
  passwordOld?: string;
  passwordNew: string;
  avatarUrl: string;
}
