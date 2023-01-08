import {ConfigFactory} from '../../factories/configFactory';

const { Configuration, OpenAIApi } = require("openai");
const jwt = require('jsonwebtoken');



export class DallEService{

    openAI;
    constructor() {
        const token = jwt.decode(ConfigFactory.getConfig().dallE_API_KEY)
        const configuration = new Configuration({
            apiKey: token.ApiKey,
        });
        this.openAI = new OpenAIApi(configuration);
    }


    async generateImage(prompt: string): Promise<Buffer> {
        const response = await this.openAI.createImage({
            prompt: prompt,
            n: 1,
            size: "512x512",
            response_format: 'b64_json'
        });
        const data = response.data.data[0].b64_json
        const buffer = new Buffer(data, "base64");
        return buffer;
    }

}