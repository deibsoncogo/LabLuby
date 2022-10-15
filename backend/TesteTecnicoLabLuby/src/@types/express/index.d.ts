declare namespace Express {
  export interface Request {
    idEmployeeAuthorized: string;
    employeeIsAdmin: boolean;
  }
}
