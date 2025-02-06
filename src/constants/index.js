import {test2, screening, user, apps} from '../assets'

export const navLinks = [
    {
        name : 'dashboard',
        imageUrl: apps,
        link: '/'
    },
    
    {
        name : 'test2',
        imageUrl: test2,
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