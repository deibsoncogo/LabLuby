interface IMessage {
  name: string,
  betLength: number,
  plural: string,
}

export function newBet({ name, betLength, plural }: IMessage) {
  return `
    <h1>Nova aposta realizada &#128525 &#128536 &#128149</h1>

    <p>
      ${name} você realizou mais <strong>${betLength}</strong> aposta${plural}.<br>
    </p>

    <p>
      Atenciosamente,<br>
      <strong>Prova Adonis V5 LabLub</strong>
    </p>
  `;
}
