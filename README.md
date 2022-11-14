# API-convert-pdf-to-voice

## How to use

1. Clone the repository
`` git clone https://github.com/NiicoAdasme/api-convert-pdf-to-voice.git ``
2. Install dependencies ``npm install``
3. Run the code 
``node index `` or ``npm start`` 
4. In some http client like Postman put the URL and add /api/pdf with POST method and select body *form-data*
5. Add the key "pdf" file type
6. Add the key "format". You can use mp3, aac, flac, ogg, wav and wma. Default: flac (opcional)
7. Once you audio file is downloaded, please get request to /api/delete for delete the files in the server

### Here is an example
![Postman Rquest](https://github.com/NiicoAdasme/api-convert-pdf-to-voice/blob/main/src/assets/example.png?raw=true)
