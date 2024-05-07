import { useState } from 'react'
import CredentialsForm from '../features/CredentialsForm'
import { useSetAppState } from '../states/App/AppHooks'
import { useSetAlert } from '../states/Alert/AlertHooks'
import { createAccessToken } from '../services/ApiService'

const PPAccessToken = () => {
    const setAppState = useSetAppState()
    const { success, warning, danger } = useSetAlert()
    const [response, setResponse] = useState(undefined)

    const initialize = async (credentials) => {
        try {
            warning('Initializing BTClientInstance...')

            // Create PayPal REST Access Token
            const accessTokenResponse = await createAccessToken({
                clientId: credentials.clientId,
                clientSecret: credentials.clientSecret,
            })
            console.log('PPAccessToken: accessTokenResponse', accessTokenResponse)
            setResponse(accessTokenResponse)

            setAppState({ clientId: credentials.clientId })
            success('Ready!')
        } catch (error) {
            console.error(error)
            danger('Error!')
        }
    }

    return (
        <>
            <CredentialsForm initialize={initialize} />
            <br />
            <br />
            {response && (
                <pre className="bg-light p-2">
                    <code>{JSON.stringify(response, null, 2)}</code>
                </pre>
            )}
        </>
    )
}

export default PPAccessToken
