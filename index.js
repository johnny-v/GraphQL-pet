const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server-micro');
const { MongoClient } = require('mongodb');

const typeDefs = gql`
    type Query {
        totalListingsAndReviews: Int!
        allListings: [Listing!]!
    }
    type Listing {
        _id: Int!
        listing_url: String!
        name: String!
        summary: String!
        space: String!
        description: String!
        neighborhood_overview: String!
        notes: String!
        transit: String!
        access: String!
        interaction: String!
        house_rules: String!
        property_type: String!
        room_type: String!
        bed_type: String!
        minimum_nights: String!
        maximum_nights: String!
        cancellation_policy: String!
        accommodates: Int!
        bedrooms: Int!
        beds: Int!
        number_of_reviews: Int!
        bathrooms: Int!
    }
`
const resolvers = {
    Query: {
        totalListingsAndReviews: (parent, args, context) => context.db.collection('listingsAndReviews').estimatedDocumentCount(),
        allListings: (parent, args, context) => context.db.collection('listingsAndReviews').find().toArray()
    }
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

let db;
const server = new ApolloServer({
    schema,
    context: async () => {
        if (!db) {
            try {
                const dbClient = new MongoClient(, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                })

                if (!dbClient.isConnected()) await dbClient.connect()
                db = dbClient.db('sample_airbnb') // database name

            } catch (e) {
                console.log('--->error while connecting via graphql context (db)', e)
            }
        }

        return { db }
    }
});

module.exports = server.createHandler({ path: '/api/graphql' });