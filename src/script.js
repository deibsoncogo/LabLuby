(function(doc, win) {
  "use strict";

   // não utilizar caracteres e acentos
  let gameSelected = "lotofacil";
  let numberSelected = new Array();
  let database =  new Object();

  function ToggleMoneyFormatting(amount) {
    if (typeof amount === "string") {
      return Number(amount.replace(/[^\d,]/g, '').replace(',', '.'));
    }

    return amount.toLocaleString("pt-br",{ style: "currency", currency: "BRL" })
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
        } else if (numberSelected.length == database.types[`${gameSelected}`].minNumber) {
          win.alert("Você já selecionou a quantidade máxima de números")
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

    // let url = "../doc/games.json";
    let url = "https://lublubydesafiofinal.free.beeceptor.com/";

    // cria um evento para acontecer quando a requisição finalizar
    ajax.onreadystatechange = () => {
      if(ajax.readyState == 4 && ajax.status == 200) {
        database = JSON.parse(ajax.responseText);
        HandleAdjustGameByType();
      }
    };

    ajax.open("GET", url, true);
    ajax.send();
  }

  // função que vai ajustar a página para o tipo do jogo selecionado
  function HandleAdjustGameByType() {
    numberSelected = [];

    // remove a seleção de todos botões de tipo de jogo
    doc.querySelectorAll(`[data-js="mainGameType"]`).forEach((element) => {
      if (element.hasAttribute("id", "active")) {
        element.removeAttribute("id", "active")
      };
    });

    doc.querySelector(`[data-bt="${gameSelected}"]`).setAttribute("id", "active");
    doc.querySelector(`[data-js="name"]`).innerHTML = database.types[`${gameSelected}`].name.toUpperCase();
    doc.querySelector(`[data-js="rule"]`).innerHTML = database.types[`${gameSelected}`].description;
    doc.querySelector(`[data-js="mainGameNumberAll"]`).innerHTML = "";

    // for que vai adicionar a quantidade de números necessário do jogo
    for (let index = 1; index <= database.types[`${gameSelected}`].range; index++) {
      const numberFormatted = ("00" + index).slice(-2);

      doc.querySelector(`[data-js="mainGameNumberAll"]`).innerHTML += `
        <a data-bt="number${numberFormatted}" data-js="mainGameNumber" class="mainGameNumber">${numberFormatted}</a>
      `;
    }

    ToggleSelectionNumber();
  }

  // seleciona o tipo de jogo lotofacil
  doc.querySelector(`[data-bt="lotofacil"]`).addEventListener("click", (event) => {
    event.preventDefault();

    gameSelected = "lotofacil";
    HandleAdjustGameByType();
  });

  // seleciona o tipo de jogo megasena
  doc.querySelector(`[data-bt="megasena"]`).addEventListener("click", (event) => {
    event.preventDefault();

    gameSelected = "megasena";
    HandleAdjustGameByType();
  });

  // seleciona o tipo de jogo quina
  doc.querySelector(`[data-bt="quina"]`).addEventListener("click", (event) => {
    event.preventDefault();

    gameSelected = "quina";
    HandleAdjustGameByType();
  });

  // selecionar a quantidade faltante de número do jogo
  doc.querySelector(`[data-bt="completeGame"]`).addEventListener("click", (event) => {
    event.preventDefault();

    let numberPending = database.types[`${gameSelected}`].minNumber - numberSelected.length;

    // vai gerar e selecionar um número até o numberPending zerar
    while (numberPending > 0) {
      const numberRandom = Math.floor(Math.random() * (database.types[`${gameSelected}`].range - 1)) + 1;
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
    const numberPending = database.types[`${gameSelected}`].minNumber - numberSelected.length;
    if (numberPending !== 0) {
      const plural = numberPending > 1 ? "s" : "";
      return win.alert(`Falta selecionar ${numberPending} número${plural}`)
    }

    // adiciona o valor da aposta no valor total do carrinho
    let valueTotal = ToggleMoneyFormatting(doc.querySelector(`[data-js="valueTotal"]`).innerHTML);
    valueTotal += database.types[`${gameSelected}`].price;
    doc.querySelector(`[data-js="valueTotal"]`).innerHTML = ToggleMoneyFormatting(valueTotal);

    // adiciona a aposta no carrinho de compras
    doc.querySelector(`[data-js="mainCartGameAll"]`).innerHTML += `
    <a data-js="mainCartGame" class="mainCartGame">
      <svg data-js="trash" class="mainCartGameTrash" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>
      </svg>

      <div class="mainCartGameBorder ${gameSelected}">BORDER</div>

      <div class="mainCartGameValue">
        <div class="mainCartGameNumber">${numberSelected.sort().join(", ")}</div>

        <div class="mainCartGameAmount">
          <strong data-js="gameType" class="${gameSelected}">${database.types[`${gameSelected}`].name}</strong>
          <p data-js="value">${ToggleMoneyFormatting(database.types[`${gameSelected}`].price)}</p></p>
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
      });
    });
  });

  doc.querySelector(`[data-bt="save"]`).addEventListener("click", (event) => {
    event.preventDefault();

    if (Number(doc.querySelector(`[data-js="valueTotal"]`).innerHTML) < database.minCartValue) {
      win.alert(`O valor mínimo do carrinho é de ${ToggleMoneyFormatting(database.minCartValue)}`)
    }
  });

  ExecuteApiFake();
})(document, window);
