const source = `
<div class="header__item__profile" id="header__item__profile" href="{{href}}">
    <img src="{{avatar}}" alt="" class="header__item__profile__avatar">
    <div class="header__item__profile__name">{{name}}</div>
</div>
`;

const headerProfileTemplate = Handlebars.compile(source);

export default headerProfileTemplate;