const { gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        getCourses: String
    }
`;

module.exports = typeDefs;