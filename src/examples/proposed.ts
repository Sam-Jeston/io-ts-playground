import * as t from 'io-ts'
import { createEndpoint } from '../lib'

const Slot = t.type({
  getSlot: t.number
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
      t.number
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
  getWallet: t.number
});

const VestFundsReturn = t.null;
const VestFundsArgs = t.type({
  a: VestingTranche,
  b: VestingTranche,
  c: Wallet
})

const RegisterVestingSchemeReturn = t.null;
const RegisterVestingSchemeArgs = t.type({
  a: VestingTranche,
  b: VestingTranche,
  c: Wallet
})

const WithdrawReturn = t.null;
const WithdrawArgs = t.type({
  a: VestingTranche,
  b: VestingTranche,
  c: Wallet,
  d: Value
})

export const VestFunds = createEndpoint<typeof VestFundsArgs, typeof VestFundsReturn, t.NullC>('VestFunds', VestFundsArgs, VestFundsReturn)
export const RegisterVestingScheme = createEndpoint<typeof RegisterVestingSchemeArgs, typeof RegisterVestingSchemeReturn, t.NullC>('RegisterVestingScheme', RegisterVestingSchemeArgs, RegisterVestingSchemeReturn)
export const Withdraw = createEndpoint<typeof WithdrawArgs, typeof WithdrawReturn, t.NullC>('Withdraw', WithdrawArgs, WithdrawReturn)