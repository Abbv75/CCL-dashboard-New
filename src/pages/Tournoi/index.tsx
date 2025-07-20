import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider, Input, Option, Select, Stack, Typography } from '@mui/joy'
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
    const [tournoiToEdit, settournoiToEdit] = useState(undefined as TOURNOI_T | undefined);
    const [search, setsearch] = useState(undefined as string | undefined);
    const [statusSelected, setstatusSelected] = useState(null as string | null);

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

    const filterData = useCallback(() => {
        if (!tournoiList || tournoiList.length === 0) return [];
        let filteredData = tournoiList;
        if (search) {
            filteredData = filteredData.filter(tournoi => tournoi.nom.toLowerCase().includes(search.toLowerCase()));
        }
        if (statusSelected) {
            filteredData = filteredData.filter(tournoi => (tournoi.id_status as any) == statusSelected);
        }
        return filteredData;
    }, [search, tournoiList, statusSelected]);

    useEffect(() => {
        loadStatus();
        loadTournoi();
    }, []);


    return (
        <TournoiContext.Provider value={{
            tournoiList: filterData(),
            settournoiList,
            statusList,
            tournoiToEdit,
            settournoiToEdit
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
                                placeholder='Rechercher un tournoi'
                                value={search}
                                onChange={({ target }) => setsearch(target.value)}
                            />

                            <Select
                                defaultValue={statusSelected}
                                onChange={(e, value) => setstatusSelected(value)}
                            >
                                <Option value={null}>Tout</Option>

                                {statusList && statusList.map((value, index) => (
                                    <Option value={value.id}>{value.nom}</Option>
                                ))}
                            </Select>
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