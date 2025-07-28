import { Stack } from '@mui/joy'
import Header from '../Header'
import Navbar from '../Navbar'

const Layout = ({ children }: { children?: any }) => {
    return (
        <Stack height={"100vh"} maxWidth={'100vw'} >
            <Header />
            <Stack direction={"row"} maxHeight={'calc(100% - 57px)'} flex={1} >
                <Navbar />
                <Stack
                    p={1}
                    flex={1}
                    maxHeight={'100%'}
                    overflow={'auto'}
                    children={children}
                    width={'calc(100% - 80px)'}
                />
            </Stack>
        </Stack>
    )
}

export default Layout