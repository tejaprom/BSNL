/* eslint-disable no-unused-vars */
/*eslint max-len: ['error', { 'code': 300 }]*/

const emailRegex = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,3}))$/;
const phoneRegex = /^[789]\d{8}$/
const dobRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/
const otpRegex = /^(\s*\d{4}\s*)(,\s*\d{4}\s*)*,?\s*$/
const panRegex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
const aadharRegex = /^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;

export const regex = {
  emailRegex,
  phoneRegex,
  dobRegex,
  otpRegex,
  panRegex,
  aadharRegex

}

