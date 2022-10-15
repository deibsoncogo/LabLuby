interface IMessage {
  name: string,
  betLength: number,
  plural: string,
}

export function newBetAdmin({ name, betLength, plural }: IMessage) {
  return `
    <h1>Novo registro de aposta identificado &#128526 &#129322 &#129297</h1>

    <p>
      O usuário ${name} realizou mais <strong>${betLength}</strong> aposta${plural}.<br>
    </p>

    <p>
      Atenciosamente,<br>
      <strong>Prova Adonis V5 LabLub</strong>
    </p>
  `;
}
