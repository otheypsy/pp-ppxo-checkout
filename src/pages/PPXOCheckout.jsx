import { useState, useMemo, useEffect } from 'react'
import { useGetAppState } from '../states/App/AppHooks'
import { useSetAlert } from '../states/Alert/AlertHooks'
import { loadPPScript } from '../services/ApiService'
import PayPalButtons from '../features/PayPalButtons'

const ppCart = {
    intent: 'capture',
    purchase_units: [
        {
            amount: {
                currency_code: 'USD',
                value: '100',
            },
        },
    ],
}

const PPXOCheckoutCore = () => {
    const appState = useGetAppState()
    const [isSDKLoaded, setIsSDKLoaded] = useState(false)

    useEffect(() => {
        const init = async () => {
            // Load PayPal JS SDK
            await loadPPScript({
                components: 'buttons,funding-eligibility',
                currency: ppCart.purchase_units[0].amount.currency_code,
                intent: ppCart.intent,
                'client-id': appState.clientId,
                'disable-funding': 'card',
            })
            window.paypal && setIsSDKLoaded(true)
        }
        init()

        return () => {
            setIsSDKLoaded(false)
        }
    }, [appState.clientId])

    // PayPal Buttons Configuration
    const ppConfig = useMemo(() => {
        return !isSDKLoaded
            ? undefined
            : {
                  createOrder: (data, actions) => actions.order.create(ppCart),
                  onApprove: console.log,
              }
    }, [isSDKLoaded])

    return (
        <div className="row">
            <div className="col">
                <h4 className="p-2">Checkout</h4>
                <br />
                <pre className="bg-light p-2">
                    <code>{JSON.stringify(ppCart, null, 2)}</code>
                </pre>
                <br />
                <div className="row">
                    <div className="col-4">{window.paypal && <PayPalButtons ppConfig={ppConfig} />}</div>
                </div>
            </div>
        </div>
    )
}

const PPXOCheckout = () => {
    const appState = useGetAppState()
    const { danger } = useSetAlert()

    useEffect(() => {
        if (!appState?.clientId) danger('PayPal clientId is required')
    }, [appState, danger])

    if (!appState?.clientId) return null
    return <PPXOCheckoutCore />
}

export default PPXOCheckout
