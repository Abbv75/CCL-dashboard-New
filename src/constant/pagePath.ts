import { faHouseLaptop, faLock, faUsersGear } from "@fortawesome/free-solid-svg-icons";
import Dashboard from "../pages/Dashboard";
import User from "../pages/User";

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
        label: 'Connexion',
        href: '/connexion',
        icon: faLock,
        component: undefined,
        isPublic: false,
        toHide: true
    },
]