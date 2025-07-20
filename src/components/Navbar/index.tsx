import { Avatar, Button, Card, Divider, Stack, Typography } from '@mui/joy'
import { Link, useLocation } from 'react-router-dom'
import { PAGE_PATH } from '../../constant'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faLock } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { AppContext } from '../../providers/AppContext'

const Navbar = () => {
    const {setcurrentUser} = useContext(AppContext);

    const { pathname } = useLocation();

    return (
        <Card sx={{
            borderRadius: 0,
            borderTop: 0,
            p: 1,
            minWidth: 200,
            justifyContent: "space-between",

        }} >
            <Stack gap={1} >

                <Avatar color='primary' sx={{ alignSelf: "flex-end" }} children={<FontAwesomeIcon icon={faArrowLeft} />} />

                {PAGE_PATH.filter(({ toHide }) => !toHide).map((value, index) => (
                    <>
                        <Link key={index} to={value.href}>
                            <Typography color={pathname == value.href ? 'primary' : 'neutral'} startDecorator={<FontAwesomeIcon icon={value.icon} />} >{value.label}</Typography>
                        </Link>
                        <Divider sx={{ width: 50 }} />
                    </>
                ))}
            </Stack>

            <Button
                color='danger'
                endDecorator={<FontAwesomeIcon icon={faLock} />}
                onClick={()=>{
                    setcurrentUser(undefined);
                    localStorage.removeItem('currentUser');
                }}
            >Deconnexion</Button>
        </Card>

    )
}

export default Navbar