import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider, Input, Stack, Typography } from '@mui/joy'
import { useCallback, useEffect, useState } from 'react'
import { STATUS_T, TOURNOI_T } from '../../types'
import { getAllTournoi } from '../../service/tournoi'
import ListZone from '../../features/tournoi/ListZone'
import { TournoiContext } from '../../providers/TournoiContext'
import EditZone from '../../features/tournoi/EditZone'
import { getAllSatus } from '../../service/status'
const Tournoi = () => {
    const [tournoiList, settournoiList] = useState([] as TOURNOI_T[]);
    const [statusList, setstatusList] = useState([] as STATUS_T[]);

    const loadTournoi = useCallback(async () => {
        const res = await getAllTournoi();
        if (!res) return;
        settournoiList(res);
    }, []);

    const loadStatus = useCallback(async () => {
        const res = await getAllSatus();
        if (!res) return;
        setstatusList(res);
    }, []);

    useEffect(() => {
        loadStatus();
        loadTournoi();
    }, []);


    return (
        <TournoiContext.Provider value={{
            tournoiList,
            settournoiList,
            statusList
        }} >

            <Stack>
                <Typography level='h2'>Gestion des tournois</Typography>

                <Divider sx={{ width: 100 }} />

                <Stack mt={5} gap={5} >
                    <Stack direction={"row"} gap={2} justifyContent={"space-between"} alignItems={"center"} >
                        <Stack direction={"row"} gap={1} >
                            <Input
                                sx={{ width: 300 }}
                                endDecorator={<FontAwesomeIcon icon={faSearch} />}
                            />
                        </Stack>

                        <EditZone />
                    </Stack>

                    <ListZone />
                </Stack>
            </Stack>
        </TournoiContext.Provider>
    )
}

export default Tournoi