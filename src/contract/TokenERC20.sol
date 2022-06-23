// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DeibsonLabLubyToken is ERC20 {
    // definindo variavies
    uint256 private _totalSupply;

    // serve para guardar valores
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    // serve para criar a moeda
    constructor(uint256 initialSupply) ERC20("Deibson Lab Luby", "DLL") {
        _mint(msg.sender, initialSupply);
    }

    // função que vai ler a quantidade de tokens disponivel
    function totalSupply() public override view returns(uint256) {
        return _totalSupply;
    }

    // função que vai criar e ler a variável principal privada _decimals
    function decimals() public override pure returns(uint8) {
        return 6;
    }

    // função que le o saldo de uma carteira
    function balanceOf(address _owner) public override view returns(uint256) {
        return _balances[_owner];
    }

    // função que vai transferir um valor do proprietário para outro
    function transfer(address recipient, uint256 amount) public override returns(bool) {
        _transfer(msg.sender, recipient, amount);

        return true;
    }

    // função que vai transferir um valor do de um cliente para outro
    function transferFrom(address sender, address recipient, uint256 amount) public override returns(bool) {
        require(_allowances[sender][msg.sender] >= amount, "ERC20: Valor maior que o autorizado");

        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, _allowances[sender][msg.sender] - amount);

        return true;
    }

    // função que executar uma transferencia de valor entre contas
    function _transfer(address sender, address recipient, uint256 amount) internal override {
        // verifica se possui saldo suficiente para a transferencia
        require(_balances[sender] >= amount, "ERC20: Saldo insuficiente para a tranferencia");

        // unchecked certifica que os valores são do tamanho de 256 caracteres
        unchecked { _balances[sender] -= amount; }
        unchecked { _balances[recipient] += amount; }

        // emite o evento obrigatório valando que foi executado a transferencia
        emit Transfer(sender, recipient, amount);
    }

    // função que vai autorizar tranferencias por terceiro
    function approve(address spender, uint256 amount) public override returns(bool) {
        _approve(msg.sender, spender, amount);

        return true;
    }

    // função que vai aumentar o valor de tranferencias autorizada por terceiro
    function increaseAllowance(address spender, uint256 addedValue) public override returns(bool) {
        _approve(msg.sender, spender, _allowances[msg.sender][spender] += addedValue);

        return true;
    }

    // função que vai diminuir o valor de tranferencias autorizada por terceiro
    function decreaseAllowance(address spender, uint256 subtractedValue) public override returns(bool) {
        require(_allowances[msg.sender][spender] >= subtractedValue, "ERC20: Valor a ser retinado maior que autorizado");

        _approve(msg.sender, spender, _allowances[msg.sender][spender] -= subtractedValue);

        return true;
    }

    // função que definir um cliente autorizado e seu limite
    function _approve(address owner, address spender, uint256 amount) internal override {
        unchecked { _allowances[owner][spender] = amount; }

        emit Approval(owner, spender, amount);
    }

    // função que vai definir o valor inicial do contrato
    function _mint(address account, uint256 amount) internal override {
        unchecked { _totalSupply += amount; }
        unchecked { _balances[account] += amount; }

        emit Transfer(address(0), account, amount);
    }
}
