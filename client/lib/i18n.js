import i18next from 'i18next';
import locales from './locales';

i18next
  .init({
    lng: 'zh-CN',
    debug: true,
    resources: locales,
  })
  .then(t => {
    console.log('i18n ready.');
  });

export default i18next;
