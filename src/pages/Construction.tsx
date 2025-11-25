import Layout from '@/components/Layout';
import AdminPanel from '@/components/AdminPanel';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Construction = () => {
  const projects = [
    { name: 'Жилой квартал №1 (Люберцы)', progress: 45, status: 'В работе', icon: 'Building2' },
    { name: 'Станция метро "Люберцы"', progress: 30, status: 'В работе', icon: 'Train' },
    { name: 'Промышленный комплекс', progress: 20, status: 'В работе', icon: 'Factory' },
    { name: 'Городская площадь', progress: 60, status: 'В работе', icon: 'Landmark' },
    { name: 'Электростанция', progress: 15, status: 'В работе', icon: 'Zap' },
    { name: 'Железнодорожная ветка', progress: 25, status: 'В работе', icon: 'Route' }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Icon name="HardHat" className="text-secondary" size={32} />
            <h1 className="text-3xl font-bold">Строительство</h1>
          </div>
          <AdminPanel />
        </div>

        <Card className="soviet-card p-6 soviet-border">
          <h2 className="text-2xl font-bold mb-4 text-secondary">Общий прогресс застройки</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <Progress value={35} className="h-6" />
            </div>
            <span className="text-3xl font-bold text-secondary">35%</span>
          </div>
          <p className="text-muted-foreground">
            Ведётся активная застройка городских округов, развитие инфраструктуры и транспортной сети
          </p>
        </Card>

        <div className="grid gap-6">
          {projects.map((project, i) => (
            <Card key={i} className="soviet-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-primary/20 rounded flex items-center justify-center flex-shrink-0">
                  <Icon name={project.icon as any} className="text-primary" size={32} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-secondary">{project.name}</h3>
                      <Badge className="bg-green-600 mt-1">{project.status}</Badge>
                    </div>
                    <span className="text-2xl font-bold text-secondary">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-3" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="soviet-card p-6">
          <h2 className="text-2xl font-bold mb-4 text-secondary">Строительные бригады</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: 'Бригада №1', workers: 15, project: 'Жилой квартал' },
              { name: 'Бригада №2', workers: 12, project: 'Метрополитен' },
              { name: 'Бригада №3', workers: 18, project: 'Промышленность' },
              { name: 'Бригада №4', workers: 10, project: 'Инфраструктура' }
            ].map((brigade, i) => (
              <div key={i} className="bg-background p-4 rounded border border-border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold">{brigade.name}</h3>
                  <Badge className="bg-primary">{brigade.workers} чел.</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Работы: {brigade.project}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="soviet-card p-6">
          <h2 className="text-2xl font-bold mb-4 text-secondary">Галерея строительства</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="aspect-square bg-muted rounded border border-border flex items-center justify-center">
                <Icon name="Image" className="text-muted-foreground" size={32} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Construction;
