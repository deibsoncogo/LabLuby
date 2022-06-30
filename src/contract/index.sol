// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC20/ERC20.sol";

contract ProvaBlockchainLabLuby is ERC20 {
    // definindo variáveis
    address private _ownerContract;
    uint256 private _supplyAvailable;
    uint256 private _tax;
    uint256 private _taxWallet;
    bool private _transactionPaused;

    // definindo dicionário de informações
    mapping(address => bool) private _addressVip;

    // o constructor irá criar a moeda e definir informação importantes
    constructor(uint256 supplyInitial, uint256 supplyMax, uint256 tax) ERC20("Deibson Lab Luby", "DLL") {
        require(supplyInitial <= supplyMax, "Valor inicial maior que o valor maximo");

        _ownerContract = msg.sender;
        _addressVip[msg.sender] = true;
        _supplyAvailable = supplyMax - supplyInitial;
        _tax = tax;
        _transactionPaused = false;

        _mint(msg.sender, supplyInitial);
    }

    // verificadores das funções
    modifier isOwnerContract(address account) {
        require(_ownerContract == account, "Voce nao possui autorizacao");
        _;
    }

    modifier transactionStatus() {
        require(_transactionPaused == false, "As transacoes estao pausadas");
        _;
    }

    // função que vai definir clientes vip
    function vipToggle(address account) public isOwnerContract(msg.sender) returns(bool) {
        require(account != _ownerContract, "O proprietario do contrato sempre sera vip");
        _addressVip[account] = !_addressVip[account];
        return _addressVip[account];
    }

    // função que vai alterar a taxa das transações
    function taxUpdate(uint256 tax) public isOwnerContract(msg.sender) {
        require(tax > 0 || tax < 100, "Valor invalido");
        _tax = tax;
    }

    // função que vai alterar se as transações estão pausadas
    function transactionPausedToggle() public isOwnerContract(msg.sender) {
        _transactionPaused = !_transactionPaused;
    }

    // função intermediária para criar moedas
    function mint(address account, uint256 amount) public isOwnerContract(msg.sender) returns(bool) {
        require(amount <= _supplyAvailable, "Saldo insuficiente para criacao destas moedas");
        _mint(account, amount);
        _supplyAvailable -= amount;
        return true;
    }

    // função intermediária para destruir moedas
    function burn(address account, uint256 amount) public isOwnerContract(msg.sender) returns(bool) {
        _burn(account, amount);
        _supplyAvailable += amount;
        return true;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override transactionStatus {}
}
