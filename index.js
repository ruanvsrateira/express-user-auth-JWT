const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const port = 3333;
const router = express.Router();
const mongoose = require('mongoose');
const database = require('./src/models/UserModel');
const UserModel = require('./src/models/UserModel');
const secret = require('./src/config/jwtsecret.json').secret;
const verifyMiddleware = require('./src/middlewares/verifyToken');
const jwt = require('jsonwebtoken');


mongoose.connect("mongodb+srv://ruanvsrateira:Senac123@cluster0.ragks.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(() => {
        console.log('Conectado com o DB');
        app.emit('databaseon');
    });

app.use(session({ secret: "efiahjfaeoufhaeofhuefuoh", saveUninitialized: false, resave: false }));
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));


// Rotas

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async function(req, res) {
    const user = await database.findOne({
        email: req.body.email,
        senha: req.body.password
    })

    if(!user) res.redirect('back');
    if(user) {
        const token = jwt.sign({ userId: user.id }, secret, { expiresIn: 98222 });
        console.log(token);

        req.session.token = token;
        req.session.user_data = user;
        res.send('123')
    }
});

router.get('/home', verifyMiddleware.verifyToken, async function(req, res)  {

    res.render('home', { user: req.session.user_data }
    
)});

router.get('/sair', (req, res) => {
    req.session.destroy();

    res.redirect('/login');
});


app.on('databaseon', () => {
    app.listen(port, () => {
        console.log(`Servidor rodando em http:localhost:${port}`);
    })
})