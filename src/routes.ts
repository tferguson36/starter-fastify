import { FastifyInstance } from 'fastify'
import QueryStringSchema from './schemas/queryString.json'
import HeadersSchema from './schemas/headers.json'
import { QueryStringSchema as QuerystringSchemaInterface } from './schema-types/queryString'
import { HeadersSchema as HeadersSchemaInterface } from './schema-types/headers'

export default async function routes(server: FastifyInstance, options: any) {

    server.get<{ Querystring: QuerystringSchemaInterface; Headers: HeadersSchemaInterface }>(
        '/auth',
        {
            schema: {
                querystring: QueryStringSchema,
                headers: HeadersSchema
            },
            preValidation: async (request, reply) => {
                const { username, password } = request.query
                if (username !== 'admin') throw new Error('Must be admin')
            }
        },
        async (request, reply) => {
            const customerHeader = request.headers['h-Custom']
            // do something with request data
            return `logged in!`
        }
    )
}
