import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: '請填寫{_field_}',
});

extend('email', {
  ...email,
  message: 'E-mail格式錯誤',
});
