const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cpfExists(cpf) {
  const librariansCPF = await prisma.librarian.findMany({
    where: {
      cpf: {
        equals: cpf,
      },
    },
  });

  const readersCPF = await prisma.reader.findMany({
    where: {
      cpf: {
        equals: cpf,
      },
    },
  });

  return librariansCPF.length > 0 || readersCPF.length > 0;
}

async function emailExists(email) {
  const librariansEmail = await prisma.librarian.findMany({
    where: {
      email: {
        equals: email,
      },
    },
  });

  const readersEmail = await prisma.reader.findMany({
    where: {
      email: {
        equals: email,
      },
    },
  });

  return librariansEmail.length > 0 || readersEmail.length > 0;
}

async function telefoneExists(telefone) {
  const librariansTelefone = await prisma.librarian.findMany({
    where: {
      telefone: {
        equals: telefone,
      },
    },
  });

  const readersTelefone = await prisma.reader.findMany({
    where: {
      telefone: {
        equals: telefone,
      },
    },
  });

  return librariansTelefone.length > 0 || readersTelefone.length > 0;
}

async function addReader(nome, cpf, email, telefone, dataNasc, criadoEm) {
  if (await cpfExists(cpf)) {
    throw new Error('CPF já existe!');
  }
  if (await emailExists(email)) {
    throw new Error('Email já existe!');
  }
  if (await telefoneExists(telefone)) {
    throw new Error('Telefone já existe!');
  }

  return await prisma.reader.create({
    data: {
      nome,
      cpf,
      email,
      telefone,
      dataNasc,
      criadoEm,
    }
  });
}

async function listReaders() {
  return await prisma.reader.findMany();
}

async function listReaderById(id) {
  return await prisma.reader.findUnique({
    where: {
      id: Number(id)
    }
  });
}

async function listReaderBySearch(cpf) {
  return await prisma.reader.findMany({
    where: {
      cpf: {
        equals: cpf,
      },
    },
  });
}

async function updateReaderService(id, nome, cpf, email, telefone, dataNasc) {
  return await prisma.reader.update({
    where: {
      id: Number(id)
    },
    data: {
      nome,
      cpf,
      email,
      telefone,
      dataNasc,
    }
  });
}

async function deleteReaderService(id) {
  return await prisma.reader.delete({
    where: {
      id: Number(id)
    }
  });
}

module.exports = {
  addReader,
  listReaders,
  listReaderBySearch,
  updateReaderService,
  deleteReaderService,
  listReaderById
};
