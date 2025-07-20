import { Button, Divider, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy';
import { useContext, useEffect, useState } from 'react';
import GenericForm from '../../../components/GeneriqueForm';
import { PARTIE_T } from '../../../types';
import { SelectedTournoiContext } from '../../../providers/SelectedTournoiContext';
import { createPartie, updatePartie } from '../../../service/partie';

const EditPartieForm = () => {
    const { tournoi, statusList, partieToEdit, setpartieToEdit, loadTournoi } = useContext(SelectedTournoiContext);

    const [isOpen, setisOpen] = useState(false);

    const onSubmit = async (data: any) => {
        try {
            if (!tournoi) return false;

            return await (
                partieToEdit ? updatePartie(tournoi.id, partieToEdit.id, data as any)
                    : createPartie(tournoi.id, data)
            );

        } catch (error) {
            return false;
        }
    };

    useEffect(() => {
        partieToEdit && setisOpen(true);
    }, [partieToEdit])

    useEffect(
        () => {
            !isOpen && setpartieToEdit(undefined);
        },
        [isOpen]
    )

    if (!isOpen || !tournoi) {
        return <Button children="Ajouter" onClick={() => setisOpen(true)} />;
    }

    return (
        <Modal
            open={isOpen}
            onClose={() => setisOpen(false)}
        >
            <ModalDialog
                sx={{
                    width: 'fit-content',
                    maxWidth: '90%',
                    minWidth: '400px',
                }}
            >
                <ModalClose />
                <Typography level='h4'>{partieToEdit ? `Modifier` : `Ajouter`} un tournoi</Typography>
                <Divider />

                <GenericForm<PARTIE_T>
                    fields={[{
                        name: 'dateHeure',
                        label: 'Date et Heure',
                        type: 'datetime-local',
                        defaultValue: new Date().toISOString().slice(0, 16),
                        required: true,
                    }, {
                        name: 'id_gagnant',
                        label: 'Gagnant',
                        type: 'select',
                        options: !tournoi?.participants ? []
                            : tournoi?.participants?.map(participant => ({ value: participant.id, label: participant.nomComplet })),
                    }, {
                        name: 'id_status',
                        label: 'Statut',
                        type: 'select',
                        defaultValue: statusList[0].id,
                        required: true,
                        options: statusList.map(status => ({ value: status.id, label: status.nom })),
                    },]}
                    treatmentFonction={onSubmit as any}
                    submitButtonText="Valider"
                    cancelButtonText="Annuler"
                    initialData={partieToEdit}
                    onCancel={() => { setisOpen(false) }}
                    onSubmitSuccess={(data) => {
                        if (data) {
                            setpartieToEdit(undefined);
                            loadTournoi();
                            setisOpen(false);
                        }
                    }}
                />
            </ModalDialog>
        </Modal >
    )
}

export default EditPartieForm