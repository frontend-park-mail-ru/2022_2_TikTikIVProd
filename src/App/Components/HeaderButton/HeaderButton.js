const source = `
<div id="header__item__button" class="header__item__button" href="{{href}}">{{text}}</div>
`;
const headerButtonTemplate = Handlebars.compile(source);
export default headerButtonTemplate;
