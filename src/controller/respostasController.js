const {
    addRespostas,
    listRespostas,
    updateMensagemStatus
  } = require("../service/respostasService");
  
  const {
    sendWhatsAppMessage
  } = require("../service/whatsappService");
  
  const {
    addHistoric
  } = require("../service/historicService.js");
  
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
  
  const jwt = require('jsonwebtoken');
  const criadoEm = new Date().toISOString().slice(0, 10).split('-').join('/');
  const now = new Date().toTimeString().match(/\d{2}:\d{2}:\d{2}/)[0];
  
  async function getRespostas(req, res) {
    const mensagens = await listRespostas();
    if (mensagens.length > 0) {
      return res.status(200).json(mensagens);
    }
    return res.status(204).send();
  }
  
  async function postRespostas(req, res) {
    const { mensagem, telefoneLeitor } = req.body;
    if (!mensagem ||!telefoneLeitor) {
      return res.status(400).json({ message: 'O preenchimento de todos os campos é obrigatório' });
    }
    try {
      const phoneNumber = `+55${telefoneLeitor.replace(/\D/g, '')}`;
      const phoneNumberRegex = /^\+?[1-9][0-9]{1,14}$/;
      if (!phoneNumberRegex.test(phoneNumber)) {
        throw new Error('Invalid phone number format');
      }
  
      const mensagemId = await prisma.mensagem.findFirst({
        where: {
          telefone: telefoneLeitor,
        },
        select: {
          id: true,
        },
      });
  
      if (!mensagemId) {
        throw new Error('Mensagem não encontrada');
      }
  
      await addRespostas(mensagem, 'Respondendo mensagem', telefoneLeitor, criadoEm);
      await sendWhatsAppMessage(phoneNumber, 'Respondendo sua dúvida:' + ' ' + mensagem);
      await addHistoric('Resposta enviada', now + ' ' + criadoEm);
  
      await updateMensagemStatus(mensagemId.id);
  
      return res.status(201).json({ message: 'Resposta enviada com sucesso' });
    } catch (error) {
      console.error('Erro ao enviar resposta:', error);
      return res.status(500).json({ message: 'Erro ao enviar resposta' });
    };
  }
  
  module.exports = {
    postRespostas,
    getRespostas,
  }