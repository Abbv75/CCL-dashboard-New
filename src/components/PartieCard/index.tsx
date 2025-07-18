import { faArrowRight, faGamepad, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Button, ButtonGroup, Card, Stack, Typography } from '@mui/joy'
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