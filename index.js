const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post')
//configurando handlebars
const hbs = handlebars.create({defaultLayout: 'main'})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
//configurando body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//rotas
app.get('/', (req, res)=>{
  Post.findAll({order: [['id', 'DESC']]}).then((posts)=>{
    res.render('home', {posts: posts})
  })
})
app.get('/del', (req,res)=>{
  res.render('delete')
})
app.get('/cadastro', (req, res)=>{
  res.render('form')
})
app.post('/sucesso', (req, res)=>{
  Post.create({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo
  }).then(()=>{
    res.redirect('/')
  }).catch((error)=>{
    res.send('Erro: '+ error)
  })
})

app.get('/deletar/:id', (req, res)=>{
  Post.destroy({where: {'id': req.params.id}}).then(()=>{
    res.redirect('/del')
  }).catch((error)=>{
    console.log('Não foi possível deletar o post: '+ error)
  })
})




app.listen(8081, ()=>{
  console.log('Servidor funcionando com sucesso na porta 8081!')
})
