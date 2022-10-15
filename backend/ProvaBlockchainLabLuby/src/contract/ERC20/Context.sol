// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity ^0.8.0;

/** @dev Fornece informações sobre o contexto de execução atual, incluindo o remetente da transação
 * e seus dados, embora estes estejam geralmente disponíveis via msg.sender e msg.data, eles não devem
 * ser acessados de forma tão direta forma, pois ao tratar de meta-transações a conta que envia e pagando
 * pela execução pode não ser o remetente real (No que diz respeito a um aplicativo está preocupado)
 *
 * Este contrato é necessário apenas para contratos intermediários do tipo biblioteca
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}
