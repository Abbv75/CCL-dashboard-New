import { faArrowRight, faCalendarCheck, faHandHoldingDollar, faMoneyCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, ButtonGroup, Card, Chip, Divider, Stack, Typography } from '@mui/joy'
import { TOURNOI_T } from '../../types'
import { useNavigate } from 'react-router-dom'

const TournoiCard = ({ tournoi }: { tournoi: TOURNOI_T }) => {
    const navigate = useNavigate();

    return (
        <Card sx={{ p: 1 }} >
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

            <ButtonGroup>
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
                >Modifier</Button>
                <Button
                    color='danger'
                    endDecorator={<FontAwesomeIcon icon={faTimesCircle} />}
                >Supprimer</Button>
            </ButtonGroup>
        </Card>
    )
}

export default TournoiCard