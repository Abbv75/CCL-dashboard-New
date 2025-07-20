import { useContext, useEffect, useState } from 'react';
import CustomTable from '../../components/CustomTable';
import { ButtonGroup, IconButton, LinearProgress, Tooltip } from '@mui/joy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpen, faPhoneAlt, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { USER_T } from '../../types';
import { toast } from 'react-toastify';
import { SelectedPartieContext } from '../../providers/SelectedPartieContext';
import { removeParticipantsToPartie } from '../../service/partie';

const ListZone = () => {
    const { partie, tournoi, loadPartie } = useContext(SelectedPartieContext);

    const [userList, setuserList] = useState([] as USER_T[]);

    const handleRemove = async (id: string) => {
        try {
            if (!partie || !window.confirm(`Etes vous sur?`)) return;

            const res = await removeParticipantsToPartie(tournoi.id, partie.id, [id]);
            if (!res) return;

            setuserList(userList.filter(user => user.idCOD !== id));
            toast.success("Participant supprimé avec succès.");
            loadPartie();
        } catch (error) {
            console.error("Error removing participant:", error);
            toast.error("Une erreur est survenue lors de la suppression du participant.");
        }
    };

    useEffect(() => {
        if (!partie) return;
        setuserList(partie?.participants || []);
    }, [partie]);

    if (partie === undefined) {
        return <LinearProgress />
    }

    return (
        <CustomTable
            theadCells={["ID COD", "Nom", "Action",]}
            data={userList.map((value, index) => ([
                value.idCOD,
                value.nomComplet,
                (
                    <ButtonGroup size='sm' key={index} >
                        {value.contact?.telephone && (
                            <Tooltip title={value.contact?.telephone} >
                                <IconButton
                                    component="a"
                                    href={`tel:${value.contact?.telephone}`}
                                    children={<FontAwesomeIcon icon={faPhoneAlt} />}
                                />
                            </Tooltip>
                        )}
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
                        <Tooltip title={`Enelever du tournois`} color='danger' >
                            <IconButton
                                color='danger'
                                children={<FontAwesomeIcon icon={faUserTimes} />}
                                onClick={() => handleRemove(value.id)}
                            />
                        </Tooltip>
                    </ButtonGroup>
                )
            ]))}
        />
    )
}

export default ListZone