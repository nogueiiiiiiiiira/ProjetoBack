const { PrismaClient } = require ('@prisma/client');
const prisma = new PrismaClient();

//verificar se o cpf do leitor existe nas multas
async function cpfExists(cpf) {
    const readers = await prisma.fine.findMany({
      where: {
        cpf: {
          equals: cpf,
        },
      },
    });

    return readers.length > 0;
}

//verificar se o id do livro existe nas multas
async function idExists(idLivro) {
    const book = await prisma.fine.findMany({
      where: {
        idLivro: idLivro
      }
    });

    return book!== null;
}

//pagar a multa e atualizar o seu statusPag
async function payFine(cpf, idLivro, statusPag) {
    // Verificar se o CPF existe nas multas
    const cpfExistsResult = await cpfExists(cpf);
    if (!cpfExistsResult) {
        throw new Error('CPF não existe! Não foi possível pagar a multa');
    }

    // Verificar se o ID do livro existe nas multas
    const idExistsResult = await idExists(idLivro);
    if (!idExistsResult) {
        throw new Error('Livro não existe! Não foi possível pagar a multa');
    }

    try {
        // Atualiza todas as multas com base no CPF e no ID do livro
        const updatedFines = await prisma.fine.updateMany({
            where: {
                cpf: cpf,
                idLivro: idLivro
            },
            data: {
                statusPag: statusPag
            }
        });
        return updatedFines;
    } catch (error) {
        console.error('Erro ao pagar a multa:', error);
        throw new Error('Erro ao pagar a multa');
    }
}





//listar todas as multas
async function listFines() {
    return await prisma.fine.findMany();
}

//buscar multa pelo id
async function listFineById(id) {
    return await prisma.fine.findUnique({
        where: {
            id: Number(id)
        }
    });
}

//buscar multa por id, cpf, idLivro, status
async function listFineBySearch(search){
    return await prisma.fine.findMany({
        where: {
            OR: [
                {
                    id: isNaN(search) ? undefined : Number(search)
                },
                {
                    cpf: {
                        contais: search
                    }
                },
                {
                    idLivro: Number(search)
                },
                {
                    statusPag: {
                        contais: search
                    }
                }
            ]
        }
    });
}


//atualizar a multa
async function updateFineService(id, cpf, idLivro){
    return await prisma.fine.update({
        where: {
            id: Number(id)
        },
        data: {
            cpf,
            idLivro
        }
    });
}

//excluir a multa
async function deleteFineService(id){
    return await prisma.fine.delete({
        where: {
            id: Number(id)
        }
    });
}

module.exports = {
    payFine,
    listFines,
    listFineById,
    listFineBySearch,
    updateFineService,
    deleteFineService
}