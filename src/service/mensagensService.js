const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addMensagem(nome, assunto, mensagem, telefone, statusMensagem, criadoEm) {
 
    return await prisma.mensagem.create({
      data: {
        nome,
        assunto,
        mensagem,
        telefone,
        statusMensagem,
        criadoEm,
      }
    });
  }

  async function listMensagens() {
    return await prisma.mensagem.findMany();
}

async function deleteMensagemService(id) {
  return await prisma.mensagem.delete({
    where: {
      id: Number(id)
    }
  });
}

async function listMensagemById(id) {
  return await prisma.mensagem.findUnique({
    where: {
      id: Number(id)
    }
  });
}


  module.exports = {
    addMensagem,
    listMensagens,
    deleteMensagemService,
    listMensagemById
  };
  