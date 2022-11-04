import axios from 'axios'
import scriptTitle from '../helpers/scriptTitle'
import * as dotenv from 'dotenv'
import startServer from '../server/server'
dotenv.config()

const {
  API_KEY,
  API_PASSWORD,
  SHOP
} = process.env

const ngrokURL = 'https://d686-2607-fea8-c2df-f26b-5d76-79f3-23f2-7825.ngrok.io'

const webhookURL = `https://${API_KEY}:${API_PASSWORD}@${SHOP}/admin/api/2021-01/webhooks.json`

const connectWebHook = async (webhookTopic) => {
  try {
    const res = await axios({
      method: 'post',
      url: webhookURL,
      data: {
        webhook: {
          topic: webhookTopic,
          address: `${ngrokURL}/webhooks/${webhookTopic}`,
          format: 'json'
        }
      }
    })
    return res.data.webhooks
  } catch (err) {
    console.log(err.message)
  }
}

const getConnectedWebhooks = async () => {
  try {
    const res = await axios({
      method: 'get',
      url: webhookURL
    })
    return res.data.webhooks
  } catch (err) {
    console.log(err.message)
  }
}

const deleteAllWebhooks = async (connectedWebhooks) => {
  try {
    const webhookIds = connectedWebhooks.map(webhook => webhook.id)
    await Promise.allSettled(webhookIds.map(async (id) => {
      await axios({
        method: 'delete',
        url: webhookURL.replace('.json', `/${id}.json`)
      })
    }))
  } catch (err) {
    console.log(err.message)
  }
}

const webhook = async () => {
  scriptTitle('Webhook Test')

  await startServer()
  // await connectWebHook('themes/update')

  const connectedWebhooks = await getConnectedWebhooks()
  console.log(connectedWebhooks)

  // await deleteAllWebhooks(connectedWebhooks)
}

export default webhook
