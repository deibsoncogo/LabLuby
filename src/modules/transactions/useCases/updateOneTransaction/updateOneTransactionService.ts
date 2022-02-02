import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { FormatDate } from "../../../../utils/formatDate";
import { IEmployeeRepository } from "../../../employees/repositories/iEmployeeRepository";
import { IVehicleRepository } from "../../../vehicles/repositories/iVehicleRepository";
import { IUpdateOneTransactionDto } from "../../dtos/iUpdateOneTransactionDto";
import { TransactionEntity } from "../../entities/transactionEntity";
import { ITransactionRepository } from "../../repositories/iTransactionRepository";

@injectable()
export class UpdateOneTransactionService {
  constructor(
    @inject("TransactionRepository")
    private transactionRepository: ITransactionRepository,

    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository,

    @inject("VehicleRepository")
    private vehicleRepository: IVehicleRepository,
  ) {}

  async execute(
    { id, idEmployee, idVehicle, date, amount }: IUpdateOneTransactionDto,
  ): Promise<TransactionEntity> {
    const alreadyExistsTransaction = await this.transactionRepository.findOneIdTransaction(id);

    if (!alreadyExistsTransaction) {
      throw new AppError("ID da transação inválida");
    }

    if (idEmployee) {
      const employee = await this.employeeRepository.findOneIdEmployee(idEmployee);

      if (!employee) {
        throw new AppError("ID do funcionário inválido");
      }
    }

    if (idVehicle) {
      const vehicle = await this.vehicleRepository.findOneIdVehicle(idVehicle);

      if (!vehicle) {
        throw new AppError("ID do veiculo inválido");
      }
    }

    const transaction = await this.transactionRepository.updateOneTransaction({
      id,
      idEmployee,
      idVehicle,
      date,
      amount,
    });

    transaction.createdAt = FormatDate(transaction.createdAt);
    transaction.updatedAt = FormatDate(transaction.updatedAt);
    transaction.date = FormatDate(transaction.date);
    transaction.employee.createdAt = FormatDate(transaction.employee.createdAt);
    transaction.employee.updatedAt = FormatDate(transaction.employee.updatedAt);
    transaction.vehicle.createdAt = FormatDate(transaction.vehicle.createdAt);
    transaction.vehicle.updatedAt = FormatDate(transaction.vehicle.updatedAt);
    delete transaction.employee.password;

    return transaction;
  }
}
