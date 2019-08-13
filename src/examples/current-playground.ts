import * as t from 'io-ts';
// Ledger.Slot.Slot
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
const VestFundsArgA = VestingTranche;
const VestFundsArgB = VestingTranche;
const VestFundsArgC = Wallet;
const VestFundsArgReturn = t.null;
export type VestFunds = (
  a: t.TypeOf<typeof VestFundsArgA>,
  b: t.TypeOf<typeof VestFundsArgB>,
  c: t.TypeOf<typeof VestFundsArgC>
) => t.TypeOf<typeof VestFundsArgReturn>;
const RegisterVestingSchemeArgA = VestingTranche;
const RegisterVestingSchemeArgB = VestingTranche;
const RegisterVestingSchemeArgC = Wallet;
const RegisterVestingSchemeArgReturn = t.null;
export type RegisterVestingScheme = (
  a: t.TypeOf<typeof RegisterVestingSchemeArgA>,
  b: t.TypeOf<typeof RegisterVestingSchemeArgB>,
  c: t.TypeOf<typeof RegisterVestingSchemeArgC>
) => t.TypeOf<typeof RegisterVestingSchemeArgReturn>;
const WithdrawArgA = VestingTranche;
const WithdrawArgB = VestingTranche;
const WithdrawArgC = Wallet;
const WithdrawArgD = Value;
const WithdrawArgReturn = t.null;
export type Withdraw = (
  a: t.TypeOf<typeof WithdrawArgA>,
  b: t.TypeOf<typeof WithdrawArgB>,
  c: t.TypeOf<typeof WithdrawArgC>,
  d: t.TypeOf<typeof WithdrawArgD>
) => t.TypeOf<typeof WithdrawArgReturn>;