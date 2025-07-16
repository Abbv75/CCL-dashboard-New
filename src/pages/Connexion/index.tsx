import React, { useContext, useState } from 'react';
import { Button, Card, FormControl, FormLabel, Grid, Input, Stack } from '@mui/joy';
import { loginUser } from '../../service/user';
import { CardMedia } from '@mui/material';
import { IMAGES } from '../../constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faLock, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { LOADING_STATE_T } from '../../types';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../providers/AppContext';

export default function Connexion() {
    const { setcurrentUser } = useContext(AppContext);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [laodingState, setlaodingState] = useState(null as LOADING_STATE_T);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            const user = await loginUser(login, password);

            if (!user) {
                toast.error('La connexion a echoué');
                return;
            }

            setcurrentUser && setcurrentUser(user);

            toast.success(`Connexion réussie. Bienvenue Mr ${user.nomComplet}`);

            navigate('/dashboard');
        } catch (error) {
            toast.error("Une erreur est survenue");
        } finally {
            setlaodingState(null);
        }
    };

    return (
        <Stack
            sx={{
                minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#f5f5f5'
            }}
        >
            <Card sx={{ borderRadius: 20, p: 1 }} >
                <Grid
                    container
                    justifyContent={"center"}
                    alignItems={"center"}
                    spacing={2}
                    m={0}
                >
                    <Grid xs={12} sm={9} >
                        <CardMedia
                            component={'img'}
                            src={IMAGES.connexionBg}
                            sx={{ width: '100%', maxWidth: 1000, borderRadius: 2 }}
                        />
                    </Grid>

                    <Grid xs={12} sm={3} >
                        <Stack gap={1}
                            component={"form"}
                            onSubmit={handleSubmit}
                        >
                            <FormControl>
                                <FormLabel>Login</FormLabel>
                                <Input
                                    value={login}
                                    onChange={({ target }) => setLogin(target.value)}
                                    startDecorator={<FontAwesomeIcon icon={faUserAstronaut} />}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Mot de passe</FormLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={({ target }) => setPassword(target.value)}
                                    startDecorator={<FontAwesomeIcon icon={faKey} />}
                                />
                            </FormControl>

                            <Button
                                sx={{ mt: 2 }}
                                endDecorator={<FontAwesomeIcon icon={faLock} />}
                                type="submit"
                                loading={laodingState == "En cours de chargement."}
                            >Connexion</Button>
                        </Stack>
                    </Grid>
                </Grid>

            </Card>
        </Stack>
    );
}
