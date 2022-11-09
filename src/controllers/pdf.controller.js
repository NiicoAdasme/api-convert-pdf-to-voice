const { response } = require('express');
const path = require("path");
const fs = require('fs')
const pdf = require('pdf-parse')
const gTTs = require('gtts');
const { setTimeout } = require('timers/promises');


const inicio = (req, res = response) => {

    const body = req.body

    try {
        res.status(200).json({
            ok: true,
            body: body,
            msg: 'navega al directorio /pdf con el metodo POST para enviar tu pdf y convertilo a mp3'
        })
    } catch (err) {

        console.error(err);

        res.status(500).json({
            ok: false,
            msg: 'Error. Por favor contacte al administrador del servicio.'
        });
    }

}

const sendAudio = async (req, res = response) => {

    // se recibe el contenido de la request
    const body = req.body

    // se extrae el archivo enviado
    const pdfFile = req.files
    // const pathPdf = path.join(__dirname, '../assets', 'pdf', pdfFile.name) 
    
    console.log(pdfFile);
    // console.log(pathPdf);

    // pdfFile.mv(pathPdf, err => {
    //     if(err) {
    //         console.log(`No se pudo guardar el PDF`);
    //     }else{
    //         console.log(`PDF guardado en la ruta: ${pathPdf}`);
    //     }
    // })

    // * ubicacion del pdf (prueba)
    // const pdfReq = `C:\\Users\\Nico\\Desktop\\UBB\\2022-2\\Practica II\\PDF to voice\\backend\\src\\assets\\pdf\\test2.pdf`
    // // formato requerido por el cliente
    // const formatReq = "flac"
    // let firstIndex
    // let fileName = ''
    // let AudioRoute = ''
    // let fileWithFormat = '';

    // // * Se necesita la ruta del pdf y el formato de audio al que se quiere convertir.
    // // nombre del archivo con su extension .pdf
    // const basename = path.basename(pdfReq) // test.pdf

    // const dataBuffer = fs.readFileSync(pdfReq)

    // // formatos disponibles para audio
    // const formatAvailable = ['mp3', 'aac', 'flac', 'ogg', 'wav', 'wma'];

    // if (formatAvailable.includes(formatReq)) {
    //     firstIndex = basename.indexOf('.')
    //     fileName = basename.substring(0, firstIndex) // test
    //     fileWithFormat = `${fileName}.${formatReq}` // test.flac

    //     await pdf(dataBuffer).then(async data => {
    //         const gtts = new gTTs(data.text, 'es')

    //         AudioRoute = path.join(__dirname, '../assets', 'audio', fileWithFormat)

    //         const guardarAudio = new Promise((resolve, reject) => {

    //             gtts.save(AudioRoute, (err, result) => {

    //                 if (err) {
    //                     console.error('error al guardar el audio!!:', err);

    //                     res.status(400).json({
    //                         msg: "no se encontro la ruta del audio. Ocurrio un error"
    //                     })
    //                 }

    //                 if (result === undefined) {
    //                     try {
    //                         res.download(AudioRoute)
    //                         // console.log('despues de la descarga');
    //                         // if (fs.existsSync(AudioRoute)) {
    //                         //     fs.unlinkSync(AudioRoute)
    //                         //     console.log('Audio Eliminado')
    //                         // }
    //                         // else{
    //                         //     setTimeout(() => {
    //                         //         fs.unlinkSync(AudioRoute)
    //                         //     }, 10000);
    //                         // }
    //                     } catch (err) {
    //                         console.error(err);

    //                         res.status(500).json({
    //                             ok: false,
    //                             msg: 'Error. Por favor contacte al administrador del servicio.'
    //                         });
    //                     }
    //                 }
    //             })

    //             if (AudioRoute) {
    //                 resolve(`Audio guardado`)
    //             } else {
    //                 reject('Se rechazo la promesa. No se encontro el directorio del audio')
    //             }
    //         })

    //         await guardarAudio
    //             .then(msg => console.log(msg))
    //             .catch(err => console.log(err))

    //     })

    // } else {
    //     console.log(`Formato no disponible`);
    // }


}

module.exports = {
    inicio,
    sendAudio
}