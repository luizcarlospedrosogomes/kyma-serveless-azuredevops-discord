module.exports = {    
    main: async function (event, context) {
        
        const res = event.extensions.response;
        
        if (event.extensions.request.body === undefined) {
            res.status(400)
            return
        }
        const { default: axios } = require('axios');
        const { message } = event.data;
        const discordMesssage = {}
        discordMesssage['content'] = message.markdown;
        try {
             await axios.post(process.env.WEBHOOK_DISCORD, discordMesssage);
             return res.status(201) 
        } catch (error) {
         return res.status(500) 
        }
    }
}