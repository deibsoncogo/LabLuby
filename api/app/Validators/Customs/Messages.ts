export class MessagesValidator {
  public messages = {
    // formato dos dados
    'string': 'O formado do campo deve ser um texto',
    'number': 'O formado do campo deve ser um número',

    // mensagens gerais
    'email': 'Formato do e-mail é inválido',
    'exists': 'Não foi encontrado nenhum registro',
    'required': 'Este campo é obrigatório',
    'minLength': 'É necessário no mínimo {{ options.minLength }} caracteres',
    'maxLength': 'É permitido no máximo {{ options.maxLength }} caracteres',
    'unique': 'Já existe este valor registrado no sistema',
    'unsigned': 'É permitido somente números positivos',
    'uuid': 'O formato do ID não é válido',

    // mensagens especificas: user
    'name.regex': 'É permitido somente letras e espaço no nome',
    'password.regex': 'A senha deve ter no mínimo 2 números e letras minusculas e maiúsculas',
    'passwordOld.regex': 'A senha deve ter no mínimo 2 números e letras minusculas e maiúsculas',
    'passwordNew.regex': 'A senha deve ter no mínimo 2 números e letras minusculas e maiúsculas',
  }
}
