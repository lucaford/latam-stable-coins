import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from '@chakra-ui/react'

import { getArsCoinsPairs } from '../../api'
import { sortCoinsBySellValue } from '../../helpers/coinSort'
import './styles.css'

const Dashboard = () => {
  const [coins, setCoins] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const arsCoinsPairs = await getArsCoinsPairs()
      const orderedCoins = sortCoinsBySellValue(arsCoinsPairs)
      setCoins(orderedCoins)
    }
    fetchData()
  }, [])

  const renderCoin = coin => (
    <Tr>
      <Td>{coin.pair_name}</Td>
      <Td isNumeric>{coin.bid}</Td>
      <Td>{coin.fee}%</Td>
      <Td>{coin.exchange}</Td>
      <Td>{coin.bid * 10 - (coin.bid * 10 * coin.fee) / 100}</Td>
    </Tr>
  )

  return (
    <div class="default-view">
      <div class="default-view-child">
        <div class="default-view-content">
          <Table variant="simple" class="table">
            <TableCaption>Stable coins a PESO ARS</TableCaption>
            <Thead>
              <Tr>
                <Th>Nombre par</Th>
                <Th isNumeric>Precio venta</Th>
                <Th>Impuesto por venta</Th>
                <Th>Exchange</Th>
                <Th>Si vendo 10 de crypto recibo</Th>
              </Tr>
            </Thead>
            <Tbody>{coins.map(coin => renderCoin(coin))}</Tbody>
            <Tfoot>
              <Tr>
                <Th>Nombre par</Th>
                <Th isNumeric>Precio venta</Th>
                <Th>Impuesto por venta</Th>
                <Th>Exchange</Th>
                <Th>Si vendo 10 de crypto recibo</Th>
              </Tr>
            </Tfoot>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
