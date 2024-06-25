// service/whatsappService.js
const accountSid = 'AC76c06542b4bb40e921b3f872736cb5bb';
const authToken = 'cf299d78169675160fdd41c9dd091f90';
const client = require('twilio')(accountSid, authToken);

async function sendWhatsAppMessage(phoneNumber, message) {
    try {
        const result = await client.messages.create({
            body: message,
            from: '+12055649480',
            to: phoneNumber
        });
        console.log(`Mensagem WhatsApp enviada para ${phoneNumber}`);
        return result;
    } catch (error) {
        console.error('Erro ao enviar mensagem WhatsApp:', error);
        throw error;
    }
}

module.exports = {
    sendWhatsAppMessage,
};


