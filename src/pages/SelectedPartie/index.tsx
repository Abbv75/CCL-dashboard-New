import { Breadcrumbs, Divider, Stack, Typography } from '@mui/joy'
import { useCallback, useEffect, useState } from 'react'
import { PARTIE_T, TOURNOI_T } from '../../types'
import { SelectedPartieContext, } from '../../providers/SelectedPartieContext'
import { Link, useParams } from 'react-router-dom'
import { getPartie } from '../../service/partie'
import ListZone from '../../features/SelectedPartie/ListZone'
import { getTournoi } from '../../service/tournoi'
import AddParticipantZone from '../../features/SelectedPartie/AddParticipantZone'

const SelectedPartie = () => {
    const { idTournoi, idPartie } = useParams();

    const [partie, setpartie] = useState(undefined as PARTIE_T | undefined);
    const [tournoi, settournoi] = useState(undefined as TOURNOI_T | undefined);

    const loadPartie = useCallback(async () => {
        const res = await getPartie(idTournoi as string, idPartie as string);
        if (!res) return;
        setpartie(res);
    }, []);

    const loadTournoi = useCallback(async () => {
        const res = await getTournoi(idTournoi as string);
        if (!res) return;
        settournoi(res);
    }, []);

    useEffect(() => {
        loadPartie();
        loadTournoi();
    }, []);

    if (!partie || !tournoi) {
        return;
    }

    return (
        <SelectedPartieContext.Provider value={{
            partie,
            tournoi,
            loadPartie
        }} >
            <Stack>
                <Breadcrumbs separator=">" aria-label="breadcrumbs">
                    <Link to="/tournoi" style={{ textDecoration: 'none' }}>
                        <Typography level='h4'>Gestion des tournois</Typography>
                    </Link>
                    <Link to={`/tournoi-selectionne/${idTournoi}`} style={{ textDecoration: 'none' }}>
                        <Typography level='title-md'>...</Typography>
                    </Link>
                    <Typography level='title-md'>{partie.dateHeure}</Typography>
                </Breadcrumbs>

                <Divider sx={{ width: 100 }} />

                <Stack mt={5} gap={5} >
                    <AddParticipantZone />

                    <ListZone />
                </Stack>
            </Stack>
        </SelectedPartieContext.Provider>
    )
}

export default SelectedPartie