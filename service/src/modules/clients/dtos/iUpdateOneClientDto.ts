export interface IUpdateOneClientDto {
  id: string,
  fullName: string,
  email: string,
  passwordOld: string,
  passwordNew: string,
  phone: number,
  cpfNumeric: number,
  address: string,
  city: string,
  state: string,
  zipCode: number,
  averageSalary: number,
}
