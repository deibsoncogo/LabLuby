import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { FormatDate } from "../../../../utils/formatDate";
import { IEmployeeRepository } from "../../../employees/repositories/iEmployeeRepository";
import { IVehicleRepository } from "../../../vehicles/repositories/iVehicleRepository";
import { ICreateTransactionDto } from "../../dtos/iCreateTransactionDto";
import { TransactionEntity } from "../../entities/transactionEntity";
import { ITransactionRepository } from "../../repositories/iTransactionRepository";

@injectable()
export class CreateTransactionService {
  constructor(
    @inject("TransactionRepository")
    private transactionRepository: ITransactionRepository,

    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository,

    @inject("VehicleRepository")
    private vehicleRepository: IVehicleRepository,
  ) {}

  async execute(
    { type, idEmployee, idVehicle, date, amount }: ICreateTransactionDto,
  ): Promise<TransactionEntity> {
    if (type !== "venda" && type !== "reserva") {
      throw new AppError("Tipo de transação inválida, utilize venda ou reserva");
    }

    const employee = await this.employeeRepository.findOneIdEmployee(idEmployee);

    if (!employee) {
      throw new AppError("ID do funcionário inválido");
    }

    const vehicle = await this.vehicleRepository.findOneIdVehicle(idVehicle);

    if (!vehicle) {
      throw new AppError("ID do veiculo inválido");
    }

    const alreadyExistsTransactionVehicle = await this.transactionRepository
      .findOneIdVehicleTransaction(idVehicle);

    if (alreadyExistsTransactionVehicle) {
      throw new AppError("Já existe uma transação para este veiculo");
    }

    const transaction = await this.transactionRepository.createTransaction({
      type,
      idEmployee,
      idVehicle,
      date,
      amount,
    });

    transaction.createdAt = FormatDate(transaction.createdAt);
    transaction.updatedAt = FormatDate(transaction.updatedAt);
    transaction.date = FormatDate(transaction.updatedAt);

    return transaction;
  }
}
