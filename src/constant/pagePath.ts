import { faGamepad, faHouseLaptop, faLock, faUsersGear } from "@fortawesome/free-solid-svg-icons";
import Dashboard from "../pages/Dashboard";
import User from "../pages/User";
import Tournoi from "../pages/Tournoi";

export default [

    {
        label: 'Accueil',
        href: '/accueil',
        icon: faHouseLaptop,
        component: Dashboard,
        isPublic: false
    },
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
        label: 'Connexion',
        href: '/connexion',
        icon: faLock,
        component: undefined,
        isPublic: false,
        toHide: true
    },
]