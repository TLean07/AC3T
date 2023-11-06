const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/fitzone',
{   
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});

const usuarioSchema = new mongoose.Schema({
    email: {type: String, required: true,},
    senha: {type : String},
  });
  
const Usuario = mongoose.model('Usuario', usuarioSchema);

app.post("/cadastrarUsuario", async (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    if (email == null || senha == null) {
        return res.status(400).json({ error: "Preencher todos os campos" });
    }

    const emailExiste = await Usuario.findOne({ email: email });
    if (emailExiste) {
        return res.status(400).json({ error: "O e-mail cadastrado já existe!!!" });
    }

    const usuario = new Usuario({
        email: email,
        senha: senha,
    });

    try {
        const newUsuario = await usuario.save();
        res.json({ error: null, msg: "Cadastro ok", usuarioId: newUsuario._id });
    } catch (error) {
        res.status(400).json({ error });
    }
});

app.get("/cadastrarUsuario", async(req, res)=>{
    res.sendFile(__dirname +"/cadastrarUsuario.html");
});

const produtoAcademiaSchema = new mongoose.Schema({
    id_produtoacademia: {type: String, required: true,},
    descricao: {type : String},
    marca: {type : String},
    data_fabricacao: {type : Date},
    quantidade_estoque: {type : Number},
  });
  
  app.post("/cadastrarProdutoAcademia", async (req, res) => {
    const id_produtoacademia = req.body.id_produtoacademia;
    const descricao = req.body.descricao;
    const marca = req.body.marca;
    const data_fabricacao = req.body.data_fabricacao;
    const quantidade_estoque = req.body.quantidade_estoque;

    if (id_produtoacademia == null || descricao == null || marca == null || data_fabricacao == null || quantidade_estoque == null) {
        return res.status(400).json({ error: "Preencher todos os campos" });
    }

    const id_produtoacademiaExiste = await ProdutoAcademia.findOne({ id_produtoacademia: id_produtoacademia });
    if (id_produtoacademiaExiste) {
        return res.status(400).json({ error: "O produto já existe!!!" });
    }

    const produtoAcademia = new ProdutoAcademia({
        id_produtoacademia: id_produtoacademia,
        descricao: descricao,
        marca: marca,
        data_fabricacao: data_fabricacao,
        quantidade_estoque: quantidade_estoque,
    });

    try {
        const newProdutoAcademia = await produtoAcademia.save();
        res.json({ error: null, msg: "Cadastro ok", produtoAcademiaId: newProdutoAcademia._id });
    } catch (error) {
        res.status(400).json({ error });
    }
});

app.get("/cadastrarProdutoAcademia", async(req, res)=>{
    res.sendFile(__dirname +"/cadastrarProdutoAcademia.html");
});

app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html");
});

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
})