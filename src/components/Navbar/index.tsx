import { Button, Card, Divider, List, ListItem, Menu, MenuList, Stack, Typography } from '@mui/joy'
import { Link } from 'react-router-dom'
import { PAGE_PATH } from '../../constant'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    return (
        <Card sx={{
            borderRadius: 0,
            borderTop: 0,
            p: 1,
            minWidth: 200,
            justifyContent: "space-between"
        }} >
            <Stack gap={1} >
                {PAGE_PATH.map((value, index) => (
                    <>
                        <Link key={index} to={value.href}>
                            <Typography startDecorator={<FontAwesomeIcon icon={value.icon} />} >{value.label}</Typography>
                        </Link>
                        <Divider sx={{ width: 50 }} />
                    </>
                ))}
            </Stack>

            <Button color='danger' endDecorator={<FontAwesomeIcon icon={faLock} />} >Deconnexion</Button>
        </Card>
    )
}

export default Navbar