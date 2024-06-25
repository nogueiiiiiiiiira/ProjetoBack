const {
    payFine,
    listFines,
    listFineById,
    listFineBySearch,
    updateFineService,
    deleteFineService
} = require("../service/fineService");

const {
    addHistoric
} = require ("../service/historicService");

const criadoEm = new Date().toISOString().slice(0, 10).split('-').join('/');
const now = new Date().toTimeString().match(/\d{2}:\d{2}:\d{2}/)[0];

async function getFines(req, res) {
    const fines = await listFines();
    if(fines.length > 0) {
        return res.status(200).json(fines);
    }

    return res.status(204).send();
}

async function getFinesBySearch(req, res) {
    const { fineSearch } = req.params;
    if (!fineSearch){
        return res.status(400).json({ message: 'Inserção é obrigatória '});
    }

    const result = await listFineBySearch(fineSearch);
    if(result && result.length > 0){
        return res.status(200).json(result);
    }

    return res.status(404).json({ message: 'Nada foi encontrado.' });
}

async function updatePayment(req, res){
    const { cpf, idLivro } = req.body;
    console.log("CPF:", cpf);
    console.log("ID do Livro:", idLivro);

    if (!cpf || !idLivro){
        console.log("Campos obrigatórios faltando:", { cpf, idLivro });
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        await payFine(cpf, idLivro, 'Multa Paga');
        await addHistoric('Pagamento de multa registrada', now + ' ' + criadoEm);
        return res.status(201).json({ message: 'Multa paga com sucesso'});
    } catch(error) {
        console.error("Erro ao pagar multa:", error);
        if(error.message === 'CPF não existe! Não foi possível pagar a multa'){
            return res.status(400).json({ message: error.message }); 
        }
        
        if(error.message === 'Livro não existe! Não foi possível pagar a multa'){
            return res.status(400).json({ message: error.message }); 
        }

        return res.status(500).json({ message: error });
    }
}


async function updateFine(req, res) {
    const { cpf, idLivro} = req.body;
    const { fineId } = req.params;
    
    if (!cpf || !idLivro ) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    
    try {
        const existingFine = await listFineById(fineId); 
        if (!existingFine) {
            return res.status(404).json({ message: 'Multa não encontrada.' });
        }
        const updatedFine = await updateFineService(fineId, cpf, idLivro);
        await addHistoric('Atualização de multa registrada', now + ' ' + criadoEm);
        return res.status(200).json(updatedFine);
    } catch (error) {
        console.error('Erro ao atualizar a multa:', error);
        return res.status(500).json({ message: 'Erro ao atualizar a multa.' });
    }
}

async function deleteFine(req, res) {
    const { fineId } = req.params;
    try {
        const existingFine = await listFineById(fineId); 
        if (!existingFine) {
            return res.status(404).json({ message: 'Multa não encontrada.' });
        }
        await deleteFineService(fineId);
        await addHistoric('Exclusão de multa registrada', now + ' ' + criadoEm);
        return res.status(200).json({ message: 'Multa excluída com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir a multa:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

module.exports = {
    getFines,
    getFinesBySearch,
    updatePayment,
    updateFine,
    deleteFine
}