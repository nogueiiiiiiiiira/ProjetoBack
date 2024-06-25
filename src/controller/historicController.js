
const { 
    listHistorico 
} = require("../service/historicService");

async function getHistoricos(req, res) {
    const historicos = await listHistorico();
    if (historicos.length > 0) {
        return res.status(200).json(historicos);
    }
    return res.status(204).send();
}

module.exports = {
    getHistoricos,
};