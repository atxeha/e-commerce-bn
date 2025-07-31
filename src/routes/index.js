import { IndexController } from '../controllers/index.js';
import  loginRouter  from '../auth/login.js';
import  googleRouter  from '../auth/google.js';
import productRouter from '../controllers/products/product.js';

const setRoutes = (app) => {
    const indexController = new IndexController();

    app.post('/register', indexController.registerNewUser.bind(indexController));

    app.use('/auth', loginRouter);
    app.use('/auth', googleRouter);

    app.use('/', productRouter);

};

export default setRoutes;