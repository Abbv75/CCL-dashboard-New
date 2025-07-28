import { faSearch, faSearchMinus, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Card, Input, Sheet, Stack } from '@mui/joy'
import { Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useMemo, useState } from 'react'

const CustomTable = ({ theadCells, data }: { theadCells: string[], data: any[][] }) => {
    const [showSearchBar, setshowSearchBar] = useState(false);
    const [search, setsearch] = useState(undefined as undefined | string);

    const filteredData = useMemo(() => (data.filter(value => {
        if (!search) return true;

        return value.some(element => element?.toString()?.toLowerCase()?.includes(search.toLowerCase()))
    })), [data, search])


    return (
        <Sheet>
            <Stack
                direction={'row'}
                gap={1}
                alignItems={'center'}
                component={Card}
                p={0.5}
                px={1}
            >
                <Collapse in={showSearchBar} orientation='horizontal' >
                    <Input
                        placeholder='Rechercher ...'
                        onChange={({ target }) => setsearch(target.value)}
                        value={search}
                        endDecorator={<FontAwesomeIcon
                            icon={faTimesCircle}
                            color='red'
                            onClick={() => {setsearch(''); setshowSearchBar(false)}}
                            style={{ cursor: 'pointer' }}
                        />}
                        sx={{ maxWidth: window.innerWidth < 700 ? 250 : 'initial' }}
                        onBlur={() => (!search || search =='') && setshowSearchBar(false)}
                    />
                </Collapse>

                <Avatar
                    color='primary'
                    children={<FontAwesomeIcon icon={showSearchBar ? faSearchMinus : faSearch} />}
                    onClick={() => setshowSearchBar(!showSearchBar)}
                    sx={{ cursor: 'pointer' }}
                />
            </Stack>

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
                        {filteredData.map((value, CustomTable) => (
                            <TableRow key={CustomTable} >
                                {value.map((valueTmp, CustomTable) => (
                                    <TableCell key={CustomTable} >{valueTmp}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Sheet>
    )
}

export default CustomTable