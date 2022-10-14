const source = `
<div class="header__container">
    <div class="header__logo" href='/feed'>
        WS
    </div>
    <div id="header__item" class="header__item">{{item}}</div>
</div>
`;

const headerTemplate = Handlebars.compile(source);

export default headerTemplate;