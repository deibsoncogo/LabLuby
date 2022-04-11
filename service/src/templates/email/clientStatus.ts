interface IMessageProps {
  name: string,
  status: string
}

export function ClientStatus(messageProps: IMessageProps) {
  let statusMessage: string;

  if (messageProps.status === "approved") {
    statusMessage = "Sua conta foi provada e disponibilizamos um brinde para você!";
  } else if (messageProps.status === "desaproved") {
    statusMessage = "Infelizmente sua conta não foi aprovada por ter um salário abaixo do permitido.";
  } else {
    statusMessage = "A situação da conta está sendo analisado.";
  }

  return `
    <h1>Lub Cash &#128176</h1>

    <h2>Olá, ${messageProps.name}</h2>

    <p>O seu cadastro como cliente foi finalizado.</p>
    <p>${statusMessage}</p>

    <p>
      Atenciosamente,<br>
      <strong>Lub Cash</strong>
    </p>
  `;
}
