const { gql } = require('apollo-server')

const typeDefs = gql`
    type User {
        id: ID
        name: String
        lastname: String
        email: String
        creationDate: String
    }

    type Token {
        token: String
    }

    type Product {
        id: ID
        name: String
        productStock: Int
        price: Float
        creationDate: String
    }

    type Client {
        id: ID
        name: String
        lastname: String
        company: String
        phone: String
        seller: ID
    }

    input UserInput {
        name: String!
        lastname: String!
        email: String!
        password: String!
    }

    input AuthenticateInput {
        email: String!
        password: String!
    }

    input ProductInput {
        name: String!
        productStock: Int!
        price: Float!
    }

    input ClientInput {
        name: String!
        lastname: String!
        company: String!
        email: String!
        phone: String
    }

    type Query {
        #Users
        getUser(token: String!): User

        #Products
        getProducts: [Product]
        getProduct(id: ID!): Product

        #Clients
        getClients: [Client]
        getClientsSeller: [Client]
        getClient(id: ID!): Client
    }

    type Mutation {
        #Users
        newUser(input:UserInput): User
        authenticateUser(input: AuthenticateInput): Token

        #Products
        newProduct(input:ProductInput): Product
        updateProduct(id: ID!, input:ProductInput): Product
        deleteProduct(id: ID!): String

        #Client
        newClient(input:ClientInput): Client
        updateClient(id: ID!, input:ClientInput): Client
        deleteClient(id: ID!): String
    }
`;

module.exports = typeDefs;