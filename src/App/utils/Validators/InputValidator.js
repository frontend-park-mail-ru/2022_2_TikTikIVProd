import { emailValidator } from "./EmailValidator.js";
export function validateInput(type, value) {
    switch (type) {
        case 'email': {
            return emailValidator(value);
        }
        case 'password': {
            //TODO
            return true;
        }
        case 'text': {
            return true;
        }
        default: {
            return false;
        }
    }
}
