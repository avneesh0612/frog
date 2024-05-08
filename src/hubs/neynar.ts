import type { TrustedData } from '../types/frame.js'
import { createHub } from './utils.js'
// @ts-ignore
import { name, version } from '../package.json'
export type NeynarHubParameters = {
  apiKey: string
}

export const neynar = createHub((parameters: NeynarHubParameters) => {
  const { apiKey } = parameters

  return {
    apiUrl: 'https://hub-api.neynar.com',
    fetchOptions: {
      headers: {
        api_key: apiKey,
      },
    },
    verifyFrame: async ({ trustedData }: { trustedData: TrustedData }) => {
      return await fetch('https://api.neynar.com/v2/farcaster/frame/validate', {
        method: 'POST',
        headers: {
          api_key: apiKey,
          'content-type': 'application/json',
          'x-client': name,
          'x-client-version': version,
        },
        body: JSON.stringify({
          message_bytes_in_hex: `0x${trustedData.messageBytes}`,
        }),
      }).then(async (res) => res.json())
    },
  }
})
