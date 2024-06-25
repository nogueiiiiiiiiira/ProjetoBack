//bookService back

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// verificando se o livro existe, buscando pelo titulo, autor e categoria.
async function bookExists(title, autor, categoria) {
    const books = await prisma.book.findMany({
        where: {
            AND: [
                {
                    nome: {
                        equals: title
                    }
                },
                {
                    autor: {
                        equals: autor
                    }
                },
                {
                    categoria: {
                        equals: categoria
                    }
                }
            ]
    
            }
        });

        return books.length > 0;
    }

    //atualizando o estoque de livros, que será chamado no bookController, para adicionar mais livros se determinado livro já existir de acordo com o titulo, autor e categoria
    async function updateStock(nome, autor, categoria, quantidade) {
        const existingBook = await prisma.book.findFirst({
            where: {
                AND: [
                    { nome: { equals: nome } },
                    { autor: { equals: autor } },
                    { categoria: { equals: categoria } }
                ]
            }
        });

        const currentStock = parseInt(existingBook.estoque); 
        const updatedStock = currentStock + parseInt(quantidade); 
        await prisma.book.update({
            where: {
                id: existingBook.id
            },
            data: {
                estoque: updatedStock.toString()
            }
        }); 
    }


    //adicionar livro no banco
    async function addBook(nome, descricao, autor, categoria, estoque, classificacaoIdade, criadoEm) {

        if(await bookExists(nome, autor, categoria)){
            throw new Error('Esse livro já existe! Livro adicionado ao estoque!');
        }
    
        return await prisma.book.create({
            data: {
                nome,
                descricao,
                autor,
                categoria,
                estoque,
                classificacaoIdade,
                criadoEm,
            }
        });
    }

//listar os livros 
async function listBooks() {
    return await prisma.book.findMany();
}

//listar livro pelo id
async function listBookById(id) {
    return await prisma.book.findUnique({
        where: {
            id: isNaN(id) ? undefined : Number(id) 
        }
    });
}

//listar livro pelo titulo, autor e categoria, descricao e descricao
async function listBookBySearch(search) {
    return await prisma.book.findMany({
        where: {
            OR: [
                {
                    id: isNaN(search) ? undefined : Number(search)
                },
                {
                    nome: {
                        contains: search
                    }
                },
                {
                    descricao: {
                        contains: search
                    }
                },
                {
                    autor: {
                        contains: search
                    }
                },
                {
                    categoria: {
                        contains: search
                    }
                }
            ]
        }
    });
}

//atualizar os dados do livro pelo id
async function updateBookService(id, nome, descricao, autor, categoria, estoque, classificacaoIdade) {
    return await prisma.book.update({
        where: {
            id: Number(id)
        },
        data: {
            nome,
            descricao,
            autor,
            categoria,
            estoque,
            classificacaoIdade
        }
    });
}

//deletar o livro pelo id
async function deleteBookService(id) {
    return await prisma.book.delete({
        where: {
            id: Number(id)
        }
    });
}

module.exports = {
    addBook,
    listBooks,
    listBookBySearch,
    updateBookService,
    deleteBookService,
    updateStock,
    listBookById
};
