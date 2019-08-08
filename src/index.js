const { GraphQLServer } = require('graphql-yoga')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]
let idCount = links.length

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (parent, args) => {
            link = links.find((value) => value.id === args.id)
            return link
        }
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
        updateLink: (parent, args) => {
            linkIndex = links.findIndex((value) => value.id === args.id)
            links[linkIndex].url = args.url
            links[linkIndex].description = args.description
            return links[linkIndex]
        },
        deleteLink: (parent, args) => {
            linkIndex = links.findIndex((value) => value.id === args.id)
            return links.splice(linkIndex)
        }
    },
}

const server = new GraphQLServer({
    typeDefs : './src/schema.graphql',
    resolvers,
});
server.start({ endpoint : '/graphql' } , () => console.log(`Server is running on http://localhost:4000`))