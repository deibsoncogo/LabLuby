import { InvalidParamError } from "../../errors"
import { CompareFieldValidation } from "./compare.field.validation"

const makeSut = (): CompareFieldValidation => {
  return new CompareFieldValidation("field", "fieldCompare")
}

describe("Compare field validation", () => {
  test("Should return a InvalidParamError if validation fails", () => {
    const sut = makeSut()

    const error = sut.validate({ field: "any_name", fieldToCompare: "wrong_name" })

    expect(error).toEqual(new InvalidParamError("fieldToCompare"))
  })

  test("Should no return if validation succeeds", () => {
    const sut = makeSut()

    const error = sut.validate({ field: "any_name", fieldToCompare: "any_name" })

    expect(error).toBeFalsy()
  })
})
