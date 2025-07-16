import { Card, Divider, List, ListItem, Menu, MenuList, Typography } from '@mui/joy'
import { Link } from 'react-router-dom'
import { PAGE_PATH } from '../../constant'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = () => {
    return (
        <Card sx={{
            borderRadius: 0,
            borderTop: 0,
            p: 1,
            minWidth: 200
        }} >
            {PAGE_PATH.map((value, index) => (
                <>
                    <Link key={index} to={value.href}>
                        <Typography startDecorator={<FontAwesomeIcon icon={value.icon} />} >{value.label}</Typography>
                    </Link>
                    <Divider sx={{ width: 50 }} />
                </>
            ))}
        </Card>
    )
}

export default Navbar