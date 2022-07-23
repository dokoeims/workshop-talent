import { useMemo } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

import { styles } from './styles'

export default function BooksTable({ data }) {
    return useMemo(() => {
        const { asks, bids } = data

        return (
            <TableContainer component={Paper}>
                <Table sx={styles.table} aria-label="trade-table">
                    <TableHead sx={styles.head}>
                        <TableRow>
                            <TableCell sx={styles.title}>Oferta</TableCell>
                            <TableCell/>
                            <TableCell sx={styles.title}>Demanda</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bids?.map((row, idx) => (
                            <TableRow
                                key={idx}
                                sx={styles.tableRow}
                            >
                                <TableCell sx={styles.bidAmount}>{row.amount}</TableCell>
                                <TableCell align="right" sx={styles.bidPrice}>{row.price}</TableCell>
                                <TableCell sx={styles.askPrice}>{asks[idx].price}</TableCell>
                                <TableCell align="right" sx={styles.askAmount}>{asks[idx].amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }, [data])
}
