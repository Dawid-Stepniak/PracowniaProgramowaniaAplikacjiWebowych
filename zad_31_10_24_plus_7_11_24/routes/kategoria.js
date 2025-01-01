var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.post('/', async (req, res) => {
    try {
        const { nazwa } = req.body;
        const kategoria = await prisma.kategoria.create({
            data: { nazwa },
        });
        res.status(201).json(kategoria);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const kategorie = await prisma.kategoria.findMany({
            include: { wpisy: true },
        });
        res.status(200).json(kategorie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const kategoria = await prisma.kategoria.findUnique({
            where: { id: parseInt(req.params.id) },
            include: { wpisy: true },
        });
        if (!kategoria) return res.status(404).json({ error: 'Kategoria not found' });
        res.status(200).json(kategoria);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { nazwa } = req.body;
        const kategoria = await prisma.kategoria.update({
            where: { id: parseInt(req.params.id) },
            data: { nazwa },
        });
        res.status(200).json(kategoria);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await prisma.kategoria.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;