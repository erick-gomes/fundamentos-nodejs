export async function json(req, res) {
    //#region processamento de json
    const buffers = []
    for await (const chunk of req) {
        buffers.push(chunk)
    }
    const data = Buffer.concat(buffers).toString()
    req.body = data ? JSON.parse(data) : {}
    res.setHeader('Content-Type', 'application/json')
    //#endregion
}