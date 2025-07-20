import { Divider, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy';
import { useContext } from 'react';
import { UserContext } from '../../providers/UserContext';
import { updateUser } from '../../service/user';
import GenericForm from '../../components/GeneriqueForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';

const EditUserPassword = () => {
    const { userPasswordToEdit, setuserPasswordToEdit } = useContext(UserContext);

    const handleChangePassword = async (formData: { motDePasse: string }) => {
        if (!userPasswordToEdit) { return false; }

        try {
            return await updateUser(userPasswordToEdit.id, { motDePasse: formData.motDePasse } as any);
        } catch (error) {
            console.error("Erreur lors de la modification du mot de passe:", error);
            return false;
        }
    };

    return (
        <Modal
            open={!!userPasswordToEdit}
            onClose={() => setuserPasswordToEdit(undefined)}
        >
            <ModalDialog
                sx={{
                    width: 'fit-content',
                    maxWidth: '90%',
                    minWidth: '400px',
                }}
            >
                <ModalClose />
                <Typography level='h4'>Modifier le mot de passe de {userPasswordToEdit?.nomComplet}</Typography>
                <Divider />

                <GenericForm<{ motDePasse: string }>
                    fields={[{
                        name: 'motDePasse',
                        label: 'Nouveau mot de passe',
                        type: 'password',
                        required: true,
                        placeholder: 'Saisissez le nouveau mot de passe',
                        xs: 12,
                        sm: 12,
                        startDecorator: <FontAwesomeIcon icon={faKey} />,
                    }]}
                    treatmentFonction={handleChangePassword}
                    submitButtonText="Changer le mot de passe"
                    cancelButtonText="Annuler"
                    initialData={{ motDePasse: '' }}
                    onCancel={() => setuserPasswordToEdit(undefined)}
                />
            </ModalDialog>
        </Modal >
    )
}

export default EditUserPassword