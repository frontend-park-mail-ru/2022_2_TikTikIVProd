/**
 * Конфигурация URL адресов приложения
 * @category Router
 * @constant {Object} 
 * @param {{name: string, URL: string}} Структура конфигурации 
 */
const paths = {
    home: '/',
    signinPage: '/signin',
    signupPage: '/signup',
    feedPage: '/feed',
    profile: '/profile',
    logout: '/logout',
    settings: '/settings',
    friends: '/friends',
    userProfie: '/users/{:number}',
    messenger: '/messenger',
    chat: '/chat/{:id}',
    communities: '/communities',
    community: '/community/{:id}',
    aboutWS: '/aboutWS'
}

export default paths;