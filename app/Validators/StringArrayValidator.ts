import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule('stringArray', (value, [type, minElement, maxElement, hasDouble], options) => {
  const valueArray = value.split(',')

  if (type && type === 'uuid') {
    const regex = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/gim

    valueArray.forEach((element) => {
      if (!element.match(regex)) {
        options.errorReporter.report(
          options.pointer,
          'stringArray.type',
          'Formato do UUID inválido',
          options.arrayExpressionPointer,
          { type }
        )
      }
    })
  } else if (type) {
    valueArray.forEach((element) => {
      // eslint-disable-next-line valid-typeof
      if (typeof element !== type) {
        options.errorReporter.report(
          options.pointer,
          'stringArray.type',
          'Formato do elemento é inválido',
          options.arrayExpressionPointer,
          { type }
        )
      }
    })
  }

  if (minElement && valueArray.length < minElement) {
    options.errorReporter.report(
      options.pointer,
      'stringArray.minElement',
      `É necessário no mínimo ${minElement} elemento${minElement > 1 ? 's' : ''}`,
      options.arrayExpressionPointer,
      { minElement }
    )
  }

  if (maxElement && valueArray.length > maxElement) {
    options.errorReporter.report(
      options.pointer,
      'stringArray.maxElement',
      `É permitido no máximo ${minElement} elemento${minElement > 1 ? 's' : ''}`,
      options.arrayExpressionPointer,
      { maxElement }
    )
  }

  if (hasDouble && hasDouble === true) {
    const valueArrayNew = [...new Set(valueArray)]

    if (valueArrayNew.length !== valueArray.length) {
      options.errorReporter.report(
        options.pointer,
        'stringArray.hasDouble',
        'Existe elemento duplicado',
        options.arrayExpressionPointer,
        { hasDouble }
      )
    }
  }
})
