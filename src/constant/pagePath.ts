import { faHouseLaptop, faLock } from "@fortawesome/free-solid-svg-icons";

export default [
    {
        label: 'Connexion',
        href: '/connexion',
        icon: faLock,
        component: undefined,
        isPublic: false,
        toHide : true
    },
    {
        label: 'Accueil',
        href: '/accueil',
        icon: faHouseLaptop,
        component: undefined,
        isPublic: false
    },
]