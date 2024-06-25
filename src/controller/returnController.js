
//returnController

const {
  addReturn,
  listReturns,
  listReturnById,
  listReturnBySearch,
  updateReturnService,
  deleteReturnService,
  updateStock,
  addFine,
  updateLoan
} = require("../service/returnService");

const { 
  getReaderAndBookNames
} = require("../service/loanService"); 

const {
  addHistoric
} = require ("../service/historicService");

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const criadoEm = new Date().toLocaleDateString('pt-BR');
const now = new Date().toTimeString().match(/\d{2}:\d{2}:\d{2}/)[0];

function formatDate(date) {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}


async function getReturns(req, res) {
  const returns = await listReturns();
  if (returns.length > 0) {
      return res.status(200).json(returns);
  }
  return res.status(204).send();
}

async function getReturnBySearch(req, res) {
  const { returnSearch } = req.params;
  if (!returnSearch) {
      return res.status(400).json({ message: 'Inserção é obrigatória.' });
  }
  const result = await listReturnBySearch(returnSearch);
  if (result && result.length > 0) {
      return res.status(200).json(result);
  }
  return res.status(204).send();
}

async function postReturn(req, res) {
  const { cpf, idLivro } = req.body;

  if (!cpf || !idLivro) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    const loan = await prisma.loan.findFirst({
      where: {
        idLivro: idLivro
      }
    });

    if (!loan) {
      throw new Error('Livro não existe! Não foi possível realizar a devolução');
    }

    const { nomeLeitor, nomeLivro } = await getReaderAndBookNames(cpf, idLivro);
    console.log('Got reader and book names:', nomeLeitor, nomeLivro);
    
    const [dia, mes, ano] = loan.dataDev.split('/');
    const prevDev = formatDate(`${ano}-${mes}-${dia}`);
    const dataAtual = new Date();
    const criadoEm = formatDate(dataAtual);
    const prevDevDate = new Date(`${ano}-${mes}-${dia}`);
    const multaAtribuida = dataAtual.getTime() > prevDevDate.getTime() ? 'Sim' : 'Não';

    if (multaAtribuida === 'Sim') {
      const diasAtra = Math.round((dataAtual.getTime() - prevDevDate.getTime()) / (1000 * 3600 * 24));
      const total = diasAtra * 1;
      const statusPag = 'Não pago';
      await addFine(cpf, nomeLeitor, idLivro, nomeLivro, diasAtra.toString(), total.toString(), statusPag, criadoEm);
      await addHistoric('Devolução registrada', now + ' ' + criadoEm);
      await addHistoric('Multa registrada', now + ' ' + criadoEm);
    }

    await addReturn(cpf, nomeLeitor, idLivro, nomeLivro, prevDev, criadoEm, multaAtribuida);
    await addHistoric('Devolução registrada', now + ' ' + criadoEm);
    await updateStock(idLivro);
    await updateLoan(idLivro, { statusDev: 'Livro devolvido' });

    return res.status(201).json({ message: 'Devolução realizada com sucesso.' });

  } catch (error) {
    console.error('Erro ao realizar devolução:', error);
    return res.status(500).json({ message: `Erro ao realizar devolução: ${error.message}` });
  }
}

async function updateReturn(req, res) {
  const { cpf, idLivro } = req.body;
  const { idReturn } = req.params;

  if (!cpf ||!idLivro) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  if (!Number(idReturn)) {
    return res.status(400).json({ message: 'ID de devolução inválido.' });
  }

  try {
    const existingReturn = await listReturnById(Number(idReturn));
    if (!existingReturn) {
      return res.status(404).json({ message: 'Devolução não encontrada.' });
    }

    const updateReturn = await updateReturnService(idReturn, cpf, idLivro);
    await addHistoric('Atualização de devolução registrado', now + ' ' + criadoEm);
    return res.status(200).json(updateReturn);
  } catch (error) {
    console.error('Erro ao atualizar devolução:', error);
    return res.status(500).json({ message: 'Erro ao atualizar devolução.' });
  }
}

async function deleteReturn(req, res) {
  const { idReturn } = req.params;

  if (!Number(idReturn)) {
    return res.status(400).json({ message: 'ID de devolução inválido.' });
  }

  try {
    const existingReturn = await listReturnById(Number(idReturn));
    if (!existingReturn) {
      return res.status(404).json({ message: 'Devolução não encontrada.' });
    }

    await deleteReturnService(Number(idReturn));
    await addHistoric('Exclusão de devolução registrada', now + ' ' + criadoEm);
    return res.status(200).json({ message: 'Devolução deletada com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar devolução:', error);
    return res.status(500).json({ message: 'Erro ao deletar devolução.' });
  }
}

module.exports = {
  getReturns,
  getReturnBySearch,
  postReturn,
  updateReturn,
  deleteReturn
}
