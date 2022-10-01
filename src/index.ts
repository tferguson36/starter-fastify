import Fastify from 'fastify'
import routes from './routes'

const server = Fastify({
    logger: true
})

server.register(routes)

;(async () => {
    try {
        await server.listen({ port: 8080 })
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
})()
