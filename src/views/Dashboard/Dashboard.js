import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, Spinner, Input } from '@chakra-ui/react'
import { MdTrendingFlat } from 'react-icons/md'

import { getArsCoinsPairs, getArsDollarBlue } from '../../api'
import { PERCENT_FEES, USD_FEES } from '../../enum/Fees'
import Exchanges from '../../enum/Exchanges'
import Crypto from '../../enum/Coins'
import { sortCoinsBySellValue } from '../../helpers/coinSort'
import { getBinanceP2PMethodFees } from '../../helpers/getAmountWithoutFees'
import './styles.css'

import RIPIO_LOGO from '../../images/logos/ripio.svg'
import WISE_LOGO from '../../images/logos/wise.svg'
import BINANCE_LOGO from '../../images/logos/binance.svg'

const Dashboard = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [dollarBluePrice, setDollarBluePrice] = useState(0)
  const [finalUsd, setFinalUsd] = useState(0)
  const [finalArs, setFinalArs] = useState(0)
  const [ripioBid, setRipioBid] = useState(0)
  const [initialUsd, setInitialUsd] = useState()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const arsCoinsPairs = await getArsCoinsPairs()
      const orderedCoins = sortCoinsBySellValue(arsCoinsPairs)
      const {
        data: { blue: dollarBlue },
      } = await getArsDollarBlue()
      coins.forEach(coin => {
        if (coin.coin_name === Crypto.USDC && coin.exchange === Exchanges.RIPIO) {
          setRipioBid(coin.bid)
        }
      })
      setCoins(orderedCoins)
      setDollarBluePrice(dollarBlue)

      setLoading(false)
    }
    fetchData()
  }, [])

  const handleChangeInitialUsdValue = event => {
    const {
      target: { value },
    } = event
    setInitialUsd(value)
    const finalValue = getBinanceP2PMethodFees(value)
    setFinalUsd(finalValue)
    const finalPesos = (Math.round(finalValue * ripioBid * 100) / 100).toFixed(2)
    setFinalArs(finalPesos)
  }

  const renderCoin = coin => {
    const { bid, fee, coin_name, exchange } = coin

    const totalAmount = bid - (bid * fee) / 100
    return (
      <Tr>
        <Td>{coin_name}</Td>
        <Td isNumeric>{bid}</Td>
        <Td>{fee}%</Td>
        <Td>{exchange}</Td>
        <Td>{(Math.round(totalAmount * 100) / 100).toFixed(2)}</Td>
      </Tr>
    )
  }

  if (loading) {
    return (
      <div class="loader">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </div>
    )
  }

  return (
    <div class="default-view">
      <div class="default-view-child">
        <div class="default-view-content">
          <div class="dollarBlueContainer">
            <p class="dollarBlueText">DOLAR ${dollarBluePrice}</p>
          </div>
          <Table variant="simple" class="table">
            <TableCaption>Stable coins a PESO ARS</TableCaption>
            <Thead>
              <Tr>
                <Th>Criptomoneda</Th>
                <Th isNumeric>Precio venta</Th>
                <Th>Impuesto por venta</Th>
                <Th>Exchange</Th>
                <Th>Si vendo 1 cripto es equivalente en pesos a</Th>
              </Tr>
            </Thead>
            <Tbody>{coins.map(coin => renderCoin(coin))}</Tbody>
            <Tfoot>
              <Tr>
                <Th>Criptomoneda</Th>
                <Th isNumeric>Precio venta</Th>
                <Th>Impuesto por venta</Th>
                <Th>Exchange</Th>
                <Th>Si vendo 1 cripto es equivalente en pesos a</Th>
              </Tr>
            </Tfoot>
          </Table>
          <div class="convertion">
            <div class="usdInput">
              <Input
                variant="outline"
                placeholder="$USD amount"
                value={initialUsd}
                onChange={handleChangeInitialUsdValue}
              />
            </div>
            <img class="exchangeLogo" src={WISE_LOGO} alt="transferwise" />
            <div class="feeContainer">
              <MdTrendingFlat />
            </div>
            <img class="exchangeLogo" src={BINANCE_LOGO} alt="binance" />
            <div class="feeContainer">
              <p class="feeNumber">USDT${USD_FEES.BINANCE_USDT_P2P_PRICE}</p>
              <MdTrendingFlat />
            </div>
            <img class="exchangeLogo" src={BINANCE_LOGO} alt="bnb wallet" />
            <div class="feeContainer">
              <p class="feeNumber">-${USD_FEES.BINANCE_WITHDRAW_ERC20}</p>
              <MdTrendingFlat />
            </div>
            <img class="exchangeLogo" src={RIPIO_LOGO} alt="ripio" />
            <div class="feeContainer">
              <p class="feeNumber">-{PERCENT_FEES.RIPIO_USDC_TO_PESO}%</p>
              <MdTrendingFlat />
            </div>
            <div>
              <p class="finalUsd">USD${finalUsd}</p>
              <p class="finalUsd">RIPIO ARS${finalArs}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
