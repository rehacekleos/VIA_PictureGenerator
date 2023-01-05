import {ConfigFactory} from '../../factories/configFactory';

const { Configuration, OpenAIApi } = require("openai");



export class DallEService{

    openAI;
    constructor() {
        const configuration = new Configuration({
            apiKey: ConfigFactory.getConfig().dallE_API_KEY,
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
        console.log(response.data);
        const data = response.data.data[0].b64_json
        const buffer = new Buffer(data, "base64");
        return buffer;
    }

}