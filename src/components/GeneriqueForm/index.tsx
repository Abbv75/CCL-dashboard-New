import { Button, ButtonGroup, Divider, FormControl, FormLabel, Grid, Input, Option, Select, Stack, Textarea } from '@mui/joy';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

export type FormField = {
    name: string;
    label: string;
    type: 'text' | 'password' | 'email' | 'number' | 'select' | 'textarea';
    required?: boolean;
    placeholder?: string;
    defaultValue?: string;
    startDecorator?: React.ReactNode;
    options?: { value: string | number; label: string }[]; // Pour les champs de type 'select'
    conditionalRender?: { // Pour les champs qui apparaissent sous condition
        field: string; // Le nom du champ qui détermine la condition
        value: string | number; // La valeur de ce champ pour que le champ actuel soit rendu
    };
};

export type GenericFormProps = {
    fields: FormField[];
    treatmentFonction: (data: Record<string, any>) => Promise<boolean | any>;
    onSubmitSuccess?: (data?: any) => any;
    onCancel?: (data?: any) => any;
    submitButtonText?: string;
    cancelButtonText?: string;
    loadingStateText?: string;
};

const GenericForm = ({
    fields,
    treatmentFonction,
    onSubmitSuccess,
    onCancel,
    submitButtonText = "Enregistrer",
    cancelButtonText = "Annuler",
    loadingStateText = "En cours de chargement."
}: GenericFormProps) => {
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState<Record<string, any>>(() => {
        // Initialise les valeurs du formulaire avec les defaultValue des champs
        const initialValues: Record<string, any> = {};
        fields.forEach(field => {
            if (field.defaultValue) {
                initialValues[field.name] = field.defaultValue;
            }
        });
        return initialValues;
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any, name: string) => {
        // Gère les changements pour les inputs et textareas, et pour Select (via any pour le moment)
        const value = e && e.target ? e.target.value : e; // Gère spécifiquement le cas du Select de Joy UI
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const success = await treatmentFonction(formValues);
            if (!success) {
                toast.error("Erreur lors de la soumission du formulaire.");
                return;
            }

            toast.success("Formulaire soumis avec succès.");
            onSubmitSuccess && onSubmitSuccess();
        } catch (error) {
            console.error("Erreur lors de la soumission du formulaire:", error);
            toast.error("Une erreur s'est produite lors de la soumission du formulaire.");
        } finally {
            setLoading(false);
        }
    };

    const renderField = (field: FormField) => {
        const commonProps = {
            name: field.name,
            placeholder: field.placeholder,
            defaultValue: field.defaultValue,
            required: field.required,
            startDecorator: field.startDecorator,
            value: formValues[field.name] || '', // Contrôler le composant
            onChange: (e: any) => handleChange(e, field.name),
        };

        switch (field.type) {
            case 'text':
            case 'password':
            case 'email':
            case 'number':
                return <Input type={field.type} {...commonProps} />;
            case 'select':
                return (
                    <Select
                        {...commonProps}
                        onChange={(e, value) => handleChange(value, field.name)}
                        value={formValues[field.name] || ''}
                    >
                        {field.options && field.options.map((option, idx) => (
                            <Option key={idx} value={option.value}>{option.label}</Option>
                        ))}
                    </Select>
                );
            case 'textarea':
                return <Textarea minRows={3} {...commonProps} />;
            default:
                return null;
        }
    };

    return (
        <Stack
            component='form'
            onSubmit={handleSubmit}
            gap={2}
        >
            <Grid
                container
                spacing={2}
                sx={{
                    overflowY: 'auto',
                    mx: -1
                }}
                alignSelf={'center'}
            >
                {fields.map((field, index) => {
                    const shouldRender = field.conditionalRender
                        ? formValues[field.conditionalRender.field] === field.conditionalRender.value
                        : true;

                    return (shouldRender && (
                        <Grid xs={12} sm={6}>
                            <FormControl required={field.required}>
                                <FormLabel>{field.label}</FormLabel>
                                {renderField(field)}
                            </FormControl>
                        </Grid>
                    ))
                })}
            </Grid>

            <Divider />

            <ButtonGroup>
                <Button
                    fullWidth
                    variant='solid'
                    color='primary'
                    type='submit'
                    startDecorator={<FontAwesomeIcon icon={faPaperPlane} />}
                    loading={loading}
                >
                    {loading ? loadingStateText : submitButtonText}
                </Button>
                <Button
                    variant='soft'
                    color='danger'
                    onClick={onCancel}
                    endDecorator={<FontAwesomeIcon icon={faTimesCircle} />}
                >
                    {cancelButtonText}
                </Button>
            </ButtonGroup>
        </Stack>
    );
};

export default GenericForm;