declare namespace Express {
  export interface Request {
    employeeToken: IEmployeeToken;
  }
}

interface IEmployeeToken {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  isAdmin: boolean;
}
