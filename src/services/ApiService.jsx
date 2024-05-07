const config = {
    baseUrl: 'https://api-m.sandbox.paypal.com',
    accessToken: undefined,
}

const createAccessToken = async (credentials) => {
    console.log(credentials)
    const authorization = 'Basic ' + window.btoa(credentials.clientId + ':' + credentials.clientSecret)
    const url = config.baseUrl + '/v1/oauth2/token'

    const headers = new window.Headers()
    headers.append('Authorization', authorization)
    headers.append('Content-Type', 'application/x-www-form-urlencoded')

    const body = new URLSearchParams()
    body.append('grant_type', 'client_credentials')

    const options = {
        method: 'POST',
        headers: headers,
        body: body,
        redirect: 'follow',
    }

    const response = await fetch(url, options)
    const json = await response.json()
    if (!json.access_token) throw Error(JSON.stringify(json))
    config.accessToken = json.access_token
    return json
}

const loadPPScript = (config) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        const url = new URL('https://www.paypal.com/sdk/js')

        for (const key in config) {
            url.searchParams.append(key, config[key])
        }

        console.log(document.body)
        script.src = url.href
        script.async = true
        document.body.appendChild(script)

        script.addEventListener('load', resolve)
        script.addEventListener('error', reject)
    })
}

export { createAccessToken, loadPPScript }
