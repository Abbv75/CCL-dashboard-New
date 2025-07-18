import { useContext } from 'react'
import CustomTable from '../../components/CustomTable'
import { UserContext } from '../../providers/UserContext'
import { ButtonGroup, IconButton, LinearProgress, Tooltip } from '@mui/joy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpen, faFeather, faPhoneAlt, faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { toast } from 'react-toastify';
import { deleteUser } from '../../service/user';

const ListZone = () => {
    const { userList, loadUser, loadingState } = useContext(UserContext);

    const handleDelete = async (id: string) => {
        try {
            if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;

            const res = await deleteUser(id);
            if (!res) {
                toast.error("Suppression de l'utilisateur a échoué");
                return;
            }
            toast.success("Utilisateur supprimé avec succès");
            await loadUser();
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Suppression de l'utilisateur a échoué");
        }
    }

    if (loadingState) {
        return <LinearProgress />
    }

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
                            <IconButton
                                color='danger'
                                children={<FontAwesomeIcon icon={faTrashArrowUp} />}
                                onClick={() => handleDelete(value.id)}
                            />
                        </Tooltip>
                    </ButtonGroup>
                )
            ]))}
        />
    )
}

export default ListZone