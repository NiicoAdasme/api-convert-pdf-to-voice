const fs = require('fs')
const pdf = require('pdf-parse')
const path = require('path');
const gTTs = require('gtts')

// * ubicacion del pdf (prueba)
const req = `C:\\Users\\Nico\\Desktop\\UBB\\2022-2\\Practica II\\PDF to voice\\backend\\src\\assets\\pdf\\test.pdf`

// * Se necesita la ruta del pdf y el formato de audio al que se quiere convertir.
const conversion = (ruta = req, formatReq = 'flac') => {

// nombre del archivo con su extension .pdf
let basename = path.basename(req) // test.pdf

// formato requerido por el cliente
//const formatReq = "flac" 

const dataBuffer = fs.readFileSync(req)

// formatos disponibles para audio
const formatAvailable = ['mp3', 'aac', 'flac', 'ogg', 'wav', 'wma'];

let firstIndex;
let fileName;
let AudioRoute = ''

if (formatAvailable.includes(formatReq)) {
    firstIndex = basename.indexOf('.')
    fileName = basename.substring(0, firstIndex)
    fileWithFormat = `${fileName}.${formatReq}`

    pdf(dataBuffer).then(data => {
        let gtts = new gTTs(data.text, 'es')

        // console.log(path.join(__dirname, 'assets', 'audio', fileWithFormat));
        AudioRoute = path.join(__dirname, 'assets', 'audio', fileWithFormat)

        gtts.save(path.join(__dirname, 'assets', 'audio', fileWithFormat), (err, result) => {
            if (err) throw new Error(err)

        })

        console.log(AudioRoute);
        return AudioRoute
    })

    return AudioRoute

} else {
    return `Formato no disponible`
}
}

module.exports = conversion
