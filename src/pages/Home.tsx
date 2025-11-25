import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import AdminPanel from '@/components/AdminPanel';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { isAuthenticated } from '@/lib/auth';
import { getImportantAnnouncement, updateImportantAnnouncement, getServerIP } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const Home = () => {
  const isAdmin = isAuthenticated();
  const [announcement, setAnnouncement] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [serverIP, setServerIP] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    setAnnouncement(getImportantAnnouncement());
    setServerIP(getServerIP());
  }, []);

  const handleSaveAnnouncement = () => {
    updateImportantAnnouncement(announcement);
    setEditMode(false);
    toast({
      title: 'Сохранено',
      description: 'Объявление успешно обновлено'
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 bg-primary flex items-center justify-center soviet-star">
                <span className="text-secondary text-5xl">☭</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-secondary mb-2">
                  Центральный Комитет<br />Коммунистической Партии<br />Советского Союза
                </h1>
                <p className="text-muted-foreground text-lg">Городской округ Люберцы</p>
              </div>
            </div>
          </div>
          <AdminPanel />
        </div>

        <Card className="soviet-card p-6 soviet-border">
          <div className="flex items-center gap-3 mb-4">
            <Icon name="Megaphone" className="text-secondary" size={28} />
            <h2 className="text-2xl font-bold text-secondary">Важное объявление</h2>
            {isAdmin && !editMode && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditMode(true)}
                className="ml-auto border-secondary text-secondary"
              >
                <Icon name="Edit" size={16} className="mr-2" />
                Редактировать
              </Button>
            )}
          </div>
          {editMode ? (
            <div className="space-y-4">
              <Textarea
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                className="min-h-32 bg-background"
                rows={4}
              />
              <div className="flex gap-2">
                <Button onClick={handleSaveAnnouncement} className="bg-primary">
                  Сохранить
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditMode(false);
                    setAnnouncement(getImportantAnnouncement());
                  }}
                >
                  Отмена
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-lg leading-relaxed">{announcement}</p>
          )}
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="soviet-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Icon name="Server" className="text-primary" size={28} />
              <h2 className="text-2xl font-bold">Подключение к серверу</h2>
            </div>
            <div className="space-y-3">
              <div className="bg-background p-4 rounded border border-border">
                <p className="text-muted-foreground text-sm mb-2">IP адрес сервера:</p>
                <p className="text-xl font-mono text-secondary">{serverIP}</p>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">
                <Icon name="Copy" size={18} className="mr-2" />
                Скопировать IP
              </Button>
            </div>
          </Card>

          <Card className="soviet-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Icon name="Music" className="text-secondary" size={28} />
              <h2 className="text-2xl font-bold">Государственный гимн</h2>
            </div>
            <div className="space-y-3 text-sm leading-relaxed">
              <p className="italic">
                Союз нерушимый республик свободных<br />
                Сплотила навеки Великая Русь.<br />
                Да здравствует созданный волей народов<br />
                Единый, могучий Советский Союз!
              </p>
              <p className="font-bold text-primary">
                Славься, Отечество наше свободное,<br />
                Дружбы народов надёжный оплот!<br />
                Партия Ленина — сила народная<br />
                Нас к торжеству коммунизма ведёт!
              </p>
            </div>
          </Card>
        </div>

        <Card className="soviet-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <Icon name="Sparkles" className="text-secondary" size={28} />
            <h2 className="text-2xl font-bold">О портале</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Users" className="text-primary" size={32} />
              </div>
              <h3 className="font-bold mb-2">Структура власти</h3>
              <p className="text-sm text-muted-foreground">Полная информация о руководстве и должностных лицах</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Newspaper" className="text-primary" size={32} />
              </div>
              <h3 className="font-bold mb-2">Новости государства</h3>
              <p className="text-sm text-muted-foreground">Актуальные события и постановления ЦК КПСС</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Building2" className="text-primary" size={32} />
              </div>
              <h3 className="font-bold mb-2">Развитие городов</h3>
              <p className="text-sm text-muted-foreground">Строительство Люберец и других населённых пунктов</p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Home;
