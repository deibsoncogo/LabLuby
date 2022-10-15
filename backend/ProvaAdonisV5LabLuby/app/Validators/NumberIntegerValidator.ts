import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule('numberInteger', (value, _, options) => {
  if (value && !String(value).match(/^\d+$/gm)) {
    options.errorReporter.report(
      options.pointer,
      'numberInteger',
      'O valor não é inteiro',
      options.arrayExpressionPointer
    )
  }
})
