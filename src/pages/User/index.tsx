import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider, Input, Option, Select, Stack, Typography } from '@mui/joy'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { LOADING_STATE_T, ROLE_T, USER_T } from '../../types'
import { getAllRole } from '../../service/role'
import { getAllUser } from '../../service/user'
import { UserContext } from '../../providers/UserContext'
import ListZone from '../../features/User/ListZone'
import EditUserForm from '../../features/User/EditUserForm'
import EditUserPassword from '../../features/User/EditUserPassword'

const User = () => {
    const [roleList, setroleList] = useState([] as ROLE_T[]);
    const [userList, setuserList] = useState([] as USER_T[]);
    const [loadingState, setloadingState] = useState("En cours de chargement." as LOADING_STATE_T);
    const [selectedRole, setselectedRole] = useState(null as string | null);
    const [searchValue, setsearchValue] = useState(undefined as string | undefined);
    const [userToEdit, setuserToEdit] = useState(undefined as USER_T | undefined);
    const [userPasswordToEdit, setuserPasswordToEdit] = useState(undefined as USER_T | undefined);

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

    const filterUser = useMemo(() => {
        return userList.filter(user => {
            const matchesRole = selectedRole ? user.id_role === selectedRole : true;
            const matchesSearch = searchValue ?
                user.nomComplet.toLowerCase().includes(searchValue.toLowerCase()) ||
                user.login.toLowerCase().includes(searchValue.toLowerCase()) ||
                (user.contact?.telephone && user.contact.telephone.includes(searchValue)) ||
                (user.contact?.email && user.contact.email.includes(searchValue)) : true;

            return matchesRole && matchesSearch;
        });

    }, [userList, selectedRole, searchValue]);

    useEffect(() => {
        loadRole();
        loadUser();
    }, []);


    return (
        <UserContext.Provider value={{
            userList: filterUser,
            setuserList,
            loadUser,
            loadingState,
            roleList,
            userToEdit,
            setuserToEdit,
            userPasswordToEdit,
            setuserPasswordToEdit
        }} >
            <Stack>
                <Typography level='h2'>Gestion des utilisateurs</Typography>

                <Divider sx={{ width: 100 }} />

                <Stack mt={3} gap={1} >
                    <Stack direction={"row"} gap={1} flexWrap={'wrap'} justifyContent={"space-between"} alignItems={"center"} >
                        <Stack direction={"row"} gap={1} >
                            <Select
                                defaultValue={selectedRole}
                                onChange={(e, value) => setselectedRole(value)}
                            >
                                <Option value={null}>Tout</Option>

                                {roleList && roleList.map((value, index) => (
                                    <Option value={value.id}>{value.nom}</Option>
                                ))}
                            </Select>
                        </Stack>

                        <EditUserForm />
                        <EditUserPassword />
                    </Stack>

                    <ListZone />
                </Stack>
            </Stack>
        </UserContext.Provider>
    )
}

export default User