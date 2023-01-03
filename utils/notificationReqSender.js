
const postConfig = require("../configs/db.config")
const Client = require("node-rest-client").Client;
const client = new Client()

module.exports = (subject,content,recipients,requestor) => {

    const reqBody = {
        subject: subject,
        content: content,
        recipientEmails: recipients,
        requestor: requestor
    }

    const reqHeader = {
        "Content-Type": "application/json" //content's c should be capital
    }

    const args = {
        data: reqBody,
        headers: reqHeader
    }

    try {
        client.post(postConfig.POST_URI,args,(data, res) => {
            console.log("Request sent");
            
            console.log(data)
            
        })
    } catch (err) {
        console.log("Error while post request", err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}
