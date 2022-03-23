const jwt = require('jsonwebtoken');
const { promisify } = require('util')

module.exports = async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: 'Token não encontrado' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, 'authNodeTDD')

    request.userId = decoded.id

    return next()
  } catch (error) {
    return response.status(401).json({ message: 'Token inválido' })
  }
}
