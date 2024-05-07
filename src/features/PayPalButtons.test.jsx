import { beforeAll, beforeEach, describe, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { loadPPScript } from '../services/ApiService'
import PayPalButtons from './PayPalButtons'

describe('PayPalButtons test', async () => {
    beforeAll(async () => {
        const config = {
            components: 'buttons,funding-eligibility',
            'client-id': 'test',
        }
        const temp = loadPPScript(config)
        console.log(temp)
    })

    beforeEach(() => {
        const ppConfig = {}
        render(<PayPalButtons ppConfig={ppConfig} />)
    })

    test('should render PayPal Buttons', () => {
        //console.log(screen)
    })
})
