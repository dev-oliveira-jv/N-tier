import { prisma } from '../lib/prisma'
import { Produto } from '../entities/Produto';

export class ProdutoRepository {
    async adicionarProduto(nome: string, quantidade: number): Promise<Produto> {
        const produto = await prisma.produto.create({
            data: { nome, quantidade},
        })
        return new Produto(
            produto.id,
            produto.nome,
            produto.quantidade,
            produto.createdAt,
            produto.updatedAt
        )
    }
    async listarProdutos(): Promise<Produto[]> {
        const produtos = await prisma.produto.findMany()
        return produtos.map(
            (produto) =>
                new Produto(
                    produto.id,
                    produto.nome,
                    produto.quantidade,
                    produto.createdAt,
                    produto.updatedAt
                )
        )
    }

    async atualizarQuantidade(
        id: number,
        quantidade: number
    ): Promise<Produto | null> {
        const produto = await prisma.produto.update({
            where: { id },
            data: { quantidade },
        })
        return new Produto(
            produto.id,
            produto.nome,
            produto.quantidade,
            produto.createdAt,
            produto.updatedAt
        )
    }

    async obterProdutoPorId(id: number): Promise<Produto | null> {
        const produto = await prisma.produto.findUnique({
            where: { id }
        })
        if(!produto) {
            return null
        }
        return new Produto(
            produto.id,
            produto.nome,
            produto.quantidade,
            produto.createdAt,
            produto.updatedAt
        )
    }
}