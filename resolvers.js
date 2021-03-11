// const { GraphQLScalarType } = require('graphql');
//
// let id = 0;
// var users = [
//     { "githubLogin": "mHattrup", "name": "Mike Hattrup" },
//     { "githubLogin": "gPlake", "name": "Glen Plake" },
//     { "githubLogin": "sSchmidt", "name": "Scot Schmidt" }
// ];
//
// var tags = [
//     { "photoID": "1", "userID": "gPlake" },
//     { "photoID": "2", "userID": "sSchmidt" },
//     { "photoID": "2", "userID": "mHattrup" },
//     { "photoID": "2", "userID": "gPlake" }
// ];
//
// var photos = [
//     {
//         "id": "1",
//         "name": "Dropping the Heart Chute",
//         "description": "The heart chute is one of my favorite chutes",
//         "category": "ACTION",
//         "created": "3-28-1977",
//         "githubUser": "gPlake"
//     },
//     {
//         "id": "2",
//         "name": "Enjoying the sunshine",
//         "category": "SELFIE",
//         "created": "1-2-1985",
//         "githubUser": "sSchmidt"
//     },
//     {
//         "id": "3",
//         "name": "Gunbarrel 25",
//         "description": "25 laps on gunbarrel today",
//         "category": "LANDSCAPE",
//         "created": "2018-04-15T19:09:57.308Z",
//         "githubUser": "sSchmidt"
//     }
// ];
//
//
// module.exports = {
//     Query: {
//         totalPhotos: (parent, args, context) => context.collection('listingsAndReviews').estimatedDocumentCount(),
//         allPhotos: () => photos
//     },
//     Mutation: {
//         postPhoto: (parent, args) => {
//             const newPhoto = {
//                 id: id++,
//                 ...args.input,
//                 created: new Date()
//             }
//
//             photos.push(newPhoto);
//
//             return newPhoto;
//         }
//     },
//     Photo: {
//         url: parent => `http://yoursite.com/img/${parent.id}.jpg`,
//         postedBy: parent => {
//             return users.find(u => u.githubLogin === parent.githubUser)
//         },
//         taggedUsers: parent => tags.filter(tag => tag.photoID === parent.id)
//             .map(tag => tag.userID)
//             .map(userID => users.find(u => u.githubLogin === userID))
//     },
//     User: {
//         postedPhotos: parent => {
//             return photos.filter(p => p.githubUser === parent.githubUser)
//         },
//         inPhotos: parent => tags.filter(tag => tag.userID === parent.id)
//             .map(tag => tag.photoID)
//             .map(photoID => photos.find(p => p.id === photoID))
//     },
//     DateTime: new GraphQLScalarType({
//         name: 'DateTime',
//         description: 'A valid date time value.',
//         parseValue: value => new Date(value),
//         serialize: value => new Date(value).toISOString(),
//         parseLiteral: ast => ast.value
//     })
// }