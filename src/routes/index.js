import { IndexController } from '../controllers/index.js';

const setRoutes = (app) => {
    const indexController = new IndexController();

    app.get('/', indexController.getIndex.bind(indexController));
    app.post('/register', indexController.registerNewUser.bind(indexController));
};

export default setRoutes;