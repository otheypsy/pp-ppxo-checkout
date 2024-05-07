const title = 'PayPal Checkout ~ Checkout'

const credentials = {
    set: (credentials) => {
        try {
            window.localStorage.setItem('credentials', JSON.stringify(credentials))
        } catch (error) {
            console.error(error)
        }
    },
    get: () => {
        try {
            return JSON.parse(window.localStorage.getItem('credentials')) || {}
        } catch (error) {
            console.error(error)
            return {}
        }
    },
}

const routes = [
    {
        label: 'AccessToken',
        path: 'access-token',
        element: () => import('./pages/PPAccessToken'),
        isDep: false,
    },
    {
        label: 'Checkout',
        path: 'ppxo-checkout',
        element: () => import('./pages/PPXOCheckout'),
        isDep: true,
    },
]

export { title, credentials, routes }
