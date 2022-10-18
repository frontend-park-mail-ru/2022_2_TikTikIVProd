const source = `
<form id={{formId}} class="form">
    <div class="form__title">
        {{formTitle}}
    </div>
    <div class="form__content">
        {{#each inputs}}
        <div class="groupbox">
            <div class="form__input__title">
                {{title}}
            </div>
            <input type={{type}} id={{id}} placeholder={{placeholder}} class="form__input"  /> 
            <div id="{{id}}-msg" class="form__input__error__msg"></div>
        </div>
        {{/each}}
    </div>
    <button id={{submit.id}} class="form__button">
        {{submit.text}}
    </button>

    <div class="wrapper">
        <div class="form__footer">
            {{#each links}}
            <a id={{id}} href={{href}} class="form__footer__link">{{text}}</a>
            {{/each}}
        </div>
    </div>
</form>
`;

const formTemplate = Handlebars.compile(source);

export default formTemplate;