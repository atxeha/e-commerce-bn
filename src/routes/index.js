import express from 'express';
import { IndexController } from '../controllers/index.js';

const setRoutes = (app) => {
    const indexController = new IndexController();

    app.get('/', indexController.getIndex.bind(indexController));
    app.post('/personal-info', express.json(), indexController.addPersonalInfo.bind(indexController));
    app.get('/personal-info', indexController.getPersonalInfo.bind(indexController));
    app.post('/register', express.json(), indexController.registerNewUser.bind(indexController));
};

export default setRoutes;