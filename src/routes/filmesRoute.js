const express = require('express')
const router = express.Router()
const controller = require('../controllers/filmesController')

router.get('/', controller.get)
router.get('/director/:diretor', controller.getById)
router.get('/:genero', controller.getGenero)
router.get('/titulo/:filme', controller.getTitulo)
router.get('/director/:diretor/genero/:genre', controller.getDiretorGenero)
router.get('/duracao/:time', controller.getDuracao)

router.post('/', controller.post)
router.post('/genero/:filme', controller.postGenero)
router.post('/filme/:title', controller.postImage)
router.post('/showtime/:title', controller.postShowTime)

module.exports = router







