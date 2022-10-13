const source = `
<div id="root">
    <div id="header"></div>
    <div id="content">
        <div class="left-menu"></div>
        <div class="main-content"></div>
        <div class="right-menu"></div>
    </div>
    <div id="footer"></div>
</div>
`;

const baseTemplate = Handlebars.compile(source);

export default baseTemplate;