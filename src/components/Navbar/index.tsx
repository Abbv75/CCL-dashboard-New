import { Avatar, Button, Card, Divider, IconButton, Stack, Typography } from '@mui/joy'
import { Link, useLocation } from 'react-router-dom'
import { PAGE_PATH } from '../../constant'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faLock } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import { AppContext } from '../../providers/AppContext'

const Navbar = () => {
    const { setcurrentUser } = useContext(AppContext);

    const { pathname } = useLocation();

    const [show, setshow] = useState(true);

    return (
        <Card sx={{
            borderRadius: 0,
            borderTop: 0,
            p: 1,
            // minWidth: 200,
            justifyContent: "space-between",
            alignItems: show ? 'flex-start' : 'center'
        }} >
            <Stack gap={1} alignItems={show ? 'flex-start' : 'center'} >

                <Avatar
                    color='primary'
                    sx={{ alignSelf: "flex-end" }}
                    children={<FontAwesomeIcon icon={show ? faArrowLeft : faArrowRight} />}
                    onClick={() => setshow(!show)}
                />

                {PAGE_PATH.filter(({ toHide }) => !toHide).map((value, index) => (
                    <>
                        <Link key={index} to={value.href} style={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton><FontAwesomeIcon icon={value.icon} /></IconButton>
                            {show && (
                                <Typography color={pathname == value.href ? 'primary' : 'neutral'} >{value.label}</Typography>
                            )}
                        </Link>
                        <Divider sx={{ width: 40 }} />
                    </>
                ))}
            </Stack>

            <Button
                color='danger'
                onClick={() => {
                    setcurrentUser(undefined);
                    localStorage.removeItem('currentUser');
                }}
                fullWidth
                sx={{ gap: 1 }}
            >
                {show && 'Deconnexion'}
                <FontAwesomeIcon icon={faLock} />
            </Button>
        </Card>

    )
}

export default Navbar