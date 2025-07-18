import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider, Input, Option, Select, Stack, Typography } from '@mui/joy'
import { useCallback, useEffect, useState } from 'react'
import { LOADING_STATE_T, ROLE_T, USER_T } from '../../types'
import { getAllRole } from '../../service/role'
import { getAllUser } from '../../service/user'
import { UserContext } from '../../providers/UserContext'
import ListZone from '../../features/User/ListZone'

const User = () => {
    const [roleList, setroleList] = useState([] as ROLE_T[]);
    const [userList, setuserList] = useState([] as USER_T[]);
    const [loadingState, setloadingState] = useState("En cours de chargement." as LOADING_STATE_T);

    const loadRole = useCallback(async () => {
        const res = await getAllRole();
        if (!res) return;
        setroleList(res);
    }, []);

    const loadUser = useCallback(async () => {
        try {
            setloadingState("En cours de chargement.");
            const res = await getAllUser();
            if (!res) return;
            setuserList(res);
        } catch (error) {
            console.error("Error loading users:", error);
        } finally {
            setloadingState(null);
        }
    }, []);

    useEffect(() => {
        loadRole();
        loadUser();
    }, [])


    return (
        <UserContext.Provider value={{
            userList,
            setuserList,
            loadUser,
            loadingState
        }} >

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

                    <ListZone />
                </Stack>
            </Stack>
        </UserContext.Provider>
    )
}

export default User