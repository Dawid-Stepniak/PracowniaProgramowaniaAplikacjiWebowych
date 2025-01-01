var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.post('/', async (req, res) => {
    try {
        const { tresc, wpisId } = req.body;
        const komentarz = await prisma.komentarz.create({
            data: { tresc, wpisId },
        });
        res.status(201).json(komentarz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const komentarze = await prisma.komentarz.findMany({
            include: { wpis: true },
        });
        res.status(200).json(komentarze);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const komentarz = await prisma.komentarz.findUnique({
            where: { id: parseInt(req.params.id) },
            include: { wpis: true },
        });
        if (!komentarz) return res.status(404).json({ error: 'Komentarz not found' });
        res.status(200).json(komentarz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { tresc } = req.body;
        const komentarz = await prisma.komentarz.update({
            where: { id: parseInt(req.params.id) },
            data: { tresc },
        });
        res.status(200).json(komentarz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await prisma.komentarz.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;