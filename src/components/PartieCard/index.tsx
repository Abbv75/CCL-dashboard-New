import { faArrowRight, faGamepad, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Button, ButtonGroup, Card, Stack, Typography } from '@mui/joy'
import { LOADING_STATE_T, PARTIE_T } from '../../types'
import { deletePartie } from '../../service/partie'
import { useContext, useState } from 'react'
import { SelectedTournoiContext } from '../../providers/SelectedTournoiContext'
import { toast } from 'react-toastify'

const PartieCard = ({ partie }: { partie: PARTIE_T }) => {
    const { tournoi, settournoi, setpartieToEdit } = useContext(SelectedTournoiContext);
    const [deleteLoadingState, setdeleteLoadingState] = useState(null as LOADING_STATE_T)

    const handleDelete = async () => {
        try {
            if (!window.confirm("Voulez-vous vraiment supprimer cette partie ?") || !tournoi) return;

            setdeleteLoadingState("En cours de chargement.");
            const res = await deletePartie(tournoi.id, partie.id);
            if (!res) {
                toast.error("Suppression de la partie a échoué");
                return;
            }
            toast.success("Partie supprimée avec succès");

            settournoi({
                ...tournoi,
                parties: tournoi.parties?.filter(p => p.id !== partie.id)
            });

        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Suppression de l'utilisateur a échoué");
        } finally {
            setdeleteLoadingState(null);
        }
    }

    return (
        <Card sx={{ p: 1, width: '300px' }} >
            <Stack direction='row' gap={2} >
                <Avatar
                    size='lg'
                    children={<FontAwesomeIcon icon={faGamepad} />}
                />
                <Stack flex={1} >
                    <Stack direction='row' justifyContent='space-between' gap={1} alignItems='center'>
                        <Typography level='title-md'>{partie.dateHeure}</Typography>
                    </Stack>
                </Stack>
            </Stack>
            <ButtonGroup>
                <Button
                    fullWidth
                    color='primary'
                    variant='solid'
                    endDecorator={<FontAwesomeIcon icon={faArrowRight} />}
                >Gerer</Button>
                <Button
                    fullWidth
                    color='neutral'
                    variant='soft'
                    onClick={() => setpartieToEdit(partie)}
                >Modifier</Button>
                <Button
                    color='danger'
                    variant='soft'
                    endDecorator={<FontAwesomeIcon icon={faTimesCircle} />}
                    loading={!!deleteLoadingState}
                    onClick={handleDelete}
                >Supprimer</Button>
            </ButtonGroup>
        </Card>
    )
}

export default PartieCard