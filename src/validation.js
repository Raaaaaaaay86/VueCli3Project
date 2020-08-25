import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: '{_field_}為必填項目',
});

extend('email', {
  ...email,
  message: 'E-mail格式錯誤',
});
