import { Button, ButtonGroup, Divider, FormControl, FormLabel, Grid, Input, Modal, ModalClose, ModalDialog, Option, Select, Typography } from '@mui/joy';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../providers/UserContext';
import { Collapse } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationPin, faPaperPlane, faPhone, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { LOADING_STATE_T } from '../../types';
import { createUser, updateUser } from '../../service/user';
import { toast } from 'react-toastify';

const EditUserForm = () => {
    const { roleList, setuserList, userToEdit, setuserToEdit } = useContext(UserContext);

    const [isOpen, setisOpen] = useState(true);
    const [selectedRole, setselectedRole] = useState(userToEdit?.id_role || (roleList[0]?.id || null));
    const [loadingState, setloadingState] = useState(null as LOADING_STATE_T);

    const onSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setloadingState("En cours de chargement.");
            const formData = new FormData(e.currentTarget as HTMLFormElement);
            const data = Object.fromEntries(formData.entries());

            const res = await (
                userToEdit ? updateUser(userToEdit?.id as any, data as any)
                    : createUser(data as any)
            );

            if (!res) {
                toast.error("Erreur lors de la création de l'utilisateur.");
                return;
            }
            
            toast.success("Utilisateur créé avec succès.");
            setuserList(prev => [...prev, res]);
            setisOpen(false);

        } catch (error) {
            console.error("Error creating user:", error);
            toast.error("Une erreur s'est produite lors de la création de l'utilisateur.");
        } finally {
            setloadingState(null);
        }
    };

    useEffect(
        () => {
            if (!isOpen) setuserToEdit(undefined);
        },
        [isOpen]
    )

    useEffect(
        () => {
            if (userToEdit) setisOpen(true);
        },
        [userToEdit]
    )

    if (!isOpen) return <Button children="Ajouter" onClick={() => setisOpen(true)} />;

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
                component='form'
                onSubmit={onSubmit}
            >
                <ModalClose />
                <Typography level='h4'>{userToEdit ? 'Modifier' : 'Ajouter'} un utilisateur</Typography>
                <Divider />

                <Grid
                    container
                    spacing={2}
                    sx={{
                        overflowY: 'auto',
                    }}
                >
                    <Grid xs={12}>
                        <Typography level='title-md' >Informations de l'utilisateur</Typography>
                    </Grid>

                    <Grid xs={12} sm={6}>
                        <FormControl required>
                            <FormLabel>Nom complet</FormLabel>
                            <Input
                                name='nomComplet'
                                placeholder="Ex: Younouss Bore"
                                defaultValue={userToEdit?.nomComplet || ''}
                            />
                        </FormControl>
                    </Grid>

                    <Grid xs={12} sm={6}>
                        <FormControl required>
                            <FormLabel>Login</FormLabel>
                            <Input
                                name='login'
                                placeholder="Ex: Younouss Bore"
                                defaultValue={userToEdit?.login || ''}
                            />
                        </FormControl>
                    </Grid>

                    {!userToEdit && (
                        <Grid xs={12} sm={6}>
                            <FormControl required>
                                <FormLabel>Mot de passe</FormLabel>
                                <Input
                                    placeholder="Ex: Younouss Bore"
                                    type="password"
                                    name='motDePasse'
                                />
                            </FormControl>
                        </Grid>
                    )}

                    {!userToEdit && (
                        <Grid xs={12} sm={6}>
                            <FormControl required>
                                <FormLabel>Role</FormLabel>
                                <Select
                                    name='id_role'
                                    value={selectedRole}
                                    onChange={(e, value) => setselectedRole(value)}
                                    defaultValue={selectedRole}
                                >
                                    {roleList && roleList.map((value, index) => (
                                        <Option value={value.id}>{value.nom}</Option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    )}

                    <Collapse sx={{ width: '100%' }} in={selectedRole === 'R01'} timeout={500} >
                        <Grid xs={12} sm={6} >
                            <FormControl required={selectedRole === 'R01'}>
                                <FormLabel>ID Call Of Duty</FormLabel>
                                <Input
                                    placeholder="Ex: 121154512"
                                    name='idCOD'
                                    defaultValue={userToEdit?.idCOD || undefined}
                                />
                            </FormControl>
                        </Grid>
                    </Collapse>

                    <Divider sx={{ width: '100%' }} />

                    <Grid xs={12}>
                        <Typography level='title-md' >Informations de contact</Typography>
                    </Grid>

                    <Grid xs={12} sm={6}>
                        <FormControl required>
                            <FormLabel>Numéro de téléphone</FormLabel>
                            <Input
                                placeholder="Ex: 77 123 45 67"
                                name='telephone'
                                type='tel'
                                defaultValue={userToEdit?.contact?.telephone || ''}
                                startDecorator={<FontAwesomeIcon icon={faPhone} />}
                            />
                        </FormControl>
                    </Grid>

                    <Grid xs={12} sm={6}>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input
                                placeholder="Ex: 123@gmail.com"
                                name='email'
                                type='email'
                                defaultValue={userToEdit?.contact?.email || undefined}
                                startDecorator={<FontAwesomeIcon icon={faEnvelope} />}
                            />
                        </FormControl>
                    </Grid>

                    <Grid xs={12} sm={6}>
                        <FormControl>
                            <FormLabel>Numéro whatsapp</FormLabel>
                            <Input
                                placeholder="Ex: +223771234567"
                                name='whatsapp'
                                type='tel'
                                defaultValue={userToEdit?.contact?.whatsapp || undefined}
                                startDecorator={<FontAwesomeIcon icon={faWhatsapp} />}
                            />
                        </FormControl>
                    </Grid>

                    <Grid xs={12} sm={6}>
                        <FormControl>
                            <FormLabel>Adresse</FormLabel>
                            <Input
                                placeholder="Ex: Bamako"
                                name='adresse'
                                defaultValue={userToEdit?.contact?.adresse || 'Bamako'}
                                startDecorator={<FontAwesomeIcon icon={faLocationPin} />}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <Divider />

                <ButtonGroup>
                    <Button
                        fullWidth
                        variant='solid'
                        color='primary'
                        type='submit'
                        startDecorator={<FontAwesomeIcon icon={faPaperPlane} />}
                        loading={loadingState === "En cours de chargement."}
                    >Enregistrer</Button>
                    <Button
                        variant='soft'
                        color='danger'
                        onClick={() => setisOpen(false)}
                        endDecorator={<FontAwesomeIcon icon={faTimesCircle} />}
                    >Annuler</Button>
                </ButtonGroup>
            </ModalDialog>
        </Modal >
    )
}

export default EditUserForm