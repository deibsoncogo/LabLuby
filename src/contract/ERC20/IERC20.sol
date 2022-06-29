// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.6.0) (token/ERC20/IERC20.sol)

pragma solidity ^0.8.0;

/** @dev Interface do padrão {ERC20} conforme definido no EIP */
interface IERC20 {
    /** @dev Emitido quando tokens `value` são movidos de uma conta (`from`) para outra (`to`)
     * Nota: Esse `value` pode ser zero
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /** @dev Emitido quando a permissão de um `spender` para um `owner` é definida por uma chamada para {approve}
     * `value` é o novo subsídio
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /** @dev Retorna a quantidade de tokens existentes */
    function totalSupply() external view returns (uint256);

    /** @dev Retorna a quantidade de tokens de propriedade de `account` */
    function balanceOf(address account) external view returns (uint256);

    /** @dev Move tokens `amount` da conta do chamador para `to`
     * Retorna um valor booleano indicando se a operação foi bem-sucedida
     * Emite um evento {Transfer}
     */
    function transfer(address to, uint256 amount) external returns (bool);

    /** @dev Retorna o número restante de tokens que o `spender` será
     * permitido gastar em nome do `proprietário` por meio de {transferFrom}
     * Este é zero por padrão
     *
     * Este valor muda quando {approve} ou {transferFrom} são chamados
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /** @dev Define `amount` como a permissão de `spender` sobre os tokens do chamador
     * Retorna um valor booleano indicando se a operação foi bem-sucedida
     *
     * Importante: Cuidado que alterar uma provisão com este método traz o risco
     * que alguém pode usar tanto o antigo quanto o novo subsídio por ordenação de transação infeliz
     * Uma solução possível para mitigar essa condição de corrida é primeiro reduzir a mesada do gastador
     * para 0 e depois defina o valor desejado,https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emite um evento {Approval}
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /** @dev Move tokens `amount` de `from` para `to` usando a permissão
     * mecanismo `amount` é então deduzido do subsídio do chamador
     *
     * Retorna um valor booleano indicando se a operação foi bem-sucedida
     * Emite um evento {Transfer}
     */
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}
