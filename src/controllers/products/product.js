import express from 'express';
import prisma from '../../prisma_/client.js';
import { verifyToken } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add-product', verifyToken, async (req, res) => {
    const { name, price, description, category, quantity, seller } = req.body;
    try {
        if (!name || !price || !description || !category || !quantity || !seller) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const product = await prisma.item.create({
            data: {
                name,
                price,
                description,
                category,
                quantity,
                sellerId: seller,
                imageUrl: req.file ? req.file.path : null, // multer file uploads
            }
        });

        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong while adding the product.', error: error.message });
    }
})


router.get('/get-all-products', verifyToken, async (req, res) => {
    try {
        const products = await prisma.item.findMany();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong while fetching products.', error: error.message });
    }
});

export default router;