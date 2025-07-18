import { faArrowRight, faGamepad, faPhoneAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Button, ButtonGroup, Card, Chip, Stack, Tooltip, Typography } from '@mui/joy'
import React from 'react'
import { Link } from 'react-router-dom'
import { PARTIE_T } from '../../types'

const PartieCard = ({ partie }: { partie: PARTIE_T }) => {
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

                        {partie.status && (
                            <Chip color={partie.status.id == 'S02' ? 'primary'
                                : partie.status.id == 'S03' ? 'primary'
                                    : partie.status.id == 'S04' ? 'danger'
                                        : 'neutral'
                            } >{partie.status.nom}</Chip>
                        )}

                    </Stack>
                    <Typography level='body-sm'>
                        Cette partie contient {partie?.participants?.length} joueurs et a été gagnée par
                        {` `}<strong>Player1</strong>. {` `}
                        <Tooltip title="4545">
                            <Link to="tel:45454" >Cliquez pour l'appeler <FontAwesomeIcon icon={faPhoneAlt} /></Link>
                        </Tooltip>
                    </Typography>
                </Stack>
            </Stack>
            <ButtonGroup>
                <Button
                    fullWidth
                    color='primary'
                    variant='solid'
                    endDecorator={<FontAwesomeIcon icon={faArrowRight} />}
                >Gerer</Button>
                <Button>Modifier</Button>
                <Button
                    color='danger'
                    variant='soft'
                    endDecorator={<FontAwesomeIcon icon={faTimesCircle} />}
                >Supprimer</Button>
            </ButtonGroup>
        </Card>
    )
}

export default PartieCard