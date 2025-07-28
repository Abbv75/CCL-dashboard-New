import { faCheck, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, Checkbox, Input, Modal, ModalClose, ModalDialog, Radio, RadioGroup, Sheet, Stack, Typography } from '@mui/joy'
import { useContext, useMemo, useState } from 'react'
import { LOADING_STATE_T } from '../../types'
import { toast } from 'react-toastify'
import { SelectedPartieContext } from '../../providers/SelectedPartieContext'
import { addParticipantsToPartie } from '../../service/partie'

const AddParticipantZone = () => {
    const { tournoi, partie, loadPartie, loadTournoi } = useContext(SelectedPartieContext);

    const [selectedId, setselectedId] = useState([] as string[]);
    const [loadingSate, setloadingSate] = useState(null as LOADING_STATE_T);
    const [isOpen, setisOpen] = useState(false);

    const toogleInList = (id: string) => {
        if (selectedId.includes(id)) {
            setselectedId(selectedId.filter(id => id !== id));
        } else {
            setselectedId([...selectedId, id]);
        }
    }

    const handleSubmit = async () => {
        try {
            if (!tournoi || selectedId.length === 0 || !partie) return;
            setloadingSate("En cours de chargement.");

            const res = await addParticipantsToPartie(tournoi.id, partie.id, selectedId);
            if (!res) {
                toast.error("Une erreur est survenue lors de l'ajout des participants.");
                return;
            };

            loadPartie();
            loadTournoi();

            toast.success("Participants ajoutés avec succès.");

            setselectedId([]);

            setisOpen(false);
        } catch (error) {
            console.error("Error adding participants:", error);
            toast.error("Une erreur est survenue lors de l'ajout des participants.");
        } finally {
            setloadingSate(null);
        }
    };

    const userList = useMemo(() => (tournoi?.participants || []), [partie]);

    const playerToShow = useMemo(() => userList.filter(
        ({ id }) => (partie?.participants || [])?.every(participant => participant.id != id)
    ), [userList, tournoi?.participants])


    if (!tournoi) {
        return <></>;
    }

    return (
        <Stack>
            <Button
                startDecorator={<FontAwesomeIcon icon={faUserPlus} />}
                onClick={() => setisOpen(true)}
            >Ajouter</Button>

            <Modal open={isOpen} onClose={() => setisOpen(false)} >
                <ModalDialog>
                    <Typography>Selectionner les joueurs a jouter</Typography>
                    <ModalClose />

                    <Input placeholder='rechercher par ID COD' />

                    <Sheet
                        component={Card}
                        variant='outlined'
                    >
                        <Checkbox
                            label='Tout selectionner'
                            onClick={() => {
                                setselectedId(selectedId.length === userList.length ? [] : playerToShow.map(({ id }) => id));
                            }}
                        />
                    </Sheet>

                    <RadioGroup variant='soft' sx={{ p: 1, maxHeight: 500, overflowY: "scroll" }} >
                        {playerToShow.map((user, index) => (
                            <Radio
                                key={index}
                                value={user.id}
                                label={user.nomComplet}
                                checked={selectedId.includes(user.id as string)}
                                onClick={() => {
                                    toogleInList(user.id as string);
                                }}
                            />
                        ))}
                    </RadioGroup>

                    <Button
                        endDecorator={<FontAwesomeIcon icon={faCheck} />}
                        onClick={handleSubmit}
                        loading={!!loadingSate}
                    >Valider la liste</Button>
                </ModalDialog>
            </Modal>
        </Stack>
    )
}

export default AddParticipantZone