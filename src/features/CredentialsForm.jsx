import { useState } from 'react'
import { credentials } from '../config'

const initCredentials = credentials.get()

const CredentialsForm = (props) => {
    const [credentialsJSON, setCredentialsJSON] = useState(JSON.stringify(initCredentials, null, 4))
    const [clientId, setClientId] = useState(initCredentials?.clientId)
    const [clientSecret, setClientSecret] = useState(initCredentials?.clientSecret)

    const onChange = {
        clientId: (event) => setClientId(event.target.value),
        clientSecret: (event) => setClientSecret(event.target.value),
        credentialsJSON: (event) => setCredentialsJSON(event.target.value),
    }

    const populate = () => {
        try {
            const newCredentials = JSON.parse(credentialsJSON)
            credentials.set(newCredentials)
            setClientId(newCredentials.clientId)
            setClientSecret(newCredentials.clientSecret)
        } catch (error) {
            console.error('Invalid Credentials JSON:', error)
        }
    }

    const initialize = () => props.initialize({ clientId, clientSecret })

    return (
        <>
            <h4 className="p-2">Credentials</h4>
            <div className="bg-light p-2">
                <div className="mb-3 row">
                    <label htmlFor="credentialsJSON" className="col-sm-2 col-form-label">
                        Credentials JSON
                    </label>
                    <div className="col-sm-8">
                        <textarea
                            className="form-control"
                            rows="7"
                            value={credentialsJSON}
                            onChange={onChange.credentialsJSON}
                        />
                    </div>
                    <div className="col-sm-2">
                        <button className="btn btn-outline-primary" onClick={populate}>
                            Populate
                        </button>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="clientId" className="col-sm-2 col-form-label">
                        Client Id
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="clientId"
                            value={clientId}
                            onChange={onChange.clientId}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="clientSecret" className="col-sm-2 col-form-label">
                        Client Secret
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="clientSecret"
                            value={clientSecret}
                            onChange={onChange.clientSecret}
                        />
                    </div>
                </div>
            </div>
            <br />
            <button className="btn btn-outline-primary" onClick={initialize}>
                Create Access Token
            </button>
        </>
    )
}

export default CredentialsForm
