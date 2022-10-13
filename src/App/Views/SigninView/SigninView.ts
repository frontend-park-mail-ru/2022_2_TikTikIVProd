import formTemplate from "../../Components/Form/Form.js";
import IView from "../IView/IView.js";
import signinViewConfig from "./SigninViewConfig.js";

export interface IValidatedData {
    isValid: boolean;
    msg: string;
}

export default class SigninView extends IView {
    private form: HTMLElement;

    constructor(parent: HTMLElement) {
        super(parent);
        const parser = new DOMParser();

        const form: HTMLElement | null = parser.parseFromString(formTemplate(signinViewConfig), 'text/html').querySelector('#' + signinViewConfig.formId);
        if (form === null) {
            throw Error();
        }
        this.form = form;
    }

    public render() {
        this.parent.innerHTML = '';
        this.parent.appendChild(this.form);
    }

    public bindSubmit(callback: Function): void {
        const submit = this.form.querySelector('#' + signinViewConfig.submit.id);
        if (submit === null) {
            console.log('No submit btn signin view');
            return;
        }

        submit.addEventListener('click', (e) => {
            e.preventDefault();
            // const { data, isValid } = this.validateForm();
            // if (isValid) {
            const data = this.getData();
            callback(data);
            // }
        });
    }

    private getData(): Map<string, string> {
        const data = new Map<string, string>();
        signinViewConfig.inputs.forEach((input) => {
            const html = <HTMLInputElement>this.form.querySelector('#' + input.id);
            data.set(input.id, html.value);
        });
        return data;
    }
    public showError(id: string, data: IValidatedData): void {
        const input = <HTMLInputElement>this.form.querySelector('#' + id);
        const errorField = <HTMLElement>this.form.querySelector('#' + id + '-msg');
        if (data.isValid) {
            input.classList.remove('invalid');
            errorField.style.visibility = 'hidden';
        } else {
            input.classList.add('invalid');
            errorField.textContent = data.msg;
            errorField.style.visibility = 'visible';
        }
    }

    public showErrors(data: Map<string, IValidatedData>): void {
        data.forEach((value, id) => {
            this.showError(id, value);
        });
    }

    // private validateForm(): { data: Map<string, string>, isValid: boolean } {
    //     const data = new Map<string, string>();
    //     let isValid: boolean = true;

    //     signinViewConfig.inputs.forEach(({ id, dataSection }) => {
    //         const elem = <SigninFormInput>this.form.querySelector('#' + id);
    //         data.set(dataSection.value, elem.value);
    //         if (!elem.validate(dataSection.value)) {
    //             isValid = false;
    //         }
    //     });

    //     return { data, isValid };
    // }
}
