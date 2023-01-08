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

        dallE_API_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcGlLZXkiOiJzay1TamtNczBXZm51TFM0dk00eWxtZlQzQmxia0ZKbHNBNFNNR1dmU1l5N0d6Q1c4czAiLCJpYXQiOjE2NzMxODQ5MzF9.Y3MMXQBSB5pASVwVa-hFHs6tXngc8GQI1cJRtFZtyYM',

        jwtSecret: 'W17IR3Wz1dBkZVKZsditfWr3mbTzs96JZv6a7Q6ck9MYKcGfV4tBfrxeJGYPX6tf',

        version: '0.0.1'
    }
}
