import { parsePhoneNumber } from "awesome-phonenumber";

const formatPhoneNumber = (phoneNumber: string) =>
  parsePhoneNumber(phoneNumber).number?.national.replace(/\s/g, "");

export default formatPhoneNumber;
