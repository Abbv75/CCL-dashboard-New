import { Box, Stack } from '@mui/joy'
import Header from '../Header'
import Navbar from '../Navbar'

const Layout = ({ children }: { children?: any }) => {
    return (
        <Stack height={"100vh"} maxWidth={'100vw'} >
            <Header />
            <Stack direction={"row"} maxHeight={'calc(100% - 60px)'} maxWidth={'100%'} flex={1} >
                <Navbar />
                <Stack p={1} flex={1} maxHeight={'100%'} sx={{overflowY : 'scroll', }} children={children} />
            </Stack>

        </Stack>
    )
}

export default Layout