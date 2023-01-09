import axios from 'axios';

export class WordGeneratorService{
    constructor() {
    }

    async generateWords() {
        try {
            const response = await axios.get('https://random-word-api.herokuapp.com/word', {
                params: {
                    number: 2
                }
            })
            return response.data as string[];
        } catch (e){
            return []
        }

    }
}