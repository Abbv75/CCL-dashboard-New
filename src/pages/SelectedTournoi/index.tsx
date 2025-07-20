import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Breadcrumbs, Divider, Input, Stack, Tab, tabClasses, TabList, TabPanel, Tabs, Typography } from '@mui/joy'
import { useCallback, useEffect, useState } from 'react'
import { PARTIE_T, STATUS_T, TOURNOI_T } from '../../types'
import { getTournoi } from '../../service/tournoi'
import { SelectedTournoiContext } from '../../providers/SelectedTournoiContext'
import { Link, useParams } from 'react-router-dom'
import ListZone from '../../features/SelectedTournoi/ListZone'
import AddParticipantZone from '../../features/SelectedTournoi/AddParticipantZone'
import PartieList from '../../features/SelectedTournoi/PartieZone/PartieList'
import EditPartieForm from '../../features/SelectedTournoi/PartieZone/EditPartieForm'
import { getAllSatus } from '../../service/status'

const SelectedTournoi = () => {
    const { idTournoi } = useParams();

    const [tournoi, settournoi] = useState(undefined as TOURNOI_T | undefined);

    const [statusList, setstatusList] = useState([] as STATUS_T[]);
    const [partieToEdit, setpartieToEdit] = useState(undefined as PARTIE_T | undefined);

    const loadStatus = useCallback(async () => {
        const res = await getAllSatus();
        if (!res) return;
        setstatusList(res);
    }, []);

    const loadTournoi = useCallback(async () => {
        const res = await getTournoi(idTournoi as string);
        if (!res) return;
        settournoi(res);
    }, []);

    useEffect(() => {
        loadTournoi();
        loadStatus();
    }, []);


    if (!tournoi) {
        return;
    }

    return (
        <SelectedTournoiContext.Provider value={{
            tournoi,
            settournoi,
            statusList,
            partieToEdit,
            setpartieToEdit,
            loadTournoi
        }} >
            <Stack>
                <Breadcrumbs separator=">" aria-label="breadcrumbs">
                    <Link to="/tournoi" style={{ textDecoration: 'none' }}>
                        <Typography level='h4'>Gestion des tournois</Typography>
                    </Link>
                    <Typography level='title-md'>{tournoi.nom}</Typography>
                </Breadcrumbs>

                <Divider sx={{ width: 100 }} />

                <Stack mt={5} gap={5} >
                    <Tabs defaultValue={1} sx={{ bgcolor: 'transparent' }}>
                        <TabList
                            disableUnderline
                            sx={{
                                p: 0.5,
                                gap: 0.5,
                                borderRadius: 'xl',
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                                bgcolor: 'background.level1',
                                [`& .${tabClasses.root}[aria-selected="true"]`]: {
                                    boxShadow: 'sm',
                                    bgcolor: 'background.surface',
                                },
                            }}
                            tabFlex="auto"
                        >
                            <Tab disableIndicator>
                                <Typography level='title-md'>Gestion des participants</Typography>
                            </Tab>
                            <Tab disableIndicator>
                                <Typography level='title-md'>Gestion des parties</Typography>
                            </Tab>
                        </TabList>

                        <TabPanel
                            value={0}
                            sx={{ px: 0, gap: 2, display: 'flex', flexDirection: 'column', }}
                        >
                            <AddParticipantZone />
                            <ListZone />
                        </TabPanel>

                        <TabPanel
                            value={1}
                            sx={{ px: 0, gap: 2, display: 'flex', flexDirection: 'column', }}
                        >
                            <EditPartieForm />
                            <PartieList />
                        </TabPanel>
                    </Tabs>
                </Stack>
            </Stack>
        </SelectedTournoiContext.Provider>
    )
}

export default SelectedTournoi