import { faCheck, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, Checkbox, Input, Modal, ModalClose, ModalDialog, Radio, RadioGroup, Sheet, Stack, Typography } from '@mui/joy'
import { useCallback, useContext, useEffect, useState } from 'react'
import { SelectedTournoiContext } from '../../../providers/SelectedTournoiContext'
import { LOADING_STATE_T, USER_T } from '../../../types'
import { addParticipants } from '../../../service/tournoi'
import { toast } from 'react-toastify'
import { getAllUser } from '../../../service/user'

const AddParticipantZone = () => {
    const { tournoi, settournoi } = useContext(SelectedTournoiContext);

    const [userList, setuserList] = useState([] as USER_T[]);
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
            if (!tournoi || selectedId.length === 0) return;
            setloadingSate("En cours de chargement.");

            const res = await addParticipants(tournoi.id, selectedId);
            if (!res) {
                toast.error("Une erreur est survenue lors de l'ajout des participants.");
                return;
            };

            toast.success("Participants ajoutés avec succès.");
            settournoi({
                ...tournoi,
                participants: [...(tournoi.participants || []), ...(res?.participants || [])]
            });

            setselectedId([]);

            setisOpen(false);
        } catch (error) {
            console.error("Error adding participants:", error);
            toast.error("Une erreur est survenue lors de l'ajout des participants.");
        } finally {
            setloadingSate(null);
        }
    };

    const loadUserList = useCallback(async () => {
        const res = await getAllUser();

        if (!res) {
            toast.error("Erreur lors du chargement des utilisateurs.");
            return;
        }

        setuserList(res);
    }, []);


    useEffect(() => {
        loadUserList();
    }, [loadUserList]);

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
                            if (selectedId.length === userList.length) {
                                setselectedId([]);
                            } else {
                                setselectedId(userList.map(user => user.id));
                            }
                        }}
                         />

                    </Sheet>

                    <RadioGroup variant='soft' sx={{ p: 1, maxHeight: 500, overflowY: "scroll" }} >
                        {userList.filter(({ role, id }) => role?.id == 'R01' && (tournoi.participants || []).every(participant => participant.id !== id))
                            .map((user, index) => (
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