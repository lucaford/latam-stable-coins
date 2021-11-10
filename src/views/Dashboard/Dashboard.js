import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, Spinner } from '@chakra-ui/react'

import { getArsCoinsPairs, getArsDollarBlue } from '../../api'
import { sortCoinsBySellValue } from '../../helpers/coinSort'
import './styles.css'

const Dashboard = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [dollarBluePrice, setDollarBluePrice] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const arsCoinsPairs = await getArsCoinsPairs()
      const orderedCoins = sortCoinsBySellValue(arsCoinsPairs)
      const {
        data: { blue: dollarBlue },
      } = await getArsDollarBlue()
      setCoins(orderedCoins)
      setDollarBluePrice(dollarBlue)
      setLoading(false)
    }
    fetchData()
  }, [])

  const renderCoin = coin => {
    const totalAmount = coin.bid * 10 - (coin.bid * 10 * coin.fee) / 100
    return (
      <Tr>
        <Td>{coin.coin_name}</Td>
        <Td isNumeric>{coin.bid}</Td>
        <Td>{coin.fee}%</Td>
        <Td>{coin.exchange}</Td>
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
                <Th>Si vendo 10 cripto es equivalente en pesos a</Th>
              </Tr>
            </Thead>
            <Tbody>{coins.map(coin => renderCoin(coin))}</Tbody>
            <Tfoot>
              <Tr>
                <Th>Criptomoneda</Th>
                <Th isNumeric>Precio venta</Th>
                <Th>Impuesto por venta</Th>
                <Th>Exchange</Th>
                <Th>Si vendo 10 cripto es equivalente en pesos a</Th>
              </Tr>
            </Tfoot>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
