import { useContext } from 'react'
import CustomTable from '../../components/CustomTable'
import { UserContext } from '../../providers/UserContext'
import { Avatar, ButtonGroup, IconButton, Tooltip } from '@mui/joy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faEnvelopeOpen, faFeather, faPhoneAlt, faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { TournoiContext } from '../../providers/TournoiContext';

const ListZone = () => {
    const { tournoiList } = useContext(TournoiContext);

    return (
        <CustomTable
            theadCells={["Nom", "Inscription", "Gain", "Debut", "status", "nbr_participant", "Action",]}
            data={tournoiList.map((value) => ([
                value.nom,
                value.frais_inscription,
                value.montant_a_gagner,
                (
                    <Tooltip title={`Date de début ${value.date_debut}`} >
                        <Avatar size='sm' children={
                            <FontAwesomeIcon icon={faCalendarCheck} />
                        } />
                    </Tooltip>
                ),
                value?.status?.nom,
                value.nb_max_participants,
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