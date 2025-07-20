import { Button, ButtonGroup, Divider, FormControl, FormLabel, Grid, Input, Option, Select, Stack, Textarea } from '@mui/joy';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

export type FormField = {
    name: string;
    label: string;
    type: 'text' | 'password' | 'email' | 'number' | 'select' | 'textarea';
    required?: boolean;
    placeholder?: string;
    defaultValue?: string; // valeurs par défaut initiales si pas d'initialData
    startDecorator?: React.ReactNode;
    options?: { value: string | number; label: string }[]; // Pour les champs de type 'select'
    conditionalRender?: { // Pour les champs qui apparaissent sous condition
        field: string; // Le nom du champ qui détermine la condition
        value: string | number; // La valeur de ce champ pour que le champ actuel soit rendu
    };
    readOnly?: boolean; // prop pour les champs en lecture seule
    xs?: number;
    sm?: number;
};

export type GenericFormProps<T extends Record<string, any>> = { // Utilisation d'un type générique T
    fields: FormField[];
    treatmentFonction: (data: T) => Promise<boolean | any>; // La fonction de traitement reçoit les données
    initialData?: T; //  prop pour les données initiales (mode modification)
    onSubmitSuccess?: (data?: any) => any;
    onCancel?: () => void;
    submitButtonText?: string;
    cancelButtonText?: string;
    loadingStateText?: string;
};

const GenericForm = <T extends Record<string, any>>({ // Utilisation d'un type générique T
    fields,
    treatmentFonction,
    initialData,
    onSubmitSuccess,
    onCancel,
    submitButtonText = "Enregistrer",
    cancelButtonText = "Annuler",
    loadingStateText = "En cours de chargement."
}: GenericFormProps<T>) => {
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState<T>(() => {
        // Initialise les valeurs du formulaire avec initialData si fourni, sinon avec les defaultValue
        if (initialData) {
            return initialData;
        }
        const initial: Record<string, any> = {};
        fields.forEach(field => {
            if (field.defaultValue !== undefined) {
                initial[field.name] = field.defaultValue;
            }
        });
        return initial as T;
    });

    // Mettre à jour formValues si initialData change (utile si le formulaire est réutilisé pour différentes entités)
    // ou si les champs changent (ex: si le composant est monté une fois et ses props changent)
    useEffect(() => {
        if (initialData) {
            setFormValues(initialData);
        } else {
            const initial: Record<string, any> = {};
            fields.forEach(field => {
                if (field.defaultValue !== undefined) {
                    initial[field.name] = field.defaultValue;
                }
            });
            setFormValues(initial as T);
        }
    }, [initialData, fields]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any, name: string) => {
        const value = e && e.target ? e.target.value : e;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await treatmentFonction(formValues);
            if (!result) {
                toast.error("Erreur lors de la soumission du formulaire.");
                return;
            }

            toast.success("Opération réussie !");
            onSubmitSuccess && onSubmitSuccess(result);
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
            required: field.required,
            startDecorator: field.startDecorator,
            readOnly: field.readOnly, // Utilisation de la prop readOnly
            value: formValues[field.name] ?? '',
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
                        value={formValues[field.name] ?? ''}
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
            >
                {fields.map((field, index) => {
                    const shouldRender = field.conditionalRender
                        ? formValues[field.conditionalRender.field] === field.conditionalRender.value
                        : true;

                    return (shouldRender && (
                        <Grid xs={field.xs || 12} sm={field.sm || 12} key={field.name || index}>
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