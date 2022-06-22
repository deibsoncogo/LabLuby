// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DeibsonLabLubyToken is ERC20 {
  // definindo as variáveis principais de forma privada
  uint256 private _totalSupply;

  // serve para guardar valores
  mapping(address => uint256) private _balances; // vai guarda o saldo das carteiras
  mapping(address => mapping(address => uint256)) private _allowances; // vai guardar permições e seus valores

  // vai criar o valor inicial do token
  constructor(uint256 initialSupply) ERC20("Deibson Lab Luby", "DLL") {
    _mint(msg.sender, initialSupply);
  }

  function totalSupply() public override view returns(uint256) {
    return _totalSupply;
  }

  // criando a função que vai criar e ler a variável principal privada _decimals
  function decimals() public override pure returns(uint8) {
    return 6;
  }

  // vai retornar o saldo de uma carteira
  function balanceOf(address _owner) public override view returns(uint256) {
    return _balances[_owner];
  }

  // função que vai executar uma transferencia pelo dono
  function transfer(address recipient, uint256 amount) public override returns(bool) {
    _transfer(msg.sender, recipient, amount);

    return true;
  }

  // função que vai executar uma transferencia por um terceiro
  function transferFrom(address sender, address recipient, uint256 amount) public override returns(bool) {
    require(_allowances[sender][msg.sender] >= amount, "ERC20: Valor maior que o autorizado");

    _transfer(sender, recipient, amount);
    _approve(sender, msg.sender, _allowances[sender][msg.sender] - amount);

    return true;
  }

  // vai executar a transferencia de valor entre contas
  function _transfer(address sender, address recipient, uint256 amount) internal override {
    require(_balances[sender] >= amount, "ERC20: Saldo insuficiente para a tranferencia");

    // unchecked certifica que os valores são do tamanho de 256 caracteres
    unchecked { _balances[sender] -= amount; } // executa a saída do valor na carteira
    unchecked { _balances[recipient] += amount; } // executa a entrada do valor na carteira

    // emite o evento obrigatório valando que foi executado a transferencia
    emit Transfer(sender, recipient, amount);
  }

  // função que vai definir uma autorização e seu valor
  function approve(address spender, uint256 amount) public override returns(bool) {
    _approve(msg.sender, spender, amount);

    return true;
  }

  // função que vai aumentar o valor da autorização
  function increaseAllowance(address spender, uint256 addedValue) public override returns(bool) {
    _approve(msg.sender, spender, _allowances[msg.sender][spender] += addedValue);

    return true;
  }

  // função que vai diminuir o valor da autorização
  function decreaseAllowance(address spender, uint256 subtractedValue) public override returns(bool) {
    require(_allowances[msg.sender][spender] >= subtractedValue, "ERC20: Valor a ser retinado maior que autorizado");

    unchecked { _approve(msg.sender, spender, _allowances[msg.sender][spender] -= subtractedValue); }

    return true;
  }

  // função que executar a autorização com seu valor
  function _approve(address owner, address spender, uint256 amount) internal override {
    _allowances[owner][spender] = amount;

    emit Approval(owner, spender, amount);
  }

  function _mint(address account, uint256 amount) internal override {
    _totalSupply += amount;
    _balances[account] += amount;

    emit Transfer(address(0), account, amount);
  }
}
