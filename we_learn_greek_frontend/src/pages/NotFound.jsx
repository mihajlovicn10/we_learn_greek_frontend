import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageLayout } from '../components/layout';
import { Button, Card } from '../components/ui';
import { ROUTES } from '../constants/routes';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <PageLayout title={t('notFound.title')} subtitle={t('notFound.subtitle')} narrow>
      <Card padding="lg" className="text-center">
        <p className="mb-6 font-display text-6xl font-bold text-brand-600">404</p>
        <Link to={ROUTES.home}>
          <Button variant="primary" shape="pill">
            {t('common.backToHome')}
          </Button>
        </Link>
      </Card>
    </PageLayout>
  );
};

export default NotFound;
