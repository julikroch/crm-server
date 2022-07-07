const { gql } = require('apollo-server')

const typeDefs = gql`
    type Course {
        title: String
        technology: String
    }

    type Technology {
        technology: String
    }

    type Query {
        getCourses: [Course]
        getTechnology: [Technology]
    }
`;

module.exports = typeDefs;