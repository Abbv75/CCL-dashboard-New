import { Stack } from '@mui/joy'
import Header from '../Header'

const Layout = ({ children }: { children?: JSX.Element }) => {
    return (
        <Stack>
            <Header />
            
            {children}
        </Stack>
    )
}

export default Layout