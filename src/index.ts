import { VestFunds } from './examples/proposed'
import chalk from 'chalk'

function mockPlutusResolver(contractAddress: string, endpoint: string, _payload: any, _state: any) {
  console.log(chalk.cyan(`Call made to ${contractAddress}. Endpoint ${endpoint}`))
  return Promise.resolve(null)
}

// Type error expected here, uncomment to see it
/*
VestFunds.call(
  { a: 'b' },
  mockPlutusResolver.bind(null, 'xyz', VestFunds.name)
)
*/

VestFunds.call(
  {
    a: {
      vestingTrancheDate: { getSlot: 5 },
      vestingTrancheAmount: {
        getValue: {
          unMap: [[
            { unCurrencySymbol: 'ADA' },
            {
              unMap: [[
                { unTokenName: 'TYZ' },
                5
              ]]
            }
          ]]
        }
      }
    },
    b: {
      vestingTrancheDate: { getSlot: 5 },
      vestingTrancheAmount: {
        getValue: {
          unMap: [[
            { unCurrencySymbol: 'ADA' },
            {
              unMap: [[
                { unTokenName: 'TYZ' },
                5
              ]]
            }
          ]]
        }
      }
    },
    c: {
      getWallet: 5
    }
  },
  mockPlutusResolver.bind(null, 'xyz', VestFunds.name)
)