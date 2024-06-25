//service

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

// Verificar se o CPF já existe
async function cpfExists(cpf) {
  const librariansCPF = await prisma.librarian.findFirst({ where: { cpf } });
  const readersCPF = await prisma.reader.findFirst({ where: { cpf } });
  return Boolean(librariansCPF || readersCPF);
}

// Verificar se o email já existe
async function emailExists(email) {
  const librariansEmail = await prisma.librarian.findFirst({ where: { email } });
  const readersEmail = await prisma.reader.findFirst({ where: { email } });
  return Boolean(librariansEmail || readersEmail);
}

//verificar se o telefone já existe
async function telefoneExists(telefone) {
  const librariansTelefone = await prisma.librarian.findFirst({ where: { telefone } });
  const readersTelefone = await prisma.reader.findFirst({ where: { telefone } });
  return Boolean(librariansTelefone || readersTelefone);
}

  //adicionar um novo bibliotecário ao banco de dados
  async function addLibrarian(nome, cpf, email, telefone, dataNasc, senha, criadoEm) {
    if (await cpfExists(cpf)) {
        throw new Error('CPF já existe!');
    }
    if (await emailExists(email)) {
        throw new Error('Email já existe!');
    }
    if (await telefoneExists(telefone)) {
        throw new Error('Telefone já existe!');
    }

    const hashedSenha = await bcrypt.hash(senha, 10);

    return await prisma.librarian.create({
        data: {
            nome,
            cpf,
            email,
            telefone,
            dataNasc,
            senha: hashedSenha,
            criadoEm,
        },
    });
}

//função de login
async function login(email, senha) {
  const librarian = await prisma.librarian.findUnique({
    where: {
      email,
    },
  });

  console.log('Librarian:', librarian); 

  if (!librarian) {
    throw new Error('Bibliotecário não encontrado!');
  }

  const isSenhaValid = await bcrypt.compare(senha, librarian.senha);
  console.log('Is senha valid:', isSenhaValid); 

  if (!isSenhaValid) {
    throw new Error('Senha incorreta!');
  }
  return librarian;
}

  //buscar todos os bibliotecários
async function listLibrarians() {
    return await prisma.librarian.findMany();
}

//buscar biblitocarios por id
async function listLibrarianById(id) {
  return await prisma.Librarian.findUnique({
      where: {
        id: isNaN(id) ? undefined : Number(id) 
      }
  });
}

//buscar bibliotecarios por id, cpf, email, etc...
async function listLibrarianBySearch(search) {
    return await prisma.librarian.findMany({
        where: {
            OR: [
                {
                    id: isNaN(search) ? undefined : Number(search) 
                },
                {
                    cpf: {
                        contains: search
                    }
                },
                {
                    email: {
                        contains: search
                    }
                },
                {
                    telefone: {
                        contains: search
                    }
                },
                {
                    senha: {
                        contains: search
                    }
                }
            ]
        }
    });
}

//atualizar os dados de um bibliotecário
async function updateLibrarianService(id, nome, cpf, email, telefone, dataNasc, senha) {
    return await prisma.librarian.update({
        where: {
            id: Number(id)
        },
        data: {
            nome,
            cpf,
            email,
            telefone,
            dataNasc,
            senha,
        }
    });
}

// deletar um bibliotecário
async function deleteLibrarianService(id) {
    return await prisma.librarian.delete({
        where: {
            id: Number(id)
        }
    });
} 

module.exports = {
  login,
  addLibrarian,
  listLibrarians,
  listLibrarianBySearch,
  updateLibrarianService,
  deleteLibrarianService,
  listLibrarianById,
};