import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider, Input, Stack, Typography } from '@mui/joy'
import { useCallback, useEffect, useState } from 'react'
import { TOURNOI_T } from '../../types'
import { getAllTournoi } from '../../service/tournoi'
import ListZone from '../../features/tournoi/ListZone'
import { TournoiContext } from '../../providers/TournoiContext'
const Tournoi = () => {
    const [tournoiList, settournoiList] = useState([] as TOURNOI_T[]);

    const loadTournoi = useCallback(async () => {
        const res = await getAllTournoi();
        if (!res) return;
        settournoiList(res);
    }, []);

    useEffect(() => {
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

                <Stack mt={5} gap={5} >
                    <Stack direction={"row"} gap={1} >
                        <Input
                            sx={{ width: 300 }}
                            endDecorator={<FontAwesomeIcon icon={faSearch} />}
                        />
                    </Stack>

                    <ListZone />
                </Stack>
            </Stack>
        </TournoiContext.Provider>
    )
}

export default Tournoi