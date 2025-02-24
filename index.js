import http from 'http'
import { routes } from './routes.js'
import { Database } from './database.js'
import { json } from './middlewares/json.js'

const database = new Database()

const server = http.createServer(async (req, res) => {
    await json(req, res)
    const { method, url } = req
    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })
    if (route) {
        const routeParams = url.match(route.path).groups
        req.params = { ...routeParams }
        return route.handler(req, res, database)
    }
    return res.writeHead(404, {
        'Content-Type': 'text/plain; charset=utf-8',
    }).end('Rota não encontrada')
})

server.listen(3000, () => {
    console.log('Fundamentos do Node.js em ação!')
})