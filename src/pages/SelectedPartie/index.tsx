import { Breadcrumbs, Divider, Stack, Tab, tabClasses, TabList, TabPanel, Tabs, Typography } from '@mui/joy'
import { useCallback, useEffect, useState } from 'react'
import { PARTIE_T, STATUS_T, TOURNOI_T } from '../../types'
import { getTournoi } from '../../service/tournoi'
import { SelectedPartieContext, } from '../../providers/SelectedPartieContext'
import { Link, useParams } from 'react-router-dom'
import ListZone from '../../features/SelectedTournoi/ListZone'
import AddParticipantZone from '../../features/SelectedTournoi/AddParticipantZone'
import PartieList from '../../features/SelectedTournoi/PartieZone/PartieList'
import EditPartieForm from '../../features/SelectedTournoi/PartieZone/EditPartieForm'
import { getAllSatus } from '../../service/status'
import { getPartie } from '../../service/partie'

const SelectedPartie = () => {
    const { idTournoi, idPartie } = useParams();

    const [partie, setpartie] = useState(undefined as PARTIE_T | undefined);

    const loadPartie = useCallback(async () => {
        const res = await getPartie(idTournoi as string, idPartie as string);
        if (!res) return;
        setpartie(res);
    }, []);

    useEffect(() => {
        loadPartie();
    }, []);

    if (!partie) {
        return;
    }

    return (
        <SelectedPartieContext.Provider value={{
            partie
        }} >
            <Stack>
                <Breadcrumbs separator=">" aria-label="breadcrumbs">
                    <Link to="/tournoi" style={{ textDecoration: 'none' }}>
                        <Typography level='h4'>Gestion des tournois</Typography>
                    </Link>
                    <Typography level='title-md'>...</Typography>
                    <Typography level='title-md'>{partie.dateHeure}</Typography>
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
        </SelectedPartieContext.Provider>
    )
}

export default SelectedPartie