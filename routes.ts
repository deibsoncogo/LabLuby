import { UserUseCase } from "./useCase/UserUseCase";
export const AppRoutes = [
  {
    path: "/users",
    method: "post",
    action: UserUseCase.create,
  },
];
