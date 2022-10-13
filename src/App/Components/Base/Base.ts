import Handlebars from "handlebars";

const baseTemplate = `
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

export default function compileBase(): HandlebarsTemplateDelegate<any> {
    return Handlebars.compile(baseTemplate);
}