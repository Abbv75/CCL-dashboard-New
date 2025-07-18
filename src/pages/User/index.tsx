import { faEnvelopeOpen, faPhoneAlt, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, ButtonGroup, Divider, IconButton, Input, Option, Select, Stack, Tooltip, Typography } from '@mui/joy'
import { useCallback, useEffect, useState } from 'react'
import { ROLE_T, USER_T } from '../../types'
import { getAllRole } from '../../service/role'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { getAllUser } from '../../service/user'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

const User = () => {
    const [roleList, setroleList] = useState([] as ROLE_T[]);
    const [userList, setuserList] = useState([] as USER_T[]);

    const loadRole = useCallback(async () => {
        const res = await getAllRole();
        if (!res) return;
        setroleList(res);
    }, []);

    const loadUser = useCallback(async () => {
        const res = await getAllUser();
        if (!res) return;
        setuserList(res);
    }, []);

    useEffect(() => {
        loadRole();
        loadUser();
    }, [])


    return (
        <Stack>
            <Typography level='h2'>Gestion des utilisateurs</Typography>

            <Divider sx={{ width: 100 }} />

            <Stack mt={5} >
                <Stack direction={"row"} gap={1} >
                    <Input
                        sx={{ width: 300 }}
                        endDecorator={<FontAwesomeIcon icon={faSearch} />}
                    />

                    <Select defaultValue={null} >
                        <Option value={null}>Tout</Option>

                        {roleList && roleList.map((value, index) => (
                            <Option value={value.id}>{value.nom}</Option>
                        ))}
                    </Select>
                </Stack>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID COD</TableCell>
                                <TableCell>Nom</TableCell>
                                <TableCell>Contact</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {userList.map((value, index) => (
                                <TableRow key={index}>
                                    <TableCell>{value.idCOD}</TableCell>
                                    <TableCell>{value.nomComplet}</TableCell>
                                    <TableCell>
                                        <ButtonGroup size='sm' >
                                            <Tooltip title={value.contact?.telephone} >
                                                <IconButton
                                                    component="a"
                                                    href={`tel:${value.contact?.telephone}`}
                                                    children={<FontAwesomeIcon icon={faPhoneAlt} />}
                                                />
                                            </Tooltip>
                                            {value.contact?.email && (
                                                <Tooltip title={value.contact?.email} >
                                                    <IconButton
                                                        component="a"
                                                        href={`mailto:${value.contact?.email}`}
                                                        children={<FontAwesomeIcon icon={faEnvelopeOpen} />}
                                                    />
                                                </Tooltip>
                                            )}
                                            {value.contact?.whatsapp && (
                                                <Tooltip title={value.contact?.whatsapp} >
                                                    <IconButton
                                                        component="a"
                                                        href={`https://whame.com/${value.contact?.whatsapp}`}
                                                        children={<FontAwesomeIcon icon={faWhatsapp} />}
                                                    />
                                                </Tooltip>
                                            )}
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Stack>
    )
}

export default User