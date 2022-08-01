const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`

    scalar Date

    type Usuario {
        id: ID
        nome: String!
        email: String!
        idade: Int 
        salario: Float
        vip: Boolean
    }

    # Pontos de entrada da sua API!
    type Query { 
        ola: String!
        horaAtual: Date! 
        usuarioLogado: Usuario
    }
`

const resolvers = {
    Usuario:{
        salario(usuario){
           return usuario.salario_real
        }
    },
    Query: {
        ola() {
            return 'Bom dia!'
        },
        horaAtual() {
            return new Date
        },
        usuarioLogado(obj) {
            console.log(obj)
            return {
                id: 1,
                nome: 'Ana da Web',
                email: 'andadaweb@email.com',
                idade: 23,
                salario_real: 1234.56,
                vip: true
            }
        }

    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})