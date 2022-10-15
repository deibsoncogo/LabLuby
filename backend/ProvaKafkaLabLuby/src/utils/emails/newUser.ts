interface IMessage {
  name: string,
  password: string,
}

export function newUser({ name, password }: IMessage) {
  return `
    <h1>Cadastro de novo usuário &#127881 &#127882 &#10024</h1>

    <h2> Olá, ${name} </h2>

    <p>Seu cadastro foi realizado com sucesso, corra e faça sua primeira aposta.</p>

    <p>
      Segua abaixo a senha de acesso, mantenha ela em segurança!<br>
      <strong>${password}</strong>
    </p>

    <p>
    Atenciosamente,<br>
    <strong>Prova Adonis V5 LabLub</strong>
    </p>
  `;
}
