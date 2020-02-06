import http, { IncomingMessage, ServerResponse } from 'http'
import url from 'url'

const PORT = 3000

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  let reqUrl = `http://${req.headers.host}${req.url}`
  let parseUrl = url.parse(reqUrl, true)
  console.log(parseUrl)
  res.end(reqUrl)
}
let server = http.createServer(requestListener)
server.listen(PORT)
