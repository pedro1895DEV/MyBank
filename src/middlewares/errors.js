export const errorHandler = (error, req, res, next) => {
        console.error(`ERROR: ${error.message}`);
        
        if (error.message === 'Insufficient balance.') {
            return res.status(400).json({ message: error.message });
        }
        if (error.message === 'Email or CPF/CNPJ is already being used') {
            return res.status(409).json({ message: error.message });
        }
        if (error.message === 'Shopkeeper cannot use this service.') {
            return res.status(403).json({ message: error.message });
        }
        if (error.message === 'Payer user not found.' || error.message === 'Payee user not found.') {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === 'External service communication error.') {
            return res.status(502).json({ message: 'Fail to communicate with external server.' });
        }

        return res.status(500).json({message: 'Error on internal server.'})
}