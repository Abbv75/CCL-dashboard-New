export type USE_STATE_T<T> = React.Dispatch<React.SetStateAction<T>>

export type LOADING_STATE_T = "En cours de chargement."
  | "Chargement finit."
  | "Chargement échoué."
  | "Chargememnt reussi"
  | "En attente"
  | null;

export type ROLE_T = {
  id: string;
  nom: string;
  description: string;
};

export type CONTACT_T = {
  id: string;
  telephone: string;
  email?: string;
  adresse?: string;
  whatsapp?: string;
};

export type USER_T = {
  id: string;
  nomComplet: string;
  login: string;
  id_role: string;
  id_contact: string;
  idCOD?: string;
  createdAt?: string;
  updatedAt?: string;
  role?: ROLE_T;
  contact?: CONTACT_T;
};
