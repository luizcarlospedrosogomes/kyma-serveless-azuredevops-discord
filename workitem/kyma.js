module.exports = {    
    main: async function (event, context) {
        
        const res = event.extensions.response;
        
        if (event.data === undefined) {
            res.status(400).end();
        }
        const { default: axios } = require('axios');
        const { message } = event.data;
        const discordMesssage = {}
        discordMesssage['content'] = message.markdown;
        try {
            await axios.post(process.env.WEBHOOK_DISCORD, discordMesssage);
            res.status(201).end();
        } catch (error) {
         res.status(500).end();
        }
    }
}