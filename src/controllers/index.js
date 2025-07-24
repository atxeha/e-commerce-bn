import { createUser } from '../prisma_/registerNewUser.js';

export class IndexController {
    async registerNewUser(req, res) {
        await createUser(req.body, res);
    }
}