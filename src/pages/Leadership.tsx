import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import AdminPanel from '@/components/AdminPanel';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { isAuthenticated } from '@/lib/auth';
import { getPeople, getLeadershipDescription, updateLeadershipDescription } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const Leadership = () => {
  const isAdmin = isAuthenticated();
  const [leaders, setLeaders] = useState<any[]>([]);
  const [description, setDescription] = useState('');
  const [editMode, setEditMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const people = getPeople();
    const leadershipPeople = people.filter(p => 
      p.role.includes('ГенСек') || p.role.includes('Зам')
    );
    setLeaders(leadershipPeople);
    setDescription(getLeadershipDescription());
  };

  const handleSaveDescription = () => {
    updateLeadershipDescription(description);
    setEditMode(false);
    toast({ title: 'Описание обновлено' });
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Icon name="Crown" className="text-secondary" size={32} />
            <h1 className="text-3xl font-bold">Высшее руководство</h1>
          </div>
          <AdminPanel />
        </div>

        <Card className="soviet-card p-8 text-center soviet-border">
          <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 soviet-star">
            <span className="text-primary text-6xl">☭</span>
          </div>
          <h2 className="text-3xl font-bold text-secondary mb-2">Центральный Комитет КПСС</h2>
          <div className="mt-4">
            {editMode ? (
              <div className="space-y-4 text-left max-w-2xl mx-auto">
                <Textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  className="bg-background min-h-24" 
                  rows={3}
                />
                <div className="flex gap-2 justify-center">
                  <Button onClick={handleSaveDescription} className="bg-primary">Сохранить</Button>
                  <Button variant="outline" onClick={() => { setEditMode(false); setDescription(getLeadershipDescription()); }}>Отмена</Button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-muted-foreground">{description}</p>
                {isAdmin && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setEditMode(true)} 
                    className="border-secondary text-secondary mt-3"
                  >
                    <Icon name="Edit" size={14} className="mr-1" />
                    Редактировать
                  </Button>
                )}
              </div>
            )}
          </div>
        </Card>

        <div className="space-y-6">
          {leaders.map(leader => (
            <Card key={leader.id} className="soviet-card p-6">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  {leader.avatar ? (
                    <img src={leader.avatar} alt={leader.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <Icon name="User" className="text-primary" size={48} />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-secondary mb-1">{leader.name}</h3>
                  <p className="text-lg text-primary mb-3">{leader.role}</p>
                  <p className="text-muted-foreground leading-relaxed">{leader.description}</p>
                  <div className="flex gap-2 mt-4">
                    <div className="bg-background px-3 py-1 rounded border border-border">
                      <Icon name="Award" className="text-secondary inline mr-2" size={16} />
                      <span className="text-sm">Партийный билет</span>
                    </div>
                    <div className="bg-background px-3 py-1 rounded border border-border">
                      <Icon name="Shield" className="text-primary inline mr-2" size={16} />
                      <span className="text-sm">Высшая власть</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="soviet-card p-6">
          <h2 className="text-2xl font-bold mb-4 text-secondary">Полномочия руководства</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: 'Gavel', text: 'Принятие государственных постановлений' },
              { icon: 'Users', text: 'Назначение должностных лиц' },
              { icon: 'Building2', text: 'Управление городским строительством' },
              { icon: 'Shield', text: 'Руководство вооружёнными силами' },
              { icon: 'Landmark', text: 'Определение политического курса' },
              { icon: 'Scale', text: 'Контроль за соблюдением законов' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-background p-4 rounded border border-border">
                <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center flex-shrink-0">
                  <Icon name={item.icon as any} className="text-primary" size={20} />
                </div>
                <p className="text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Leadership;
