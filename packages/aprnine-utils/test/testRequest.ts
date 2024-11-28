import {CommonRequest} from "../src";

const request = new CommonRequest({ baseUrl: 'http://localhost:4949' })

request.get('/test', { id: 10086 })
.then(res => {
    console.log(res)
})
