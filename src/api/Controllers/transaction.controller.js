import { TransactionService } from '../Services/transaction.service.js';
const transactionService = new TransactionService();

export const transferValue = async (req, res) => {
    const { value, payerId, payeeId, } = req.body;
    try {
        const transaction = await transactionService.transaction({value, payerId, payeeId});
        res.status(200).json({
            success: true,
            transaction: transaction,
        });
    } catch (error) {
        console.log(error.message);
        if (error.message === 'Shopkeeper cannot use this service.') {
            return res.status(403).json({
                success: false, 
                message: error.message 
            });
        }

        if (error.message === 'Payer user not found.') {
            return res.status(404).json({
                success: false,  
                message: error.message 
            });
        }

        if (error.message === 'Payee user not found.') {
            return res.status(404).json({
                success: false,  
                message: error.message 
            });
        }

        if (error.message === 'Insufficient balance.') {
            return res.status(403).json({
                success: false,  
                message: error.message 
            });
        }

        if (error.message === 'Unauthorized transaction.') {
            return res.status(403).json({
                success: false,
                message: error.message
            });
        }

        if (error.message === 'External service communication error.') {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }

        if (error.message === 'External API error.') {
            return res.status(502).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,  
            message: 'Error on server.' 
        });
    }
    
}

export const allTransfers = async (req, res) => {
    const transactions = await transactionService.getTransfers();
    res.status(200).json({
        success: true,
        transactions: transactions,
    });
}