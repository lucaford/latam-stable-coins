//TODO: all the api calls should go to a single endpoint

import { getRipioUsdcArsPair, getRipioDaiArsPair } from './ripio'
import { getBuenBitDaiArsPair } from './buenbit'
import { getSatoshiTangoDaiArsPair, getSatoshiTangoUsdcArsPair } from './satoshitango'

import Exchanges from '../enum/Exchanges'
import Pairs from '../enum/Pairs'

export const getArsCoinsPairs = async () => {
  const { data: ripioUsdcArsPair } = await getRipioUsdcArsPair()
  const { data: ripioDaiArsPair } = await getRipioDaiArsPair()

  const { data: buenBitDaiArsPair } = await getBuenBitDaiArsPair()

  const { data: satoshiTangoDaiArsPair } = await getSatoshiTangoDaiArsPair()
  const { data: satoshiTangoUsdcArsPair } = await getSatoshiTangoUsdcArsPair()

  const coins = [
    { ...ripioUsdcArsPair, pair_name: Pairs.USDC_ARS, exchange: Exchanges.RIPIO, fee: 1 },
    { ...ripioDaiArsPair, pair_name: Pairs.DAI_ARS, exchange: Exchanges.RIPIO, fee: 1 },
    { ...buenBitDaiArsPair, pair_name: Pairs.DAI_ARS, exchange: Exchanges.BUENBIT, fee: 0 },
    {
      ...satoshiTangoDaiArsPair,
      pair_name: Pairs.DAI_ARS,
      exchange: Exchanges.SATOSHITANGO,
      fee: 1,
    },
    {
      ...satoshiTangoUsdcArsPair,
      pair_name: Pairs.USDC_ARS,
      exchange: Exchanges.SATOSHITANGO,
      fee: 1,
    },
  ]
  return coins
}
