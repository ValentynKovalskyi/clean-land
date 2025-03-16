import { i18n } from "@/plugins/i18n";
const { t } = i18n.global;

export const validations = {
    required: value => !!value || t("Validation.required"),
    minLength: min => value =>
      (value?.length >= min) || t("Validation.minLength", { length: min}),
    maxLength: max => value =>
      (value?.length <= max) || t("Validation.maxLength", { length: max}),
    email: value =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || t("Validation.email"),
    phone: value =>
      /^\+?[0-9]{10,15}$/.test(value) || t("Validation.phone"),
    password: value => /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value) 
    || t("Validation.password"),
    matchPassword: confirmPassword => value =>
      value === confirmPassword || t("Validation.confirmPassword"),
  };