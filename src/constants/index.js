import {screening, user, apps, records} from '../assets'

export const navLinks = [
    {
        name : 'dashboard',
        imageUrl: apps,
        link: '/'
    },
    
    {
        name : 'records',
        imageUrl: records,
        link: '/medical-records'
    },
    
    {
        name : 'screening',
        imageUrl: screening,
        link: '/screening-records'
    },
    {
        name : 'profile',
        imageUrl: user,
        link: '/profile'
    },
]