import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider, Input, Option, Select, Stack, Typography } from '@mui/joy'
import { useCallback, useEffect, useState } from 'react'
import { ROLE_T } from '../../types'
import { getAllRole } from '../../service/role'

const User = () => {
    const [roleList, setroleList] = useState([] as ROLE_T[]);

    const loadRole = useCallback(async () => {
        const res = await getAllRole();
        if (!res) return;
        setroleList(res);
    }, []);

    useEffect(() => {
        loadRole();
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

                    <Select defaultValue={roleList[0]?.id} >
                        {roleList && roleList.map((value, index) => (
                            <Option value={value.id}>{value.nom}</Option>
                        ))}
                    </Select>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default User