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

export interface STATUS_T {
  nom: string;
  id: string;
  description?: string;
}

export interface PARTIE_T {
  dateHeure: Date;
  id: number;
  description?: string;
  id_gagnant?: string;
  id_tournoi: string;
  id_status?: number;
  status?: STATUS_T;
  participants?: USER_T[];
}

export type TOURNOI_T = {
  id: string;
  nom: string;
  frais_inscription?: number;
  id_status?: number;
  status?: STATUS_T;
  date_debut?: string;
  montant_a_gagner?: number;
  nb_max_participants?: number;
  createdAt?: string;
  updatedAt?: string;
  participants?: USER_T[];
  parties?: PARTIE_T[];
};
