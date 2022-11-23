export let config = function () {
    let node_env = process.env.APP_MODE || 'localhost';
    return configuration[node_env];
}

let configuration = {
    production : {
        mongoDbUri: 'mongodb+srv://MongoUser: GN17WVoBWWHXwPOx@picturegenerator.ioyr9u0.mongodb.net/?retryWrites=true&w=majority',
        mongoDatabase: 'PictureGenerator',

        version: '0.0.1'
    },
    localhost: {
        mongoDbUri: 'mongodb+srv://MongoUser: GN17WVoBWWHXwPOx@picturegenerator.ioyr9u0.mongodb.net/?retryWrites=true&w=majority',
        mongoDatabase: 'PictureGenerator',

        version: '0.0.1'
    },
}
