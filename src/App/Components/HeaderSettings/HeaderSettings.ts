const source = `
<div class="header__item__settings" id="header__item__settings" href="{{href}}">
    <img src="{{icon}}" alt="" class="header__item__settings__icon">
</div>
`;

const headerSettingsTemplate = Handlebars.compile(source);

export default headerSettingsTemplate;