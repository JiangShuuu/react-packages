import React from 'react';
import type { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';
import { useRouter } from 'next/router';

export async function getServerSideProps({ locale, req, res }: GetServerSidePropsContext) {
  const { data } = await axios.get('https://swapi.dev/api/people/9');
  console.log('hi', locale);
  return {
    props: {
      customer: data,
      ...(await serverSideTranslations(locale || 'zh-Hant', ['common']))
    }
  };
}

export default function SsrPage({ customer }: any) {
  const { t, i18n } = useTranslation('common');

  const router = useRouter();

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  const changeTo = router.locale === 'zh-Hant' ? 'zh-Hans' : 'zh-Hant';

  return (
    <>
      <div>{t('語言')}</div>
      <p>API資料姓名 : {t(`${customer.name}`)}</p>
      <p>其他資料：{JSON.stringify(customer)}</p>
      <button onClick={() => onToggleLanguageClick(changeTo)}>{t('語言')}</button>
    </>
  );
}
