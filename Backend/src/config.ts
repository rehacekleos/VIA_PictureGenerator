export let config = function () {
    let node_env = 'production';
    return configuration[node_env];
}

let configuration = {
    production : {
        mongoDbUri: 'mongodb+srv://MongoUser:GN17WVoBWWHXwPOx@picturegenerator.ioyr9u0.mongodb.net/?retryWrites=true&w=majority',
        mongoDatabase: 'PictureGenerator',

        usersCollection: 'users',
        imagesCollection: 'images',

        dallE_API_KEY: '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',

        jwtSecret: 'W17IR3Wz1dBkZVKZsditfWr3mbTzs96JZv6a7Q6ck9MYKcGfV4tBfrxeJGYPX6tf',

        version: '0.0.1'
    }
}
