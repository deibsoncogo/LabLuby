// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC20/ERC20.sol";

contract ProvaBlockchainLabLuby is ERC20 {
    // definindo variáveis
    address private owner;
    uint256 private supplyAvailable;

    // definindo dicionário de informações
    mapping(address => bool) private addressVip;

    // o constructor irá criar a moeda e definir informação importantes
    constructor(uint256 _supplyInitial, uint256 _supplyMax) ERC20("Deibson Lab Luby", "DLL") {
        require(_supplyInitial <= _supplyMax, "Valor inicial maior que o valor maximo");

        owner = msg.sender;
        supplyAvailable = _supplyMax - _supplyInitial;

        _mint(msg.sender, _supplyInitial);
    }

    // função que vai gerenciar a criação de moedas
    function CreateCoin(address _account, uint256 _supply) external {
        require(_supply <= supplyAvailable, "Saldo insuficiente para criacao destas moedas");

        supplyAvailable -= _supply;

        _mint(_account, _supply);
    }

    // função que vai definir clientes vip
    function ToggleVip(address _account, bool _status) external {
        addressVip[_account] = _status;
    }
}
