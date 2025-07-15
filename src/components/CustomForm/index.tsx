import { Button, ButtonGroup, FormControl, FormLabel, Grid, Input } from "@mui/joy"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faRotateForward } from '@fortawesome/free-solid-svg-icons'
import { toast } from "react-toastify"
import { useState } from "react"
import { LOADING_STATE_T } from "../../types"

const CustomForm = ({
    submissionFunction,
    onSuccess 
}: {
    submissionFunction?: (data: any) => any,
    onSuccess?: () => void
}) => {
    const [loadingState, setloadingState] = useState(null as LOADING_STATE_T);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            if (!submissionFunction) return;

            setloadingState('En cours de chargement.');

            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());
            console.log(data);

            const res = await submissionFunction(data);

            if (!res) {
                toast.info("Une erreur est survenue lors de la soumission du formulaire");
                return;
            }

            return res;
        } catch (error) {
            console.log(error);
            toast.error("Une erreur est survenue lors de la soumission du formulaire");
            return;
        } finally {
            setloadingState(null);
        }
    }

    return (
        <Grid
            container
            spacing={2}
            m={0}
            component={"form"}
            onSubmit={handleSubmit}
        >
            <Grid xs={12} sm={6}>
                <FormControl>
                    <FormLabel>Nom</FormLabel>
                    <Input
                        type="text"
                        name="nom"
                    />
                </FormControl>
            </Grid>

            <Grid xs={12} sm={6}>
                <FormControl>
                    <FormLabel>Nom</FormLabel>
                    <Input />
                </FormControl>
            </Grid>

            <Grid xs={12}>
                <ButtonGroup variant="solid">
                    <Button
                        color='danger'
                        startDecorator={<FontAwesomeIcon icon={faRotateForward} />}
                        type='reset'
                    >
                        Reset
                    </Button>
                    <Button
                        fullWidth
                        color='primary'
                        endDecorator={<FontAwesomeIcon icon={faPaperPlane} />}
                        type='submit'
                    >
                        Valider
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}

export default CustomForm