import express from 'express'
import path from 'path'
import fs from 'fs'

const router = express.Router()
const __dirname = path.resolve()

//Ruta raíz
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

//Ruta agregar
router.get('/agregar', (req, res) => {
    const { nombre, precio } = req.query
    const deporte = {
        nombre,
        precio
    }
    const { deportes } = JSON.parse(fs.readFileSync('data/deportes.json', 'utf-8'))
    deportes.push(deporte)
    fs.writeFileSync('data/deportes.json', JSON.stringify({ deportes }))
    res.send('Agregado con éxito')
})

//Ruta registros
router.get('/deportes', (req, res) => {
    const registro = JSON.parse(fs.readFileSync('data/deportes.json', 'utf-8'))
    res.send(registro)
})

//Ruta editar
router.get('/editar', (req, res) => {
    const { nombre, precio } = req.query
    const registro = JSON.parse(fs.readFileSync('data/deportes.json', 'utf-8'))
    const deporte = registro.deportes.find((d) => d.nombre === nombre)
    deporte.precio = precio
    fs.writeFileSync('data/deportes.json', JSON.stringify(registro))
    res.send('Editado con éxito')
})

//Ruta eliminar
router.get('/eliminar', (req, res) => {
    const { nombre } = req.query
    const registro = JSON.parse(fs.readFileSync('data/deportes.json', 'utf-8'))
    registro.deportes = registro.deportes.filter((d) => d.nombre !== nombre)
    fs.writeFileSync('data/deportes.json', JSON.stringify(registro))
    res.send('Eliminado con éxito')
})

export default router