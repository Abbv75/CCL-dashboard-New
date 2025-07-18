import { useContext } from 'react'
import CustomTable from '../../components/CustomTable'
import { UserContext } from '../../providers/UserContext'
import { ButtonGroup, IconButton, Tooltip } from '@mui/joy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpen, faFeather, faPhoneAlt, faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const ListZone = () => {
    const { userList } = useContext(UserContext);

    return (
        <CustomTable
            theadCells={["ID COD", "Nom", "Contact", "Action",]}
            data={userList.map((value, index) => ([
                value.idCOD,
                value.nomComplet,
                (
                    <ButtonGroup size='sm' key={index} >
                        <Tooltip title={value.contact?.telephone} >
                            <IconButton
                                component="a"
                                href={`tel:${value.contact?.telephone}`}
                                children={<FontAwesomeIcon icon={faPhoneAlt} />}
                            />
                        </Tooltip>
                        {value.contact?.email && (
                            <Tooltip title={value.contact?.email} >
                                <IconButton
                                    component="a"
                                    href={`mailto:${value.contact?.email}`}
                                    children={<FontAwesomeIcon icon={faEnvelopeOpen} />}
                                />
                            </Tooltip>
                        )}
                        {value.contact?.whatsapp && (
                            <Tooltip title={value.contact?.whatsapp} >
                                <IconButton
                                    variant='solid'
                                    color="success"
                                    component="a"
                                    href={`https://whame.com/${value.contact?.whatsapp}`}
                                    children={<FontAwesomeIcon icon={faWhatsapp} />}
                                />
                            </Tooltip>
                        )}
                    </ButtonGroup>
                ),
                (
                    <ButtonGroup>
                        <Tooltip title={`Modifier`} >
                            <IconButton children={<FontAwesomeIcon icon={faFeather} />} />
                        </Tooltip>
                        <Tooltip title={`Supprimeer`} color='danger' >
                            <IconButton color='danger' children={<FontAwesomeIcon icon={faTrashArrowUp} />} />
                        </Tooltip>
                    </ButtonGroup>
                )
            ]))}
        />
    )
}

export default ListZone