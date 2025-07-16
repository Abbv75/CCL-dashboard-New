import { Box, Stack } from '@mui/joy'
import Header from '../Header'
import Navbar from '../Navbar'

const Layout = ({ children }: { children?: JSX.Element }) => {
    return (
        <Stack height={"100vh"} >
            <Header />
            <Stack direction={"row"} flex={1} >
                <Navbar />
                <Box p={1} flex={1} overflow={"scroll"} children={children} />
            </Stack>

        </Stack>
    )
}

export default Layout