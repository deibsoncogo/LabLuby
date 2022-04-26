interface IMessageProps {
  fullName: string,
  url: string
}

export function ResetPassword(messageProps: IMessageProps) {
  return `
    <h1>Lub Cash &#128176</h1>

    <h2>Olá, ${messageProps.fullName}</h2>

    <p>Utilize o link abaixo para criar uma nova senha</p>
    <a href="${messageProps.url}">Click aqui</a>

    <p>
      Atenciosamente,<br>
      <strong>Lub Cash</strong>
    </p>
  `;
}
