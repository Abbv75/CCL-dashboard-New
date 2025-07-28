import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const CustomTable = ({ theadCells, data }: { theadCells: string[], data: any[][] }) => {
    return (
            <TableContainer >
                <Table>
                    <TableHead>
                        <TableRow>
                            {theadCells.map((value, CustomTable) => (
                                <TableCell key={CustomTable}>{value}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((value, CustomTable) => (
                            <TableRow key={CustomTable} >
                                {value.map((valueTmp, CustomTable) => (
                                    <TableCell key={CustomTable} >{valueTmp}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    )
}

export default CustomTable