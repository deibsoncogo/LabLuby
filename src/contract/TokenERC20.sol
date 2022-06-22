pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DeibsonLabLubyToken is ERC20 {
  /** método ágil de criar todas itens necessário do contrato
  constructor() ERC20("Deibson Lab Luby", "DLL") {}
  */

  // definindo as variáveis principais de forma privada
  string private _name;
  string private _symbol;
  uint256 private _totalSupply;
  // uint8 private _decimals; // esta variável está sendo criada de forma estatica

  // vai guarda o saldo das carteiras
  mapping(address => uint256) private _balances;

  // vai criar o valor inicial do token
  constructor() {
    _totalSupply = 1000000;
    _balances[msg.sender] = _totalSupply;
  }

  // criando funções para ler as variáveis principais privadas de forma externa
  function name() public override view returns(string memory) {
    return _name;
  }

  function symbol() public override view returns(string memory) {
    return _symbol;
  }

  function totalSupply() public override view returns(uint256) {
    return _totalSupply;
  }

  // criando a função que vai criar e ler a variável principal privada _decimals
  function decimals() public override pure returns(uint8) {
    return 18;
  }
}
