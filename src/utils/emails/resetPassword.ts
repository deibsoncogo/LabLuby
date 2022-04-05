interface IMessage {
  name: string,
  url: string,
}

export function resetPassword({ name, url }: IMessage) {
  return `
    <h1>Gerar nova senha &#128556 &#128272 &#127922</h1>

    <p>Olá ${name},</p>
    <p>
      <a href="${url}">Click aqui</a> para redefinir sua senha!
    </p>

    <p>
      Atenciosamente,<br>
      <strong>Prova Adonis V5 LabLub</strong>
    </p>
  `;
}
