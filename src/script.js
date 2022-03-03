(function(doc, win) {
  "use strict";

  let gameSelected = new Array(0, 0);
  let numberSelected = new Array();
  let database =  new Object();

  // função que vai criar o aviso de carrinho vazio
  function CartEmpty() {
    if (doc.querySelectorAll(`[data-js="mainCartGame"]`).length == 0) {
      doc.querySelector(`[data-js="mainCartGameAll"]`).innerHTML = `
        <div data-js="mainCartEmpty" class="mainCartEmpty">
          <div class="scratch1">.</div>
          <div class="scratch2">.</div>
          <div class="scratch3">.</div>
          <div class="scratch4">.</div>
          <div class="scratch5">.</div>

          <strong>Your shopping cart is empty</strong>
        </div>
      `;
    }
  }

  // calcula a quantidade de número que falta selecionar
  function NumberPending() {
    return database.types[`${gameSelected[1]}`]["max-number"] - numberSelected.length;
  }

  // função que vai colocar ou remove a formatação monetária dos valores
  function ToggleMoneyFormatting(amount) {
    if (typeof amount === "string") {
      return Number(amount.replace(/[^\d,]/g, '').replace(',', '.'));
    }

    return amount.toLocaleString("pt-br",{ style: "currency", currency: "BRL" });
  }

  // função que vai adicionar a seleção de um número
  function AddSelectNumber(element) {
    element.setAttribute("id", "active");
    numberSelected.push(element.innerHTML);
  }

  // função que vai remover a seleção de um número
  function RemoveSelectNumber(element) {
    element.removeAttribute("id", "active");

    const index = numberSelected.indexOf(element.innerHTML);
    numberSelected.splice(index, 1);
  }

  // função que vai controlar o selecionamento dos números
  function ToggleSelectionNumber() {
    doc.querySelectorAll(`[data-js="mainGameNumber"]`).forEach((element) => {
      element.addEventListener("click", (event) => {
        event.preventDefault();

        // identifica se deve ou pode selecionar o número
        if (element.hasAttribute("id", "active")) {
          RemoveSelectNumber(element);
        } else if (numberSelected.length == database.types[`${gameSelected[1]}`]["max-number"]) {
          win.alert("Você já selecionou a quantidade máxima de números!");
        } else {
          AddSelectNumber(element);
        }
      });
    });
  }

  // função que vai remover a seleção de todos números
  function RemoveSelectionAllNumber() {
    doc.querySelectorAll(`[data-js="mainGameNumber"]`).forEach((element) => {
      RemoveSelectNumber(element);
    });
  }

  // função que vai criar a conexão com a API fake
  function ExecuteApiFake() {
    let ajax = new XMLHttpRequest();

    // cria um evento para acontecer quando a requisição finalizar
    ajax.onreadystatechange = () => {
      if(ajax.readyState == 4 && ajax.status == 200) {
        database = JSON.parse(ajax.responseText);

        CartEmpty();
        CreateButtonGameType();
        HandleAdjustGameByType();
      }
    };

    let url = "./services/games.json";
    // let url = "https://provafinallabluby.free.beeceptor.com";

    ajax.open("GET", url, true);
    ajax.send();
  }

  // função responsável por criar os botões do tipo de jogo
  function CreateButtonGameType() {
    for (const index in database.types) {
      doc.querySelector(`[data-js="mainGameButtonType"]`).innerHTML += `
        <a data-js="buttonGameType" data-bt="buttonGameType${index}">${database.types[index].type}</a>
      `;

      doc.querySelector(`[data-bt="buttonGameType${index}"]`).style.cssText = `
        border: 2px solid ${database.types[index].color};
        color: ${database.types[index].color};
      `;
    }

    doc.querySelectorAll(`[data-js="buttonGameType"]`).forEach((element, index) => {
      element.addEventListener("click", (event) => {
        event.preventDefault();

        gameSelected.shift();
        gameSelected.push(index);
        HandleAdjustGameByType();
      });
    });
  }

  // função que vai ajustar a página para o tipo do jogo selecionado
  function HandleAdjustGameByType() {
    numberSelected = [];

    // ajusta a seleção do botão do tipo de jogo
    doc.querySelector(`[data-bt="buttonGameType${gameSelected[0]}"]`).style.cssText = `
      border: 2px solid ${database.types[gameSelected[0]].color};
      color: ${database.types[gameSelected[0]].color};
      background-color = #FFFFFF;
    `;

    doc.querySelector(`[data-bt="buttonGameType${gameSelected[1]}"]`).style.cssText = `
      border: 2px solid ${database.types[gameSelected[1]].color};
      color: #FFFFFF;
      background-color: ${database.types[gameSelected[1]].color};
    `;

    doc.querySelector(`[data-js="name"]`).innerHTML = database.types[`${gameSelected[1]}`].type.toUpperCase();
    doc.querySelector(`[data-js="rule"]`).innerHTML = database.types[`${gameSelected[1]}`].description;
    doc.querySelector(`[data-js="mainGameNumberAll"]`).innerHTML = "";

    // for que vai adicionar a quantidade de números necessário do jogo
    for (let index = 1; index <= database.types[`${gameSelected[1]}`].range; index++) {
      const numberFormatted = ("00" + index).slice(-2);

      doc.querySelector(`[data-js="mainGameNumberAll"]`).innerHTML += `
        <a data-bt="number${numberFormatted}" data-js="mainGameNumber" class="mainGameNumber">${numberFormatted}</a>
      `;
    }

    ToggleSelectionNumber();
  }

  // selecionar a quantidade faltante de número do jogo
  doc.querySelector(`[data-bt="completeGame"]`).addEventListener("click", (event) => {
    event.preventDefault();

    let numberPending = NumberPending();

    // vai gerar e selecionar um número até o numberPending zerar
    while (numberPending > 0) {
      const numberRandom = Math.floor(Math.random() * (database.types[`${gameSelected[1]}`].range - 1)) + 1;
      const numberRandomFormatted = ("00" + numberRandom).slice(-2);

      // verifica se o número aleatório está selecionado
      if (numberSelected.indexOf(numberRandomFormatted) == -1) {
        AddSelectNumber(doc.querySelector(`[data-bt="number${numberRandomFormatted}"]`));
        numberPending--;
      }
    }
  });

  // remove a seleção de todos os números
  doc.querySelector(`[data-bt="clearGame"]`).addEventListener("click", (event) => {
    event.preventDefault();

    RemoveSelectionAllNumber();
  });

  // adicionar um jogo ao carrinho e ajusta o valor total
  doc.querySelector(`[data-bt="addToCart"]`).addEventListener("click", (event) => {
    event.preventDefault();

    // vai verificar se existe a quantidade minima de numero selecionado
    let numberPending = NumberPending();
    if (numberPending !== 0) {
      const plural = numberPending > 1 ? "s" : "";
      return win.alert(`Falta selecionar ${numberPending} número${plural}!`)
    }

    // adiciona o valor da aposta no valor total do carrinho
    let valueTotal = ToggleMoneyFormatting(doc.querySelector(`[data-js="valueTotal"]`).innerHTML);
    valueTotal += database.types[`${gameSelected[1]}`].price;
    doc.querySelector(`[data-js="valueTotal"]`).innerHTML = ToggleMoneyFormatting(valueTotal);

    // vai remove o aviso de carrinho vazio
    if (doc.querySelectorAll(`[data-js="mainCartGame"]`).length == 0) {
      doc.querySelector(`[data-js="mainCartEmpty"]`).remove();
    }

    // adiciona a aposta no carrinho de compras
    doc.querySelector(`[data-js="mainCartGameAll"]`).innerHTML += `
      <a data-js="mainCartGame" class="mainCartGame">
        <svg data-js="trash" class="mainCartGameTrash" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>
        </svg>

        <div class="mainCartGameBorder" style="background-color: ${database.types[`${gameSelected[1]}`].color}; ${numberSelected.length < 10 && "height: 60px;"}">BORDER</div>

        <div class="mainCartGameValue">
          <div class="mainCartGameNumber">${numberSelected.sort().join(", ")}</div>

          <div class="mainCartGameAmount">
            <strong data-js="gameType" style="color: ${database.types[`${gameSelected[1]}`].color};">
              ${database.types[`${gameSelected[1]}`].type}
            </strong>

            <p data-js="value">${ToggleMoneyFormatting(database.types[`${gameSelected[1]}`].price)}</p>
          </div>
        </div>
      </a>
    `;

    RemoveSelectionAllNumber();

    // evento que vai remove um jogo do carrinho de compras
    doc.querySelectorAll(`[data-js="mainCartGame"]`).forEach((element) => {
      element.querySelector(`[data-js="trash"]`).addEventListener("click", (event) => {
        event.preventDefault();

        valueTotal = ToggleMoneyFormatting(doc.querySelector(`[data-js="valueTotal"]`).innerHTML);
        valueTotal -= ToggleMoneyFormatting(element.querySelector(`[data-js="value"]`).innerHTML);

        doc.querySelector(`[data-js="valueTotal"]`).innerHTML = ToggleMoneyFormatting(valueTotal);

        element.remove();

        CartEmpty();
      });
    });
  });

  // evento que vai verificar se o valor mínimo do carrinho foi atingindo
  doc.querySelector(`[data-bt="save"]`).addEventListener("click", (event) => {
    event.preventDefault();

    if (ToggleMoneyFormatting(doc.querySelector(`[data-js="valueTotal"]`).innerHTML) < database["min-cart-value"]) {
      win.alert(`O valor mínimo do carrinho é de ${ToggleMoneyFormatting(database["min-cart-value"])}!`)
    }
  });

  ExecuteApiFake();
})(document, window);
