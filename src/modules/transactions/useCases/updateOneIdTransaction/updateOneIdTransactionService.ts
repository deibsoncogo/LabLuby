import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { IEmployeeRepository } from "../../../employees/repositories/iEmployeeRepository";
import { IVehicleRepository } from "../../../vehicles/repositories/iVehicleRepository";
import { IUpdateOneIdTransactionDto } from "../../dtos/iUpdateOneIdTransactionDto";
import { TransactionEntity } from "../../entities/transactionEntity";
import { ITransactionRepository } from "../../repositories/iTransactionRepository";

@injectable()
export class UpdateOneIdTransactionService {
  constructor(
    @inject("TransactionRepository")
    private transactionRepository: ITransactionRepository,

    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository,

    @inject("VehicleRepository")
    private vehicleRepository: IVehicleRepository,
  ) {}

  async execute(
    { id, type, idEmployee, idVehicle, date, amount }: IUpdateOneIdTransactionDto,
  ): Promise<TransactionEntity> {
    const alreadyExistsTransaction = await this.transactionRepository.findOneIdTransaction(id);

    if (!alreadyExistsTransaction) {
      throw new AppError("ID da transação inválida");
    }

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

    const transaction = await this.transactionRepository.updateOneIdTransaction({
      id,
      type,
      idEmployee,
      idVehicle,
      date,
      amount,
    });

    return transaction;
  }
}
