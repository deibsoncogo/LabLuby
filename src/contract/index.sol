// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC20/ERC20.sol";

contract ProvaBlockchainLabLuby is ERC20 {
    // definindo variáveis
    address private owner;
    uint256 private supplyAvailable;
    uint256 private taxPercentage;
    bool private isTransactionsPause;

    // definindo dicionário de informações
    mapping(address => bool) private addressVip;

    // o constructor irá criar a moeda e definir informação importantes
    constructor(uint256 _supplyInitial, uint256 _supplyMax, uint256 _taxPercentage) ERC20("Deibson Lab Luby", "DLL") {
        require(_supplyInitial <= _supplyMax, "Valor inicial maior que o valor maximo");

        owner = msg.sender;
        supplyAvailable = _supplyMax - _supplyInitial;
        taxPercentage = _taxPercentage;
        isTransactionsPause = false;

        _mint(msg.sender, _supplyInitial);
    }

    // verificadores para funções
    modifier StatusTransactions() {
        require(isTransactionsPause == false, "As transacoes estao pausadas");
        _;
    }

    // função que vai gerenciar a criação de moedas
    function CreateCoin(address _account, uint256 _supply) external StatusTransactions {
        require(_supply <= supplyAvailable, "Saldo insuficiente para criacao destas moedas");

        supplyAvailable -= _supply;

        _mint(_account, _supply);
    }

    // função que vai definir clientes vip
    function ToggleVip(address _account, bool _status) external {
        addressVip[_account] = _status;
    }

    // função que vai alterar a taxa das transações
    function UpdateTax(uint256 _taxPercentage) external {
        taxPercentage = _taxPercentage;
    }

    // função que vai alterar se as transações estão pausadas
    function ToggleStatuTransaction() external {
        isTransactionsPause = !isTransactionsPause;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override StatusTransactions {}
}
