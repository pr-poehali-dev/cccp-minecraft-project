import Layout from '@/components/Layout';
import AdminPanel from '@/components/AdminPanel';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Metro = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Icon name="Train" className="text-secondary" size={32} />
            <h1 className="text-3xl font-bold">Метрополитен ЦК КПСС</h1>
          </div>
          <AdminPanel />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="soviet-card p-6 soviet-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded flex items-center justify-center">
                <Icon name="MapPin" className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Станций</p>
                <p className="text-3xl font-bold text-secondary">Люберцы</p>
              </div>
            </div>
            <Badge className="bg-green-600">В разработке</Badge>
          </Card>

          <Card className="soviet-card p-6 soviet-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded flex items-center justify-center">
                <Icon name="Route" className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Линий</p>
                <p className="text-3xl font-bold text-secondary">Красная линия</p>
              </div>
            </div>
            <Badge className="bg-green-600">В разработке</Badge>
          </Card>
        </div>

        <Card className="soviet-card p-6">
          <h2 className="text-2xl font-bold mb-4 text-secondary">Руководство</h2>
          <div className="flex items-center gap-4 bg-background p-4 rounded border border-border">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <Icon name="User" className="text-primary" size={32} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Денис</h3>
              <p className="text-sm text-primary">Начальник Метрополитена</p>
              <p className="text-sm text-muted-foreground">Руководитель городского метрополитена</p>
            </div>
          </div>
        </Card>

        <Card className="soviet-card p-6">
          <h2 className="text-2xl font-bold mb-6 text-secondary">Правила метрополитена</h2>
          <div className="space-y-4">
            {[
              'Соблюдайте чистоту и порядок на территории метрополитена',
              'Не заходите за жёлтую линию безопасности',
              'Уступайте места пожилым, инвалидам и пассажирам с детьми',
              'Запрещено курение, распитие алкогольных напитков',
              'Сохраняйте билеты до конца поездки',
              'При возникновении чрезвычайной ситуации обращайтесь к персоналу',
              'Запрещено проносить крупногабаритный багаж без разрешения',
              'Следуйте указаниям персонала метрополитена'
            ].map((rule, i) => (
              <div key={i} className="flex items-start gap-3 bg-background p-3 rounded border border-border">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">{i + 1}</span>
                </div>
                <p className="text-sm">{rule}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="soviet-card p-6">
          <h2 className="text-2xl font-bold mb-4 text-secondary">Схема метрополитена</h2>
          <div className="aspect-video bg-muted rounded border-2 border-primary flex items-center justify-center">
            <div className="text-center">
              <Icon name="Map" className="text-muted-foreground mx-auto mb-4" size={64} />
              <p className="text-muted-foreground">Схема в разработке</p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Metro;
