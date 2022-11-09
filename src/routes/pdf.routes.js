const { Router } = require('express')
const { inicio, sendAudio, deleteFiles } = require('../controllers/pdf.controller')
const { check } = require('express-validator')

const router = Router()


router.get('/',inicio)

router.post('/pdf',
    [
        // Middlewares
        check('pdf', 'Debe enviar un archivo pdf').exists(),
        check('format', 'Debe seleccionar un formato de audio').isIn('mp3', 'aac', 'flac', 'ogg', 'wav', 'wma')
    ]
    ,
    sendAudio
)

router.get('/delete', deleteFiles)

module.exports = router