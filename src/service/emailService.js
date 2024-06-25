const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getEmailByCPF(cpf) {
    try {
        const reader = await prisma.reader.findFirst({
            where: {
                cpf: cpf,
            },
            select: {
                email: true,
            },
        });

        if (!reader) {
            throw new Error('CPF não foi encontrado no banco de dados.');
        }

        return reader.email;
    } catch (error) {
        console.error("Error getting email by CPF:", error);
        throw error;
    }
}

module.exports = {
    getEmailByCPF,
};
