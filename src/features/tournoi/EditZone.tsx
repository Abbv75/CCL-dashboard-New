import { Button, Divider, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy';
import { useContext, useEffect, useState } from 'react';
import GenericForm from '../../components/GeneriqueForm';
import { STATUS_T, TOURNOI_T } from '../../types';
import { createTournoi, updateTournoi } from '../../service/tournoi';
import { TournoiContext } from '../../providers/TournoiContext';

const EditZone = () => {
    const { settournoiList, statusList, tournoiList, tournoiToEdit, settournoiToEdit } = useContext(TournoiContext);

    const [isOpen, setisOpen] = useState(false);

    const onSubmit = async (data: any) => {
        try {
            return await (
                tournoiToEdit ? updateTournoi(tournoiToEdit.id, data as any)
                    : createTournoi(data)
            );

        } catch (error) {
            return false;
        }
    };

    useEffect(() => {
        tournoiToEdit && setisOpen(true);
    }, [tournoiToEdit])

    useEffect(
        () => {
            !isOpen && settournoiToEdit(undefined);
        },
        [isOpen]
    )

    if (!isOpen) {
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
                <Typography level='h4'>{tournoiToEdit ? `Modifier` : `Ajouter`} un tournoi</Typography>
                <Divider />

                <GenericForm<TOURNOI_T>
                    fields={[{
                        name: 'nom',
                        label: 'Nom',
                        type: 'text',
                        required: true,
                        placeholder: 'Ex: Tournoi de janvier 2024',
                        xs: 12,
                        sm: 12,
                    }, {
                        name: 'id_status',
                        label: 'Statut',
                        type: 'select',
                        required: true,
                        options: statusList.map((status: STATUS_T) => ({
                            value: status.id,
                            label: status.nom,
                        })),
                        xs: 12,
                        sm: 12,
                    }, {
                        name: 'date_debut',
                        label: 'Debute le',
                        type: 'date',
                        xs: 12,
                        sm: 6,
                    }, {
                        name: 'frais_inscription',
                        label: 'Frais d\'inscription',
                        type: 'number',
                        xs: 12,
                        sm: 6,
                    }, {
                        name: 'montant_a_gagner',
                        label: 'Montant à gagner',
                        type: 'number',
                        xs: 12,
                        sm: 6,
                    }, {
                        name: 'nb_max_participants',
                        label: 'Nombre de participants',
                        type: 'number',
                        xs: 12,
                        sm: 6,
                    },]}
                    treatmentFonction={onSubmit as any}
                    submitButtonText="Valider"
                    cancelButtonText="Annuler"
                    initialData={tournoiToEdit}
                    onCancel={() => { setisOpen(false) }}
                    onSubmitSuccess={(data) => {
                        if (data) {
                            if (tournoiToEdit) {
                                const index = tournoiList.findIndex(t => t.id === tournoiToEdit.id);
                                if (index !== -1) {
                                    tournoiList[index] = data;
                                    settournoiList([...tournoiList]);
                                }
                            } else {
                                settournoiList([...tournoiList, data]);
                            }
                            setisOpen(false);
                        }
                    }}
                />
            </ModalDialog>
        </Modal >
    )
}

export default EditZone