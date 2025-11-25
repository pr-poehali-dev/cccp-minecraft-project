import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import AdminPanel from '@/components/AdminPanel';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { isAuthenticated } from '@/lib/auth';

const Lubertsy = () => {
  const isAdmin = isAuthenticated();
  const [constructionStatus, setConstructionStatus] = useState('активно');
  const [progress, setProgress] = useState(35);
  const [startDate, setStartDate] = useState('2025-01-15');

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Icon name="Building2" className="text-secondary" size={32} />
            <h1 className="text-3xl font-bold">Городской округ Люберцы</h1>
          </div>
          <AdminPanel />
        </div>

        <Card className="soviet-card p-6 soviet-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-secondary">Статус строительства</h2>
            <Badge className={constructionStatus === 'активно' ? 'bg-green-600' : 'bg-muted'}>
              {constructionStatus === 'активно' ? 'В стадии строительства' : 'Приостановлено'}
            </Badge>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Общий прогресс</span>
                <span className="text-sm font-bold text-secondary">{progress}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-background p-4 rounded border border-border">
                <p className="text-sm text-muted-foreground mb-1">Дата начала строительства</p>
                <p className="text-lg font-bold text-secondary">
                  {new Date(startDate).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="bg-background p-4 rounded border border-border">
                <p className="text-sm text-muted-foreground mb-1">Глава города</p>
                <p className="text-lg font-bold text-secondary">Вагнер</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="soviet-card p-6">
          <h2 className="text-2xl font-bold mb-4 text-secondary">О городе</h2>
          <p className="leading-relaxed text-muted-foreground">
            Люберцы — один из ключевых городских округов государства ЦК КПСС, находящийся в активной стадии строительства.
            Под руководством главы города Вагнера ведётся масштабная застройка жилых кварталов, промышленных объектов
            и инфраструктуры. Город станет важным экономическим и транспортным узлом.
          </p>
        </Card>

        <Card className="soviet-card p-6">
          <h2 className="text-2xl font-bold mb-4 text-secondary">Галерея строительства</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-video bg-muted rounded border border-border flex items-center justify-center">
                <Icon name="Image" className="text-muted-foreground" size={48} />
              </div>
            ))}
          </div>
          {isAdmin && (
            <Button className="mt-4 bg-secondary text-black hover:bg-secondary/90">
              <Icon name="Upload" size={18} className="mr-2" />
              Добавить фото
            </Button>
          )}
        </Card>

        <Card className="soviet-card p-6">
          <h2 className="text-2xl font-bold mb-4 text-secondary">Новости города</h2>
          <div className="space-y-3">
            <div className="bg-background p-4 rounded border border-border">
              <p className="text-sm text-muted-foreground mb-1">15 ноября 2025</p>
              <p className="font-bold mb-2">Начато строительство жилого квартала №1</p>
              <p className="text-sm">Заложен фундамент первого жилого квартала города</p>
            </div>
          </div>
          {isAdmin && (
            <Button className="mt-4 bg-primary">
              <Icon name="Plus" size={18} className="mr-2" />
              Добавить новость
            </Button>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default Lubertsy;
