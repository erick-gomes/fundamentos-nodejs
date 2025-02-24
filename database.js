import { readFile, writeFile } from 'node:fs/promises'
import fs from 'node:fs'
import { parse } from 'csv-parse'

const importTasks = async () => {
    const readStreamCSV = fs.createReadStream(new URL('tasks.csv', import.meta.url))
    const parser = readStreamCSV.pipe(parse({ columns: true, }))
    for await (const record of parser) {
        await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: record.title,
                description: record.description
            })
        })
    }
}

const url = new URL('database.json', import.meta.url)
export class Database {
    #database = {}

    constructor() {
        readFile(url, 'utf8').then(data => {
            this.#database = JSON.parse(data)
        }).catch(() => {
            this.#save()
        })
        if (!this.#database.tasks) {
            importTasks()
        }
    }

    #save() {
        writeFile(url, JSON.stringify(this.#database, null, 2))
    }

    insert(table, value) {
        if (!this.#database[table]) {
            this.#database[table] = [value]
        } else {
            this.#database[table].push(value)
        }
        this.#save()
        return value
    }

    /**
     * 
     * @param {string} table 
     * @returns {Array}
     */
    select(table) {
        const tableData = this.#database[table] ?? []
        return tableData
    }

    selectOne(table, id) {
        return this.select(table).find(item => item.id === id)
    }

    update(table, id, property, value) {
        const index = this.select(table).findIndex(item => item.id === id)
        if (index === -1) {
            return 404
        }
        if (!this.#database[table][index].hasOwnProperty(property)) {
            return 500
        }
        this.#database[table][index][property] = value
        this.#save()
        return 204
    }

    delete(table, id) {
        const index = this.select(table).findIndex(item => item.id === id)
        if (index === -1) {
            return 404
        }
        this.#database[table].splice(index, 1)
        this.#save()
        return 204
    }
}