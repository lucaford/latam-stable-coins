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
  }, [coins])

  const renderCoin = coin => (
    <Tr>
      <Td>{coin.pair_name}</Td>
      <Td isNumeric>{coin.bid}</Td>
      <Td>{coin.exchange}</Td>
    </Tr>
  )

  return (
    <div class="container">
      <Table variant="simple">
        <TableCaption>Stable coins a PESO ARS</TableCaption>
        <Thead>
          <Tr>
            <Th>Nombre par</Th>
            <Th isNumeric>Precio venta</Th>
            <Th>Exchange</Th>
          </Tr>
        </Thead>
        <Tbody>{coins.map(coin => renderCoin(coin))}</Tbody>
        <Tfoot>
          <Tr>
            <Th>Nombre par</Th>
            <Th isNumeric>Precio venta</Th>
            <Th>Exchange</Th>
          </Tr>
        </Tfoot>
      </Table>
    </div>
  )
}

export default Dashboard
