import { Produto } from '../entities/Produto.js'
import { ProdutoRepository } from '../repository/ProdutoRepository.js'

export class ProdutoService {
    constructor(private produtoRepositoty: ProdutoRepository) {}

    async adicionarProduto(
    nome: string,
    quantidade: number
  ): Promise<Produto> {
    return this.produtoRepositoty.adicionarProduto(nome, quantidade)
  }

  async listarProdutos(): Promise<Produto[]> {
    return this.produtoRepositoty.listarProdutos()
  }

  async incrementarQuantidade(
    id: number,
    quantidade: number
  ): Promise<Produto | null> {
    if (quantidade <= 0){
        throw new Error('A quantidade a ser incrementada deve ser maior que zero.')
    }

    let produto = await this.produtoRepositoty.obterProdutoPorId(id);
    if(produto === null){
        throw new Error(`Produto com ID ${id} não encontrado`)
    }

    produto = await this.produtoRepositoty.atualizarQuantidade(id, produto.quantidade + quantidade)
    return produto
  }

  async decrementarQuantidade(
    id: number,
    quantidade: number
  ): Promise<Produto | null> {
    if (quantidade <= 0){
        throw new Error('A quantidade a ser decrementada deve ser maior que zero.')
    }
    let produto = await this.produtoRepositoty.obterProdutoPorId(id);
    if(produto === null){
        throw new Error(`Produto com ID ${id} não encontrado`)
    }

    if(produto.quantidade < quantidade){
        throw new Error(`Quantidade não suficiente em estoque para o produto com ID ${id}`)
    }

    const novaQuantidade = produto.quantidade - quantidade;
    produto = await this.produtoRepositoty.atualizarQuantidade(id, novaQuantidade)
    return produto;
}
}