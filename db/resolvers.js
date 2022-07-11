const User = require('../models/User')
const Product = require('../models/Product')
const Client = require('../models/Client')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'variables.env' })

const createToken = (user, secret, expiresIn) => {
    const { id, email, name, lastname } = user

    return jwt.sign({ id, email, name, lastname }, secret, { expiresIn })
}

const resolvers = {
    Query: {
        getUser: async (_, { token }) => {
            const userId = await jwt.verify(token, process.env.SECRET)
            return userId
        },
        getProducts: async () => {
            try {
                const products = await Product.find({})
                return products
            } catch (error) {
                console.log(error)
            }
        },
        getProduct: async ({ _, id }) => {
            try {
                const product = await Product.findById(id)

                if (!product) throw new Error('Product does not exist')

                return product

            } catch (error) {
                console.log(error)
            }
        },
        getClients: async () => {
            try {
                const clients = await Client.find({})
                return clients
            } catch (error) {
                console.log(error)
            }
        },
        getClientsSeller: async (_, { }, ctx) => {
            try {
                const clients = await Client.find({ seller: ctx.user.id.toString() })
                return clients
            } catch (error) {
                console.log(error)
            }
        },
        getClientsSeller: async (_, { id }, ctx) => {
            const client = await Client.findById(id)

            if (!client) throw new Error('The client does not exist')

            if (client.seller.toString() !== ctx.user.id) throw new Error('Wrong credentials')

            return client
        },
    },
    Mutation: {
        newUser: async (_, { input }) => {
            const { email, password } = input

            const userExists = await User.findOne({ email })

            if (userExists) throw new Error('User already exists')

            const salt = await bcryptjs.genSalt(10)
            input.password = await bcryptjs.hash(password, salt)

            try {
                const user = new User(input)
                user.save()
                return user
            } catch (error) {
                console.log(error)
            }
        },
        authenticateUser: async (_, { input }) => {
            const { email, password } = input

            const userExists = await User.findOne({ email })

            if (!userExists) throw new Error('User does not exists')

            const passwordIsCorrect = await bcryptjs.compare(password, userExists.password)

            if (!passwordIsCorrect) throw new Error('Incorrect password')

            return { token: createToken(userExists, process.env.SECRET, '8h') }
        },
        newProduct: async (_, { input }) => {
            try {
                const product = new Product(input)
                const result = await product.save()
                return result

            } catch (error) {
                console.log(error)
            }
        },
        updateProduct: async (_, { id, input }) => {
            let product = await Product.findById(id)

            if (!product) throw new Error('Product does not exist')

            product = await Product.findOneAndUpdate({ _id: id }, input, { new: true })

            return product
        },
        deleteProduct: async (_, { id }) => {
            let product = await Product.findById(id)

            if (!product) throw new Error('Product does not exist')

            await Product.findOneAndDelete({ _id: id })

            return "Product deleted"
        },
        newClient: async (_, { input }, ctx) => {
            const { email } = input

            const client = Client.findOne({ email })

            if (client) throw new Error('Client already exists')

            const newClient = new Client(input)
            newClient.seller = ctx.user.id

            try {
                const result = await newClient.save()
                return result
            } catch (error) {
                console.log(error)
            }
        },
        updateClient: async (_, { id, input }, ctx) => {
            let client = await Client.findById(id)

            if (!client) throw new Error('Client does not exist')

            if (client.seller.toString() !== ctx.user.id) throw new Error('Wrong credentials')

            client = await Client.findOneAndUpdate({ _id: id }, input, { new: true })

            return client
        },
        deleteProduct: async (_, { id }, ctx) => {
            let client = await Client.findById(id)

            if (!client) throw new Error('Client does not exist')

            if (client.seller.toString() !== ctx.user.id) throw new Error('Wrong credentials')

            await Client.findOneAndDelete({ _id: id })

            return "Client deleted"
        },
    }
}

module.exports = resolvers