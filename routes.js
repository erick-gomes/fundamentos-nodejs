import { randomUUID } from 'node:crypto'
import { parsingURL } from './utils/utils.js'

export const routes = [
    {
        method: 'GET',
        path: parsingURL('/tasks'),
        handler: (req, res, database) => {
            const { title, description } = req.body
            const tasks = database.select('tasks')
            if (title || description) {
                const filteredTasks = tasks.filter(task => {
                    return task.title.includes(title) || task.description.includes(description)
                })
                return res.writeHead(200).end(JSON.stringify(filteredTasks))
            }
            return res.writeHead(200).end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: parsingURL('/tasks'),
        handler: (req, res, database) => {
            const { title, description } = req.body
            if (!title || !description) {
                return res.writeHead(400, {
                    'Content-Type': 'text/plain; charset=utf-8'
                }).end('Título e descrição são obrigatórios')
            }
            const task = database.insert('tasks', {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: new Date(),
                update_at: new Date(),
            })
            return res.writeHead(201).end(JSON.stringify(task))
        }
    },
    {
        method: 'PUT',
        path: parsingURL('/tasks/:id'),
        handler: (req, res, database) => {
            const { id } = req.params
            const { title, description } = req.body

            const task = database.selectOne('tasks', id)
            if (!task) {
                return res.writeHead(404, {
                    'Content-Type': 'text/plain; charset=utf-8'
                }).end('Tarefa não encontrada')
            }

            if (title) {
                database.update('tasks', id, 'title', title)
                database.update('tasks', id, 'update_at', new Date())
            }
            if (description) {
                database.update('tasks', id, 'description', description)
                database.update('tasks', id, 'update_at', new Date())
            }
            if (!title && !description) {
                return res.writeHead(400, {
                    'Content-Type': 'text/plain; charset=utf-8'
                }).end('Título ou descrição são obrigatórios')
            }
            return res.writeHead(200).end(JSON.stringify(database.selectOne('tasks', id)))
        }
    },
    {
        method: 'DELETE',
        path: parsingURL('/tasks/:id'),
        handler: (req, res, database) => {
            const { id } = req.params
            const task = database.selectOne('tasks', id)
            if (!task) {
                return res.writeHead(404, {
                    'Content-Type': 'text/plain; charset=utf-8'
                }).end('Tarefa não encontrada')
            }
            const statusCode = database.delete('tasks', id)
            if (statusCode === 404) {
                return res.writeHead(404, {
                    'Content-Type': 'text/plain; charset=utf-8'
                }).end('Tarefa não encontrada')
            }
            return res.writeHead(204).end()
        }
    },
    {
        method: 'PATCH',
        path: parsingURL('/tasks/:id/complete'),
        handler: (req, res, database) => {
            const { id } = req.params
            const task = database.selectOne('tasks', id)
            if (!task) {
                return res.writeHead(404, {
                    'Content-Type': 'text/plain; charset=utf-8'
                }).end('Tarefa não encontrada')
            }
            const completed_at = task.completed_at ? null : new Date()
            const statusCode = database.update('tasks', id, 'completed_at', completed_at)
            if (statusCode === 404) {
                return res.writeHead(404, {
                    'Content-Type': 'text/plain; charset=utf-8'
                }).end('Tarefa não encontrada')
            }
            if (statusCode === 500) {
                return res.writeHead(500, {
                    'Content-Type': 'text/plain; charset=utf-8'
                }).end('Erro ao atualizar tarefa')
            }
            return res.writeHead(200).end(JSON.stringify(database.selectOne('tasks', id)))
        }
    }
]