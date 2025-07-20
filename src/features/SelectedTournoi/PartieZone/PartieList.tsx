import { Stack, Typography } from '@mui/joy';
import { useContext } from 'react';
import PartieCard from '../../../components/PartieCard';
import { SelectedTournoiContext } from '../../../providers/SelectedTournoiContext';

const PartieList = () => {
    const { tournoi } = useContext(SelectedTournoiContext);
    if (!tournoi || !tournoi.parties) {
        return (
            <Typography level='body-md' >
                Aucune partie n'a été trouvée pour ce tournoi.
            </Typography>
        )
    }

    return (
        <Stack gap={2} direction={'row'} flexWrap='wrap' >
            {tournoi.parties.map((partie, index) => (
                <PartieCard key={index} partie={partie} />
            ))}
        </Stack>
    )
}

export default PartieList