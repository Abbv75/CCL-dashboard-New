import { faArrowRight, faCalendarCheck, faHandHoldingDollar, faMoneyCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, ButtonGroup, Card, Chip, Divider, Stack, Typography } from '@mui/joy'
import { LOADING_STATE_T, TOURNOI_T } from '../../types'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { deleteTournoi } from '../../service/tournoi'
import { toast } from 'react-toastify'
import { TournoiContext } from '../../providers/TournoiContext'

const TournoiCard = ({ tournoi }: { tournoi: TOURNOI_T }) => {
    const navigate = useNavigate();
    const { settournoiList, settournoiToEdit } = useContext(TournoiContext);

    const [deleteLoadingState, setdeleteLoadingState] = useState(null as LOADING_STATE_T)

    const handleDelete = async () => {
        try {
            if (!window.confirm("Voulez-vous vraiment supprimer ce tournoi ?") || !tournoi) return;

            setdeleteLoadingState("En cours de chargement.");

            const res = await deleteTournoi(tournoi.id);
            if (!res) {
                toast.error("Suppression du tournoi a échoué");
                return;
            }
            toast.success("Tournoi supprimé avec succès");

            settournoiList((prevList) => prevList.filter(t => t.id !== tournoi.id));

        } catch (error) {
            console.error("Error deleting tournoi:", error);
            toast.error("Suppression du tournois a échoué");
        } finally {
            setdeleteLoadingState(null);
        }
    }

    return (
        <Card sx={{ p: 1, }} >
            <Stack direction='row' gap={2} justifyContent='space-between' alignItems='center' >
                <Typography level='title-sm'>{tournoi.nom}</Typography>
                {tournoi.status && (
                    <Chip color={tournoi.status.id == 'S02' ? 'primary'
                        : tournoi.status.id == 'S03' ? 'primary'
                            : tournoi.status.id == 'S04' ? 'danger'
                                : 'neutral'
                    } >{tournoi.status.nom}</Chip>
                )}
            </Stack>

            <Divider />

            <Stack direction='row' gap={1} >
                <Typography
                    fontWeight={700}
                    startDecorator={<FontAwesomeIcon icon={faCalendarCheck} />}
                >Debut:</Typography>
                <Typography >{tournoi.date_debut}</Typography>
            </Stack>
            <Stack direction='row' gap={1} >
                <Typography
                    fontWeight={700}
                    startDecorator={<FontAwesomeIcon icon={faHandHoldingDollar} />}
                >Inscription:</Typography>
                <Typography >{tournoi.frais_inscription?.toLocaleString()} FCFA</Typography>
            </Stack>
            <Stack direction='row' gap={1} >
                <Typography
                    fontWeight={700}
                    startDecorator={<FontAwesomeIcon icon={faMoneyCheck} />}
                >Cash Prise:</Typography>
                <Typography >{tournoi.montant_a_gagner?.toLocaleString()} FCFA</Typography>
            </Stack>

            <Divider />

            <ButtonGroup size='sm' >
                <Button
                    fullWidth
                    color='primary'
                    variant='solid'
                    endDecorator={<FontAwesomeIcon icon={faArrowRight} />}
                    onClick={() => {
                        navigate(`/tournoi-selectionne/${tournoi.id}`);
                    }}
                >Gerer</Button>
                <Button
                    color='neutral'
                    onClick={() => settournoiToEdit(tournoi)}
                >Modifier</Button>
                <Button
                    color='danger'
                    endDecorator={<FontAwesomeIcon icon={faTimesCircle} />}
                    loading={!!deleteLoadingState}
                    onClick={handleDelete}
                >Supprimer</Button>
            </ButtonGroup>
        </Card>
    )
}

export default TournoiCard