const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addRespostas( mensagem, assunto, telefoneLeitor, criadoEm) {
 
    return await prisma.resposta.create({
      data: {
        mensagem,
        assunto,
        telefoneLeitor,
        criadoEm,
      }
    });
  }

  async function listRespostas() {
    return await prisma.resposta.findMany();
}


async function listRespostasById(id) {
  return await prisma.resposta.findUnique({
    where: {
      id: Number(id)
    }
  });
}

async function updateMensagemStatus(mensagemId) {
    try {
      await prisma.mensagem.update({
        where: {
          id: mensagemId,
        },
        data: {
          statusMensagem: 'Mensagem respondida',
        },
      });
    } catch (error) {
      console.error('Erro ao atualizar status da mensagem:', error);
    }
  }

  module.exports = {
    addRespostas,
    listRespostas,
    listRespostasById,
    updateMensagemStatus
  };
  