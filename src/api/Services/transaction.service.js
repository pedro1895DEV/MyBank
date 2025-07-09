import { PrismaClient, UserType } from '@prisma/client';

export class TransactionService {
    constructor () {
        this.prisma = new PrismaClient();
    }

    async getTransfers () {
        const allTransfers = await this.prisma.transaction.findMany({
            include: {
                payer: {
                    select :{
                        fullName: true,
                    },
                },
                payee: {
                    select :{
                        fullName: true,
                    },
                }
            }
        });
        return allTransfers;
    }

    async transaction (transactionData) {
        const { value, payerId, payeeId } = transactionData;
        const payer = await this.prisma.user.findUnique({
            where: {
                id: payerId,
            },
            include: {
                wallet: true,
            }
        });

        const payee = await this.prisma.user.findUnique({
            where: {
                id: payeeId,
            },
            include: {
                wallet: true,
            }
        });

        if (!payer) {
            throw new Error('Payer user not found.');
        }

        if (!payee) {
            throw new Error('Payee user not found.');
        }

        if (payer.userType === 'SHOPKEEPER') {
            throw new Error('Shopkeeper cannot use this service.');
        }

        if (payer.wallet.balance < value) {
            throw new Error ('Insufficient balance.')
        }

        await this.prisma.wallet.update({
            where: {
                userId: payerId,
            },
            data: {
                balance: {
                    decrement: value,
                }
            }
        });

        await this.prisma.wallet.update({
            where: {
                userId: payeeId,
            },
            data: {
                balance: {
                    increment: value,
                }
            }
        });

        const newTransaction = await this.prisma.transaction.create({
            data: {
                value: value,
                payerId: payerId,
                payeeId: payeeId,
            }, 

        });
        return newTransaction;
    }
}