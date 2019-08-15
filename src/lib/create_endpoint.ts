import { Endpoint } from './Endpoint'
import { validateAgainstCodec } from './validate'
import * as t from 'io-ts'

export function createEndpoint<A extends t.Any, R extends t.Any, S extends t.Any>(name: string, argsCodec: A, returnCodec: R, stateCodec?: S): Endpoint<A, R, S> {
  return {
    name,
    call: async (data, resolverFunction, state) => {
      const validContractInput = validateAgainstCodec(argsCodec as any, data)
      if (!validContractInput) throw new Error('Bad input')

      if (state) {
        const validContractState = validateAgainstCodec(stateCodec as any, data)
        if (!validContractState) throw new Error('Bad contract state')
      }

      const contractResult = await resolverFunction(data, state)

      const validContractOutput = validateAgainstCodec(returnCodec as any, contractResult)
      if (!validContractOutput) throw new Error('Invalid contract return type')

      return contractResult
    },
    describe: () => ({
      argType: argsCodec.name,
      returnType: returnCodec.name,
      stateType: stateCodec ? stateCodec.name : ''
    }),
    validateArgs: (data) => validateAgainstCodec(argsCodec, data),
    validateReturn: (data) => validateAgainstCodec(returnCodec, data),
    validateState: (data) => validateAgainstCodec(stateCodec, data)
  }
}