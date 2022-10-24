/**
 * Конфигурация полей футера
 * @category Footer
 * @constant {Object} 
 */
const footerViewConfig = {
    logo: {
        src: '../src/img/logo_footer.png',
    },
    contacts: [
        {
            id: 'phone',
            text: 'phone',
            href: 'tel:555-555-5555',
            icon: {
                id: 'phone-icon',
                src: '../src/img/phone_icon.svg',
            },
        },
    ],
    company: {
        name: 'TikTikAndVProd2022',
    },
};

export default footerViewConfig;