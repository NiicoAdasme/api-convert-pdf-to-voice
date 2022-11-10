const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')
const path = require('path')

const pdfRoutes = require('./src/routes/pdf.routes')

// Initializations
const app = express()
dotenv.config()

// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(fileUpload({
    // debug: true,
    // createParentPath: path.join(__dirname, 'src', 'assets')
}))

// Directorio publico
app.use(express.static(path.join(__dirname, 'src', 'assets')));

// Lectura y parseo del body
app.use(express.json());

// Routes
app.use('/api', pdfRoutes)


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})