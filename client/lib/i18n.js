import i18next from 'i18next';
import locales from './locales';

i18next
  .init({
    lng: process.env.LNG || 'zh-TW',
    debug: process.env.NODE_ENV !== 'production',
    resources: locales,
  })
  .then(t => {
    console.log('i18n ready.');
  });

export default i18next;
