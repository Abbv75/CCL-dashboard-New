import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider, Input, Stack, Typography } from '@mui/joy'
import { useCallback, useEffect, useState } from 'react'
import { TOURNOI_T } from '../../types'
import { getTournoi } from '../../service/tournoi'
import { SelectedTournoiContext } from '../../providers/SelectedTournoiContext'
import { useParams } from 'react-router-dom'

const SelectedTournoi = () => {
    const [tournoi, settournoi] = useState(undefined as TOURNOI_T | undefined);
    // get idTournoi from react router params
    const { idTournoi } = useParams();

    const loadTournoi = useCallback(async () => {
        const res = await getTournoi(idTournoi as string);
        if (!res) return;
        settournoi(res);
    }, []);

    useEffect(() => {
        loadTournoi();
    }, []);

    if (!tournoi) {
        return;
    }

    return (
        <SelectedTournoiContext.Provider value={{
            tournoi,
            settournoi
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

                </Stack>
            </Stack>
        </SelectedTournoiContext.Provider>
    )
}

export default SelectedTournoi