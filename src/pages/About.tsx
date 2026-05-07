'use client';

import Layout from '@/components/layout/Layout';

const AboutPage = () => {
  return (
    <Layout>
      <div className="container page-padding">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-foreground">Biz haqimizda</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            {/* Tez orada to'liqroq ma'lumot qo'shiladi */}
            Bu sahifa hali tayyorlanmoqda. Tez orada biz haqimizda to'liq ma'lumot joylashtiriladi.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
