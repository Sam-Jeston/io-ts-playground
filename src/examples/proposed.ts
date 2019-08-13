import * as t from 'io-ts'
import { ThrowReporter } from 'io-ts/lib/ThrowReporter'

export interface Endpoint {
  name: string
  describe: Function
  validateArgs: Function
  validateReturn: Function
}

function throwIfDecodeFails<Codec extends { decode: Function }>(codec: Codec, data: any) {
  const decodingResult = codec.decode(data)
  ThrowReporter.report(decodingResult)
}

const Slot = t.type({
  getSlot: t.Int
});
// Ledger.Value.CurrencySymbol
const CurrencySymbol = t.type({
  unCurrencySymbol: t.string
});
// Ledger.Value.TokenName
const TokenName = t.type({
  unTokenName: t.string
});
// Language.PlutusTx.AssocMap.Map
const MapTokenNameInteger = t.type({
  unMap: t.array(
    t.tuple([
      TokenName,
      t.Int
    ])
  )
});
// Language.PlutusTx.AssocMap.Map
const MapCurrencySymbolMapTokenNameInteger = t.type({
  unMap: t.array(
    t.tuple([
      CurrencySymbol,
      MapTokenNameInteger
    ])
  )
});
// Ledger.Value.Value
const Value = t.type({
  getValue: MapCurrencySymbolMapTokenNameInteger
});
// Main.VestingTranche
const VestingTranche = t.type({
  vestingTrancheDate: Slot,
  vestingTrancheAmount: Value
});
// Wallet.Emulator.Types.Wallet
const Wallet = t.type({
  getWallet: t.Int
});

const VestFundsReturn = t.null;
const VestFundsArgs = t.type({
  a: VestingTranche,
  b: VestingTranche,
  c: Wallet
})

export type VestFunds = (args: t.TypeOf<typeof VestFundsArgs>) => t.TypeOf<typeof VestFundsReturn>;
export const VestFundsEndpoint: Endpoint = {
  name: 'VestFunds',
  describe: () => ({
    args: RegisterVestingSchemeArgs.name,
    return: RegisterVestingSchemeReturn.name
  }),
  validateArgs: (data: any) => throwIfDecodeFails(RegisterVestingSchemeArgs, data),
  validateReturn: (data: any) => throwIfDecodeFails(RegisterVestingSchemeReturn, data)
}

const RegisterVestingSchemeReturn = t.null;
const RegisterVestingSchemeArgs = t.type({
  a: VestingTranche,
  b: VestingTranche,
  c: Wallet
})

export type RegisterVestingScheme = (args: t.TypeOf<typeof RegisterVestingSchemeArgs>) => t.TypeOf<typeof RegisterVestingSchemeReturn>;
export const RegisterVestingSchemeEndpoint: Endpoint = {
  name: 'RegisterVestingScheme',
  describe: () => ({
    args: RegisterVestingSchemeArgs.name,
    return: RegisterVestingSchemeReturn.name
  }),
  validateArgs: RegisterVestingSchemeArgs.decode,
  validateReturn: RegisterVestingSchemeReturn.decode
}

const WithdrawReturn = t.null;
const WithdrawArgs = t.type({
  a: VestingTranche,
  b: VestingTranche,
  c: Wallet,
  d: Value
})

export type Withdraw = (args: t.TypeOf<typeof WithdrawArgs>) => t.TypeOf<typeof WithdrawReturn>;
export const WithdrawEndpoint: Endpoint = {
  name: 'Withdraw',
  describe: () => ({
    args: RegisterVestingSchemeArgs.name,
    return: RegisterVestingSchemeReturn.name
  }),
  validateArgs: WithdrawArgs.decode,
  validateReturn: WithdrawReturn.decode
}

export const endpoints: Endpoint[] = [VestFundsEndpoint, RegisterVestingSchemeEndpoint, WithdrawEndpoint]