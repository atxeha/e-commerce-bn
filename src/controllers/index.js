import { createUser } from '../prisma_/registerNewUser.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class IndexController {
    constructor() {
        this.personalInfo = null;
    }

    // GET /
    getIndex(req, res) {
        res.send('Welcome to the Express App!');
    }

    // POST /personal-info
    addPersonalInfo(req, res) {
        const { name, age, email } = req.body;
        if (!name || !age || !email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        this.personalInfo = { name, age, email };
        res.status(201).json({ message: 'Personal info added', data: this.personalInfo });
    }

    // GET /personal-info
    getPersonalInfo(req, res) {
        if (!this.personalInfo) {
            return res.status(404).json({ error: 'No personal info found' });
        }
        res.json(this.personalInfo);
    }

    async registerNewUser(req, res) {
        await createUser(req.body, res);
    }
}