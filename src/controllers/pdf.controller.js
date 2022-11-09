const { response } = require('express');
const path = require("path");
const fs = require('fs')
const pdf = require('pdf-parse')
const gTTs = require('gtts');

const inicio = (req, res = response) => {

    const body = req.body

    try {
        res.status(200).json({
            body: body,
            msg: 'Navigate to /pdf with the POST method to send your PDF file and convert to audio file'
        })
    } catch (err) {
        res.status(500).json({
            msg: `Error. Internal server error. Its our problem. Not yours. ${err}`
        })
    }

}

const sendAudio = async (req, res = response) => {

    // se recibe el contenido de la request
    const { format } = req.body

    // se extrae el archivo enviado
    // metadata del pdf
    const pdfFile = req.files.pdf
    // Path del pdf
    const pathPdf = path.join(__dirname, '../assets', 'pdf', pdfFile.name)

    // Guardar pdf en el path
    pdfFile.mv(pathPdf, err => {
        if (err) {
            console.log(`We cannot save the PDF file`)
        } else {
            console.log(`PDF save in the path: ${pathPdf}`)
        }
    })

    // formato requerido por el cliente o formato flac por defecto
    const formatReq = format || "flac"

    let firstIndex
    let fileName = ''
    let AudioRoute = ''
    let fileWithFormat = ''

    // * Se necesita la ruta del pdf y el formato de audio al que se quiere convertir.
    // nombre del archivo con su extension .pdf
    const basename = path.basename(pathPdf) // test.pdf

    // const dataBuffer = fs.readFileSync(pathPdf)
    const dataBuffer = pdfFile.data

    // formatos disponibles para audio
    const formatAvailable = ['mp3', 'aac', 'flac', 'ogg', 'wav', 'wma']

    if (formatAvailable.includes(formatReq)) {
        firstIndex = basename.indexOf('.')
        fileName = basename.substring(0, firstIndex) // test
        fileWithFormat = `${fileName}.${formatReq}` // test.flac

        await pdf(dataBuffer).then(async data => {
            const gtts = new gTTs(data.text, 'es')

            AudioRoute = path.join(__dirname, '../assets', 'audio', fileWithFormat)

            const guardarAudio = new Promise((resolve, reject) => {

                gtts.save(AudioRoute, (err, result) => {

                    if (err) {
                        res.status(400).json({
                            msg: `Error to save the audio or we cannot found the audio path. ${err}`
                        })
                    }

                    if (result === undefined) {
                        try {
                            res.download(AudioRoute)
                            // ! Eliminar el pdf y audio, una vez termine la conversion y el envio
                            // console.log('despues de la descarga');
                            // if (fs.existsSync(AudioRoute)) {
                            //     fs.unlinkSync(AudioRoute)
                            //     console.log('Audio Eliminado')
                            // }
                            // else{
                            //     setTimeout(() => {
                            //         fs.unlinkSync(AudioRoute)
                            //     }, 10000);
                            // }
                        } catch (err) {
                            res.status(500).json({
                                msg: `Error. Internal server error. Its our problem. Not yours. ${err}`
                            });
                        }
                    }
                })

                if (AudioRoute) {
                    resolve(`Audio saved`)
                } else {
                    reject('Promise reject. Error to save the audio or we cannot found the audio path')
                }
            })

            await guardarAudio
                .then(msg => console.log(msg))
                .catch(err => console.log(err))

        })

    } else {
        res.status(400).json({
            msg: 'Format not available. These format are available: mp3, aac, flac, ogg, wav, wma',
        });
    }


}


const deleteFiles = (req, res = response) => {
    const pdfFolderToRemove = path.join(__dirname, '../assets', 'pdf')
    const audioFolderToRemove = path.join(__dirname, '../assets', 'audio')
    let extension = '';

    // PDF FOLDER
    const pdfFolder = fs.readdirSync(pdfFolderToRemove)

    pdfFolder.forEach(file => {
        if (path.extname(file) === '.pdf') {
            console.log(file);
            fs.unlinkSync(path.join(pdfFolderToRemove, file))
        }
    })

    console.log(pdfFolder);

    // AUDIO FOLDER
    const audioFolder = fs.readdirSync(audioFolderToRemove)

    audioFolder.forEach(file => {
        extension = path.extname(file)
        if (extension === '.flac' || extension === '.mp3' || extension === '.aac' || extension === '.ogg' || extension === '.wav' || extension === '.wma') {
            fs.unlinkSync(path.join(audioFolderToRemove, file))
        }
    })

    // RESPONSE
    if (pdfFolder.length === 0 || audioFolder.length === 0) {
        res.status(200).json({
            msg: `Files deleted`
        })
    } else {
        res.status(400).json({
            msg: `Something wrong happened removing files.`
        })
    }
}

module.exports = {
    inicio,
    sendAudio,
    deleteFiles
}