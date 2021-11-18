import validator from "validator";
import type { PostalCodeLocale } from "validator";

const locale: PostalCodeLocale = "en-US"

export default {
  creditCard: (rule: boolean, value: string = "") => {
    return  rule === true
        ?    validator.isCreditCard(value)
        :   !validator.isCreditCard(value);
  },
  email:    (rule: boolean, value: string = "") => {
    return  rule === true 
        ?    validator.isEmail(value) 
        :   !validator.isEmail(value);
  },
  equals:   (rule: string, value: string = "") => {
    return  validator.equals(value, rule);
  },
  matches:  (rule: string, value: string = "") => {
    return  rule === value;
  },
  minLength: (rule: number, value: string = "") => {
    return  value.length >= rule;
  },
  phone:     (rule: boolean, value: string = "") => {
    return rule === true
        ?    validator.isMobilePhone(value)
        :   !validator.isMobilePhone(value);
  },
  postalCode: (rule: boolean, value: string = "") => {
    return rule === true
        ?    validator.isPostalCode(value, locale)
        :   !validator.isPostalCode(value, locale);
  },
  required:  (rule: boolean, value: string = "", isCheckedInput: boolean) => {
    if (!isCheckedInput) {
      return rule === true
        ?    value && value.trim()  !==  ""
        :    value && value.trim()  ===  "";
    }
    return  rule === true ? value : !value;
  },
  semVer:   (rule: boolean, value: string = "") => {
    return rule === true
        ?    validator.isSemVer(value)
        :   !validator.isSemVer(value);
  },
  slug:     (rule: boolean, value: string = "") => {
    return rule === true 
        ?    validator.isSlug(value) 
        :   !validator.isSlug(value);
  },
  strongPassword: (rule: boolean, value: string = "") => {
    return rule === true
        ?    validator.isStrongPassword(value)
        :   !validator.isStrongPassword(value);
  },
  url:      (rule: boolean, value: string = "") => {
    return rule === true 
        ?    validator.isURL(value) 
        :   !validator.isURL(value);
  },
  vat:      (rule: boolean, value: string = "") => {
    return rule === true 
        ?    validator.isVAT(value) 
        :   !validator.isVAT(value);
  },
};