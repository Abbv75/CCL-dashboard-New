import { Avatar, ButtonGroup, Card, IconButton, Stack, Typography } from '@mui/joy'
import { CardMedia } from '@mui/material'
import { IMAGES } from '../../constant'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    return (
        <Card sx={{ p: 1, borderRadius: 0 }} >
            <Stack direction={"row"} justifyContent={"space-between"} >
                <Typography
                    startDecorator={<Avatar children={<CardMedia component={"img"} src={IMAGES.logo} />} />}
                >CCL</Typography>
                <ButtonGroup variant='plain' >
                    <IconButton children={<FontAwesomeIcon icon={faUserAstronaut} />} />
                    <IconButton children={<FontAwesomeIcon icon={faLock} />} />
                </ButtonGroup>
            </Stack>
        </Card>
    )
}

export default Header