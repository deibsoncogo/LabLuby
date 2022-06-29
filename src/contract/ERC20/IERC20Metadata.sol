// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (token/ERC20/extensions/IERC20Metadata.sol)

pragma solidity ^0.8.0;

import "./IERC20.sol";

/** @dev Interface para as funções opcionais de metadados do padrão ERC20 _Disponível desde a v4.1 */
interface IERC20Metadata is IERC20 {
    /** @dev Retorna o nome do token */
    function name() external view returns (string memory);

    /** @dev Retorna o símbolo do token */
    function symbol() external view returns (string memory);

    /** @dev Retorna as casas decimais do token */
    function decimals() external view returns (uint8);
}
