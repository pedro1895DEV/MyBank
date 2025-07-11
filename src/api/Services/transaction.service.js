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
        const url = 'https://mocki.io/v1/61cec5cd-0878-47e9-8e33-98be767f742';
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
            throw new Error ('Insufficient balance.');
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('External API error.');
            }

            const authData = await response.json();
            if (authData.message != 'Authorized') {
                throw new Error('Unauthorized transaction.');
            }
        } catch (error) {
            console.log(error);
            throw new Error('External service communication error.');
        }

        const newTransaction = await this.prisma.$transaction(async (tx) => {
            await tx.wallet.update({
                where: {userId: payerId},
                data: {balance: {decrement: value } },
            });

            await tx.wallet.update({
                where: {userId: payeeId},
                data: {balance: {increment: value } },
            });

            const transactionRecord = await tx.transaction.create({
                data: {
                    value: value,
                    payerId: payerId,
                    payeeId: payeeId,
                }
            });

            return transactionRecord;
        });
        return newTransaction;
    }
}