import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import AdminPanel from '@/components/AdminPanel';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { getPeople } from '@/lib/data';

const Army = () => {
  const [narkom, setNarkom] = useState<any>(null);

  useEffect(() => {
    const people = getPeople();
    const armyLeader = people.find(p => p.role.includes('НарКом Армии'));
    setNarkom(armyLeader);
  }, []);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Icon name="Shield" className="text-secondary" size={32} />
            <h1 className="text-3xl font-bold">Вооружённые силы</h1>
          </div>
          <AdminPanel />
        </div>

        {narkom && (
          <Card className="soviet-card p-6 soviet-border">
            <h2 className="text-2xl font-bold mb-4 text-secondary">Руководство</h2>
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                {narkom.avatar ? (
                  <img src={narkom.avatar} alt={narkom.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <Icon name="User" className="text-primary" size={48} />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-secondary mb-1">{narkom.name}</h3>
                <p className="text-lg text-primary mb-3">{narkom.role}</p>
                <p className="text-muted-foreground">{narkom.description}</p>
              </div>
            </div>
          </Card>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="soviet-card p-6 text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Users" className="text-white" size={32} />
            </div>
            <p className="text-4xl font-bold text-secondary mb-2">12</p>
            <p className="text-muted-foreground">Военнослужащих</p>
          </Card>

          <Card className="soviet-card p-6 text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Sword" className="text-white" size={32} />
            </div>
            <p className="text-4xl font-bold text-secondary mb-2">3</p>
            <p className="text-muted-foreground">Подразделений</p>
          </Card>

          <Card className="soviet-card p-6 text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Award" className="text-white" size={32} />
            </div>
            <Badge className="bg-green-600 text-lg px-4 py-1">
              Готовность
            </Badge>
            <p className="text-muted-foreground mt-2">Боевая готовность</p>
          </Card>
        </div>

        <Card className="soviet-card p-6">
          <h2 className="text-2xl font-bold mb-6 text-secondary">Структура вооружённых сил</h2>
          <div className="space-y-4">
            {[
              { name: 'Сухопутные войска', icon: 'Users', status: 'Активны' },
              { name: 'ПВО', icon: 'Shield', status: 'Готовность' },
              { name: 'Инженерные войска', icon: 'HardHat', status: 'Активны' }
            ].map((unit, i) => (
              <div key={i} className="flex items-center justify-between bg-background p-4 rounded border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded flex items-center justify-center">
                    <Icon name={unit.icon as any} className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold">{unit.name}</h3>
                    <p className="text-sm text-muted-foreground">Подразделение {i + 1}</p>
                  </div>
                </div>
                <Badge className="bg-green-600">{unit.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="soviet-card p-6">
          <h2 className="text-2xl font-bold mb-4 text-secondary">Призыв на службу</h2>
          <p className="text-muted-foreground mb-4">
            Для вступления в ряды вооружённых сил ЦК КПСС необходимо подать заявку через раздел "Запрос роли"
            и указать желаемую военную специальность.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'Солдат пехоты',
              'Танкист',
              'Лётчик',
              'Сапёр',
              'Связист',
              'Медик'
            ].map(role => (
              <div key={role} className="bg-background p-3 rounded border border-border flex items-center gap-2">
                <Icon name="Star" className="text-secondary" size={16} />
                <span className="text-sm">{role}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Army;
