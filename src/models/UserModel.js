const mongoose = require('mongoose');

const UserModelSchema = new mongoose.Schema({
    nome: String, email: String, senha: String,
});

const UserModel = mongoose.model("User", UserModelSchema);

module.exports = UserModel;