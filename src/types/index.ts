export type USE_STATE_T = React.Dispatch<React.SetStateAction<any>>

export type LOADING_STATE_T = "En cours de chargement."
  | "Chargement finit."
  | "Chargement échoué."
  | "Chargememnt reussi"
  | "En attente"
  | null;

export type CONTACT_T = {
  id?: number;
  telephone: string;
  email?: string | null;
  whatsapp?: string | null;
  address?: string;
};

export type ROLE_T = {
  id: number;
  nom: string;
  description: string;
};

export type CATEGORIE_T = {
  id: number;
  nom: string;
  description?: string;
}

export type USER_T = {
  id: number;
  nomComplet: string;
  login: string;
  id_role: number;
  id_contact: number;
  contact: CONTACT_T;
  role: ROLE_T;
};