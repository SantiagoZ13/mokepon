const express = require('express')

const app = express()

app.get('/', (req, res) =>{
    res.send('Respuesta forro')
})

app.listen(8080, () =>{
    console.log('funcionando')
})