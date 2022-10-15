// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.6.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;

import "./IERC20.sol";
import "./IERC20Metadata.sol";
import "./Context.sol";

/** @dev Implementação da interface {IERC20}
 * Esta implementação é independente da forma como os tokens são criados
 * Isso significa que um mecanismo de fornecimento deve ser adicionado em um contrato derivado usando {_mint}
 * Para um mecanismo genérico, consulte {ERC20PresetMinterPauser}
 *
 * DICA: Para uma redação detalhada, consulte nosso guia
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How to implement supply mechanisms]
 *
 * Seguimos as diretrizes gerais de Contratos OpenZeppelin
 * As funções são revertidas em vez de retornar `false` em caso de falha
 * Esse comportamento ainda é convencional e não conflita com as expectativas do ERC20 formulários
 *
 * Além disso, um evento {Approval} é emitido em chamadas para {transferFrom}
 * Isso permite que os aplicativos reconstruam a provisão para todas as contas apenas ouvindo os referidos eventos
 * Outras implementações do EIP podem não emitir esses eventos, pois não é exigido pela especificação
 *
 * Finalmente, o padrão {decreaseAllowance} e {increaseAllowance} funções foram adicionadas para mitigar
 * os problemas conhecidos em torno da configuração subsídios
 * Consulte {IERC20-aprovado}
 */
contract ERC20 is Context, IERC20, IERC20Metadata {
    /** @dev Defini variáveis que vai ser utilizada em toda aplicação */
    uint256 private _totalSupply;
    string private _name;
    string private _symbol;

    /** @dev Defini dicionários que vai ser utilizada em toda aplicação */
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    /** @dev Define os valores para {name} e {symbol}
     * O valor padrão de {decimals} é 18
     * Para selecionar um valor diferente para {decimals} você deve sobrecarregá-lo
     *
     * Todos esses dois valores são imutáveis: eles só podem ser definidos uma vez durante construção
     */
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    /** @dev Retorna o nome do token */
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    /** @dev Retorna o símbolo do token, geralmente uma versão mais curta do nome */
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    /** @dev Retorna o número de decimais usados para obter sua representação do usuário
     * Por exemplo, se `decimals` for 2, um saldo de tokens 505 deve
     * ser exibido para um usuário como 5.05 (505 / 10 ** 2)
     *
     * Os tokens geralmente optam por um valor de 18, imitando a relação entre Éter e Wei
     * Este é o valor que {ERC20} usa, a menos que esta função seja substituído
     *
     * Nota: Esta informação é usada apenas para fins de _exibição_
     * em de forma alguma afeta qualquer aritmética do contrato, incluindo
     * {IERC20-balanceOf} e {IERC20-transfer}
     */
    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

    /** @dev Ver {IERC20-totalSupply} */
    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    } /** Retorna a quantidade de tokens já criado */

    /** @dev Ver {IERC20-balanceOf} */
    function balanceOf(address account) public view virtual override returns (uint256) {
        return _balances[account];
    } /** Retornar a quantidade de tokens de uma carteira */

    /** @dev Ver {IERC20-transfer}
     * Requisitos
     * - `to` não pode ser o endereço zero
     * - o chamador deve ter um saldo de pelo menos `amount`
     */
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    } /** Transfere tokens da carteira do proprietário para outra */

    /** @dev Ver {IERC20-allowance} */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    } /** Verifica o saldo que o terceiro tem para poder transferir */

    /** @dev Ver {IERC20-approve}
     * Nota: Se `amount` for o máximo `uint256`, a permissão não será atualizada em `transferFrom`
     * Isso é semanticamente equivalente a uma aprovação infinita
     *
     * Requisitos
     * - `spender` não pode ser o endereço zero
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, amount);
        return true;
    } /** Autoriza um terceiro a realizar tranferencias definindo um valor */

    /** @dev Ver {IERC20-transferFrom}
     * Emite um evento {Approval} indicando a franquia atualizada
     * Isso não é exigido pelo EIP
     * Veja a nota no início de {ERC20}
     *
     * Nota: Não atualiza o abono se o abono atual é o máximo `uint256`
     *
     * Requisitos:
     * - `from` e `to` não podem ser o endereço zero
     * - `from` deve ter um saldo de pelo menos `amount`
     * - o chamador deve ter permissão para tokens de `from` de pelo menos `amount`
     */
    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    } /** Transfere tokens da carteira de um terceiro para outra */

    /** @dev Aumenta atomicamente a permissão concedida ao `spender` pelo chamador
     * Esta é uma alternativa para {approve} que pode ser usada como mitigação para
     * problemas descritos em {IERC20-approve}
     *
     * Emite um evento {Approval} indicando a franquia atualizada
     *
     * Requisitos
     * - `spender` não pode ser o endereço zero
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, allowance(owner, spender) + addedValue);
        return true;
    } /** Aumenta o valor de autorização de transferencia por terceiro */

    /** @dev Diminui atomicamente a permissão concedida ao `spender` pelo chamador
     * Esta é uma alternativa para {approve} que pode ser usada como mitigação para
     * problemas descritos em {IERC20-approve}
     *
     * Emite um evento {Approval} indicando a franquia atualizada
     *
     * Requisitos
     * - `spender` não pode ser o endereço zero
     * - `spender` deve ter permissão para o chamador de pelo menos `subtractedValue`
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        address owner = _msgSender();
        uint256 currentAllowance = allowance(owner, spender);
        require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
        unchecked { _approve(owner, spender, currentAllowance - subtractedValue); }
        return true;
    } /** Diminui o valor de autorização de transferencia por terceiro */

    /** @dev Move `amount` de tokens de `from` para `to`
     * Esta função interna é equivalente a {transfer}, e pode ser usada para por exemplo
     * Implementar taxas automáticas de token, mecanismos de corte, etc
     *
     * Emite um evento {Transfer}
     *
     * Requisitos
     * - `from` não pode ser o endereço zero
     * - `to` não pode ser o endereço zero
     * - `from` deve ter um saldo de pelo menos `amount`
     */
    function _transfer(address from, address to, uint256 amount) internal virtual {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");
        _beforeTokenTransfer(from, to, amount);
        uint256 fromBalance = _balances[from];
        require(fromBalance >= amount, "ERC20: transfer amount exceeds balance");
        unchecked { _balances[from] = fromBalance - amount; }
        _balances[to] += amount;
        emit Transfer(from, to, amount);
        _afterTokenTransfer(from, to, amount);
    }

    /** @dev Cria tokens `amount` e os atribui a `account`, aumentando o fornecimento total
     * Emite um evento {Transfer} com `from` definido para o endereço zero
     *
     * Requisitos
     * - `account` não pode ser o endereço zero
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);
        _afterTokenTransfer(address(0), account, amount);
    }

    /** @dev Destrói tokens `amount` de `account`, reduzindo o fornecimento total
     * Emite um evento {Transfer} com `to` definido para o endereço zero
     *
     * Requisitos
     * - `account` não pode ser o endereço zero
     * - `account` deve ter pelo menos tokens `amount`
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");
        _beforeTokenTransfer(account, address(0), amount);
        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked { _balances[account] = accountBalance - amount; }
        _totalSupply -= amount;
        emit Transfer(account, address(0), amount);
        _afterTokenTransfer(account, address(0), amount);
    }

    /** @dev Define `amount` como a permissão de `spender` sobre os tokens do `owner`
     * Esta função interna é equivalente a `approve`, e pode ser usada para por exemplo
     * Definir permissões automáticas para determinados subsistemas, etc
     *
     * Emite um evento {Approval}
     *
     * Requisitos
     * - `owner` não pode ser o endereço zero
     * - `spender` não pode ser o endereço zero
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");
        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    /** @dev Atualiza a permissão do `owner` para `spender` com base no `amount` gasto
     * Não atualiza o valor da franquia em caso de franquia infinita
     * Reverta se não houver subsídio suficiente disponível
     *
     * Pode emitir um evento {Approval}
     */
    function _spendAllowance(address owner, address spender, uint256 amount) internal virtual {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= amount, "ERC20: insufficient allowance");
            unchecked { _approve(owner, spender, currentAllowance - amount); }
        }
    }

    /** @dev Hook que é chamado antes de qualquer transferência de tokens, isso inclui cunhagem e queima
     * Condições de chamada
     * - quando `from` e `to` são ambos diferentes de zero, `amount` dos tokens `from` será transferido para `to`
     * - quando `from` for zero, tokens `amount` serão cunhados para `to`
     * - quando `to` for zero, `amount` dos tokens `from` serão queimados
     * - `from` e `to` nunca são ambos zero
     *
     * Para saber mais sobre ganchos, acessexref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks]
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual {}

    /** @dev Hook que é chamado após qualquer transferência de tokens. Isso inclui cunhagem e queima
     * Condições de chamada:
     * - quando `from` e `to` são ambos diferentes de zero, `amount` dos tokens `from` foi transferido para `to`
     * - quando `from` é zero, tokens `amount` foram cunhados para `to`
     * - quando `to` for zero, `amount` dos tokens `from` foram queimados
     * - `from` e `to` nunca são ambos zero
     *
     * Para saber mais sobre ganchos, acessexref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _afterTokenTransfer(address from, address to, uint256 amount) internal virtual {}
}
