import { faHouseLaptop, faLock, faUsersGear } from "@fortawesome/free-solid-svg-icons";
import Dashboard from "../pages/Dashboard";

export default [
    {
        label: 'Connexion',
        href: '/connexion',
        icon: faLock,
        component: undefined,
        isPublic: false,
        toHide: true
    },
    {
        label: 'Accueil',
        href: '/accueil',
        icon: faHouseLaptop,
        component: Dashboard,
        isPublic: false
    },
    {
        label: 'Gestion des utilisateurs',
        href: '/accueil',
        icon: faUsersGear,
        component: Dashboard,
        isPublic: false
    },
]