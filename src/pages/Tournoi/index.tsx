import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider, Input, Option, Select, Stack, Typography } from '@mui/joy'
import { useCallback, useEffect, useState } from 'react'
import { ROLE_T, TOURNOI_T, } from '../../types'
import { getAllRole } from '../../service/role'
import { getAllTournoi } from '../../service/tournoi'
import ListZone from '../../features/tournoi/ListZone'
import { TournoiContext } from '../../providers/TournoiContext'
const Tournoi = () => {
    const [roleList, setroleList] = useState([] as ROLE_T[]);
    const [tournoiList, settournoiList] = useState([] as TOURNOI_T[]);

    const loadRole = useCallback(async () => {
        const res = await getAllRole();
        if (!res) return;
        setroleList(res);
    }, []);

    const loadTournoi = useCallback(async () => {
        const res = await getAllTournoi();
        if (!res) return;
        settournoiList(res);
    }, []);

    useEffect(() => {
        loadRole();
        loadTournoi();
    }, [])


    return (
        <TournoiContext.Provider value={{
            tournoiList,
            settournoiList
        }} >

            <Stack>
                <Typography level='h2'>Gestion des tournois</Typography>

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
        </TournoiContext.Provider>
    )
}

export default Tournoi