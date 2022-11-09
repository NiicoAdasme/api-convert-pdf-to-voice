const { Router } = require('express')
const { inicio, sendAudio } = require('../controllers/pdf.controller')
const { check } = require('express-validator')

const router = Router()


router.get('/', 
    [
        // Middlewares
        // check('pdf', 'Debe enviar un archivo pdf').not().isEmpty()
    ],
    inicio)

router.post('/pdf',
    [
        // Middlewares
        // check('pdf', 'Debe enviar un archivo pdf').exists(),
        // check('format', 'Debe seleccionar un formato de audio').isIn('mp3', 'aac', 'flac', 'ogg', 'wav', 'wma')
    ]
    ,sendAudio)

module.exports = router