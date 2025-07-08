import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

export class UserService {
    constructor () {
        this.prisma = new PrismaClient();
    }

    async fetchUser () {
        const allUsers = await this.prisma.user.findMany({});
        return allUsers;
    }

    async addUser (userData) {
        const { fullName, cpfCnpj, email, password, userType, wallet } = userData;
        const notUniqueUser = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { email: userData.email },
                    { cpfCnpj: userData.cpfCnpj },
                ]
            }
        })

        if (notUniqueUser) {
            throw new Error('Email or CPF/CNPJ is already being used');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = await this.prisma.user.create({
            data: {
                fullName: fullName,
                cpfCnpj: cpfCnpj,
                email: email,
                password: hashedPassword,
                userType: userType,
                wallet: {
                    create: {

                    },
                },
            }
        });
        return newUser;
    }
}