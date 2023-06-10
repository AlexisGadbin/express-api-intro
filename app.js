import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import { postRoutes, userRoutes } from './routes/'

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cors())

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-type, Authorization'
    )
    next()
})

server.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello World!',
    })
})

server.use('/post', postRoutes)
server.use('/user', userRoutes)

server.listen(process.env.SERVER_PORT)
