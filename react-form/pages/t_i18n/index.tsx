import React from 'react';
import { useTranslation, initReactI18next } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Link from 'next/link';

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'zh-Hant', ['common']))
    }
  };
}

export default function I18n() {
  const { t, i18n } = useTranslation('common');
  console.log(i18n.language);
  const router = useRouter();

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  const changeTo = router.locale === 'zh-Hant' ? 'zh-Hans' : 'zh-Hant';

  return (
    <>
      <h2>{t('關於我們')}</h2>
      <Link href='/t_i18n' locale={changeTo}>
        <button>{t('切換一', { changeTo })}</button>
      </Link>
      <button onClick={() => onToggleLanguageClick(changeTo)}>切換二</button>
    </>
  );
}
