import { UserService } from '../Services/user.service.js';
const userService = new UserService();

export const createUser = async (req, res) => {
    const { fullName, cpfCnpj, email, password, userType, wallet } = req.body;
    try {
        const newUser = await userService.addUser({ fullName, cpfCnpj, email, password, userType, wallet });
        res.status(201).json({
            success: true,
            user: newUser,
        });
    } catch (error) {
        console.error(error.message); 
        if (error.message === 'Email or CPF/CNPJ is already being used') {
            return res.status(409).json({ 
                message: error.message 
            });
        }
        return res.status(500).json({ 
            message: 'Error on server.' 
        });
    }
};

export const getAllUsers = async (req, res) => {
    const users = await userService.fetchUser();
    res.status(200).json({
        success: true,
        users: users,
    });
};
