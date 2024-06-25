const {
    addMensagem,
    listMensagens,
    listMensagemById,
    deleteMensagemService
} = require("../service/mensagensService");

const { 
    sendWhatsAppMessage
 } = require("../service/whatsappService");

 const {
    addHistoric
} = require("../service/historicService.js");

const criadoEm = new Date().toISOString().slice(0, 10).split('-').join('/');

async function getMensagens(req, res) {
    const mensagens = await listMensagens();
    if (mensagens.length > 0) {
        return res.status(200).json(mensagens);
    }
    return res.status(204).send();
}

async function postMensagem(req, res) {
    const { nome, assunto, mensagem, telefone } = req.body;
  
    if (!nome || !assunto || !mensagem || !telefone) {
      return res.status(400).json({ message: 'O preenchimento de todos os campos é obrigatório' });
    }
  
    try {
      await addMensagem(nome, assunto, mensagem, telefone, 'Não respondida', criadoEm);
      const phoneNumber = `+55${telefone.replace(/\D/g, '')}`;
      const phoneNumberRegex = /^\+?[1-9][0-9]{1,14}$/;
      if (!phoneNumberRegex.test(phoneNumber)) {
        throw new Error('Invalid phone number format');
      }
      const message = 'Mensagem enviada com sucesso!;'
      await sendWhatsAppMessage(phoneNumber, message);
      return res.status(201).json({ message: 'Mensagem enviada com sucesso' });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      return res.status(500).json({ message: 'Erro ao enviar mensagem' });
    }
  }

  async function deleteMensagem(req, res) {
    const { mensagemId } = req.params;
    try {
        const existingMensagem = await listMensagemById(mensagemId);
        if (!existingMensagem) {
            return res.status(404).json({ message: 'Mensagem não encontrada.' });
        }
        await deleteMensagemService(mensagemId);
        await addHistoric('Exclusão de mensagem registrada', criadoEm);
        return res.status(200).json({ message: 'Mensagem excluída com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar mensagem:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

module.exports = {
    postMensagem,
    getMensagens,
    deleteMensagem
}