const {
    addReader,
    listReaders,
    listReaderById,
    listReaderBySearch,
    updateReaderService,
    deleteReaderService
} = require("../service/readerService");

const {
    addHistoric
} = require("../service/historicService.js");

const criadoEm = new Date().toLocaleDateString('pt-BR');
const now = new Date().toTimeString().match(/\d{2}:\d{2}:\d{2}/)[0];

async function getReaders(req, res) {
    const readers = await listReaders();
    if (readers.length > 0) {
        return res.status(200).json(readers);
    }
    return res.status(204).send();
} //OK

async function getReaderBySearch(req, res) {
    const { readerSearch } = req.params;
    if (!readerSearch) {
        return res.status(400).json({ message: 'Inserção é obrigatória'});
    }
    const result = await listReaderBySearch(readerSearch);
    if (result && result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(404).json({ message: 'Nada foi encontrado'});
}


async function postReader(req, res) {
    const { nome, cpf, email, telefone, dataNasc} = req.body;
    
    const dateParts = dataNasc.split('/');
  if (dateParts.length !== 3) {
    return res.status(400).json({ message: 'Formato de data inválido. Use o formato DD/MM/YYYY.' });
  }

  const day = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1;
  const year = parseInt(dateParts[2]);

  const isValidDate = !isNaN(day) && !isNaN(month) && !isNaN(year);
  if (!isValidDate) {
    return res.status(400).json({ message: 'Data de nascimento inválida.' });
  }

  const birthDate = new Date(year, month, day);
  if (isNaN(birthDate.getTime())) {
    return res.status(400).json({ message: 'Data de nascimento inválida.' });
  }

  const formattedDate = birthDate.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });


    try {
        const createdReader = await addReader(nome, cpf, email, telefone, formattedDate, criadoEm);
        await addHistoric('Cadastro de leitor registrado', now + ' ' + criadoEm);
        return res.status(201).json({ message: 'Leitor adicionado com sucesso.', data: createdReader  });
    } catch (error) {

        if (error.message === 'CPF já existe!') {
            return res.status(400).json({ message: error.message });
          }
          if (error.message === 'Email já existe!') {
            return res.status(400).json({ message: error.message });
          }
          if (error.message === 'Telefone já existe!') {
            return res.status(400).json({ message: error.message });
          }

          return res.status(500).json({ message: 'Erro ao adicionar leitor.' });
    }
} 

async function updateReader(req, res) {
    const { nome, cpf, email, telefone, dataNasc } = req.body;
    const { readerId } = req.params;
    if (!nome || !cpf || !email || !telefone || !dataNasc) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    try {
        const existingReader = await listReaderById(readerId);
        if (!existingReader) {
            return res.status(404).json({ message: 'Leitor não encontrado.' });
        }
        const updateReader = await updateReaderService(readerId, nome, cpf, email, telefone, dataNasc);
      await addHistoric('Atualização de leitor registada', now + ' ' + criadoEm);
      return res.status(200).json(updateReader);
  } catch (error) {
      console.error('Erro ao atualizar leitor:', error);
      return res.status(500).json({ message: 'Erro ao atualizar leitor.' });
  }
}

async function deleteReader(req, res) {
    const { readerId } = req.params;
    try {
        const existingReader = await listReaderById(readerId);
        if (!existingReader) {
            return res.status(404).json({ message: 'Leitor não encontrado.' });
        }
        await deleteReaderService(readerId);
        await addHistoric('Exclusão de leitor registrada', now + ' ' + criadoEm);
        return res.status(200).json({ message: 'Leitor excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar leitor:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

module.exports = {
    getReaders,
    getReaderBySearch,
    postReader,
    updateReader,
    deleteReader
};
