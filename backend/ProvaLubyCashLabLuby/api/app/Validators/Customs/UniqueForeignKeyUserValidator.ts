import { validator } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

validator.rule('uniqueForeignKeyUser', async (value, [related, relatedField], options) => {
  const user = await User.findOrFail(value)
  const relations = await user.related(related).query()

  for (const key of relations) {
    if (key.id === options.root[`${relatedField}`]) {
      options.errorReporter.report(
        options.pointer,
        'uniqueForeignKeyUser',
        'Já existe esta relação',
        options.arrayExpressionPointer,
      )
    }
  }
}, () => {
  return {
    async: true,
  }
})
