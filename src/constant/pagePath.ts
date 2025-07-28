import { faGamepad, faLock, faUserClock, faUsersGear } from "@fortawesome/free-solid-svg-icons";
import User from "../pages/User";
import Tournoi from "../pages/Tournoi";
import SelectedTournoi from "../pages/SelectedTournoi";
import SelectedPartie from "../pages/SelectedPartie";

export default [
    {
        label: 'Gestion des utilisateurs',
        href: '/user',
        icon: faUsersGear,
        component: User,
        isPublic: false
    },
    {
        label: 'Gestion des tournois',
        href: '/tournoi',
        icon: faGamepad,
        component: Tournoi,
        isPublic: false
    },
    {
        label: 'Tournois selectionné',
        href: '/tournoi-selectionne/:idTournoi',
        icon: faUserClock,
        component: SelectedTournoi,
        isPublic: false,
        toHide: true
    },
    {
        label: 'Partie selectionnée',
        href: '/partie-selectionne/:idTournoi/:idPartie',
        icon: faUserClock,
        component: SelectedPartie,
        isPublic: false,
        toHide: true
    },
    {
        label: 'Connexion',
        href: '/connexion',
        icon: faLock,
        component: undefined,
        isPublic: false,
        toHide: true
    },
]