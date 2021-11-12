import { PERCENT_FEES, USD_FEES } from '../enum/Fees'

export const getBinanceP2PMethodFees = amount => {
  const amountWithoutUsdFees =
    amount / USD_FEES.BINANCE_USDT_P2P_PRICE - USD_FEES.BINANCE_USDT_TO_USDC - USD_FEES.BINANCE_WITHDRAW_ERC20
  const totalAmount = amountWithoutUsdFees - (amountWithoutUsdFees * PERCENT_FEES.RIPIO_USDC_TO_PESO) / 100

  return (Math.round(totalAmount * 100) / 100).toFixed(2)
}
