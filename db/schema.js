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

    type Order {
        id: ID
        order: [OrderGroup]
        total: Float
        client: ID
        seller: ID
        date: string
        state: OrderState
    }

    type OrderGroup {
        id: ID
        quantity: Int
    }

    type TopClient {
        total: Float
        client: [Client]
    }

    type TopSeller {
        total: Float
        client: [User]
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

    input OrderProductInput {
        id: ID
        quantity: Int
    }

    input OrderInput {
        order: [OrderProductInput]
        total: Float!
        client: ID!
        state: OrderState
    }

    enum OrderState {
        PENDING
        COMPLETED
        CANCELLED
    }

    type Query {
        #Users
        getUser: User

        #Products
        getProducts: [Product]
        getProduct(id: ID!): Product

        #Clients
        getClients: [Client]
        getClientsSeller: [Client]
        getClient(id: ID!): Client

        #Order
        getOrders: [Order]
        getOrdersBySeller: [Order]
        getOrder(id: ID!): [Order]
        getOrderByState(state: String!): [Order]

        #Advanced search
        bestClients: [TopClient]
        bestSellers: [TopSeller]
        searchProduct(text: String!): [Product]
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
        
        #Order
        newOrder(input:OrderInput): Order
        updateOrder(id: ID!, input:OrderInput): Order
        deleteOrder(id: ID!): String
    }
`;

module.exports = typeDefs;