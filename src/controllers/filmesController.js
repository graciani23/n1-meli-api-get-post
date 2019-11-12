const filmes = require('../models/filmes.json')
const fs = require('fs')

exports.get = (req, res) => {
    res.status(200).send(filmes)
}

exports.getById = (req, res) => {
    const nomeDiretor = req.params.diretor
    
    const filmeDiretor = filmes.filter(item => item.director.includes(nomeDiretor))
    res.status(200).send(filmeDiretor)
}

exports.getGenero = (req, res) => {
    const nomeGenero = req.params.genero
    const filmeGenero = filmes.filter(item => item.genre.includes(nomeGenero))
    res.status(200).send(filmeGenero)
}

exports.getTitulo = (req, res) => {
    const nomeFilme = req.params.filme
    const filmeTitulo = filmes.find(item => item.title == nomeFilme)
    res.status(200).send(filmeTitulo)
}

exports.getDiretorGenero = (req, res) => {
     const nomeDiretor = req.params.diretor
     const filmeDiretor = filmes.filter(item => item.director == nomeDiretor)
     const nomeGenero = req.params.genre
     const filmeDiretorGenero = filmeDiretor.filter(item => item.genre.includes(nomeGenero))
     res.status(200).send(filmeDiretorGenero)
 }

 function transformaDuracaoEmMinutos(duration) {
     const duracaoEmNumeros = duration.split("").filter(Number);
     const hora = duracaoEmNumeros.shift()*60
     const minutos = duracaoEmNumeros.join("")
     const duracaoEmMinutos = hora + parseInt(minutos)
 }

exports.getDuracao = (req, res) => {
    const duracao = req.params.time
    const filmeDuracao = JSON.parse(JSON.stringify(filmes))

    filmeDuracao.map(item => item.duration = transformaDuracaoEmMinutos(item.duration))

    const duracaoFilmes = filmeDuracao.filter(item => item.duration > duracao)
    res.status(200).send(duracaoFilmes)

}


exports.post = (req, res) => {
    const { title, year, director, duration, genre, rate } = req.body
    filmes.push({ title, year, director, duration, genre, rate })

    fs.writeFile('./src/models/filmes.json', JSON.stringify(filmes), 'utf8', function(err) {
        if (err) {
            res.status(500).send({ message: err })
        }
        console.log('O novo filme foi incluído com sucesso!')
    })
    res.status(201).send(filmes)
} 

exports.postGenero = (req, res) => {
    const nomeFilme = req.params.filme
    const filmeEscolhido = filmes.find(item => item.title == nomeFilme)

    const { genre } = req.body
    filmeEscolhido.genre.push( genre )

    fs.writeFile('./src/models/filmes.json', JSON.stringify(filmes), 'utf8', function(err) {
        if (err) {
            res.status(500).send({ message: err })
        }
        console.log(`O genero do filme ${filmeEscolhido} foi alterado com sucesso!`)
    })
    res.status(201).send(filmes)
}

exports.postImage = (req, res) => {
    const nomeFilme = req.params.title
    const filmeEscolhido = filmes.find(item => item.title == nomeFilme)

    const { image } = req.body
    filmeEscolhido.image =  image

    fs.writeFile('./src/models/filmes.json', JSON.stringify(filmes), 'utf8', function(err) {
        if (err) {
            res.status(500).send({ message: err })
        }
        console.log('A nova propriedade foi incluída com sucesso!')
    })
    res.status(201).send(filmes)
}

exports.postShowTime = (req, res) => {
    const nomeFilme = req.params.title
    const filmeEscolhido = filmes.find(item => item.title == nomeFilme)

    const { showTime } = req.body
    filmeEscolhido.showTime = showTime

    fs.writeFile('./src/models/filmes.json', JSON.stringify(filmes), 'utf8', function(err) {
        if (err) {
            res.status(500).send({ message: err})
        }
        console.log('The file was saved!')
    })
    res.status(201).send(filmes)
}