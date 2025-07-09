import { PrismaClient } from '@prisma/client';

export class TransactionService {
    constructor () {
        this.prisma = new PrismaClient();
    }

    
}