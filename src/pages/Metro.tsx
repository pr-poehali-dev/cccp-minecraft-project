import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import AdminPanel from '@/components/AdminPanel';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { isAuthenticated } from '@/lib/auth';
import {
  getMetroStations, updateMetroStations,
  getMetroLines, updateMetroLines,
  getMetroDescription, updateMetroDescription,
  getMetroPhotos, addMetroPhoto, deleteMetroPhoto,
  Photo
} from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const Metro = () => {
  const isAdmin = isAuthenticated();
  const [stations, setStations] = useState('');
  const [lines, setLines] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [isAddPhotoOpen, setIsAddPhotoOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setStations(getMetroStations());
    setLines(getMetroLines());
    setDescription(getMetroDescription());
    setPhotos(getMetroPhotos());
  };

  const handleSaveInfo = () => {
    updateMetroStations(stations);
    updateMetroLines(lines);
    setEditMode(null);
    toast({ title: 'Информация обновлена' });
  };

  const handleSaveDescription = () => {
    updateMetroDescription(description);
    setEditMode(null);
    toast({ title: 'Описание обновлено' });
  };

  const handleAddPhoto = () => {
    if (photoUrl) {
      addMetroPhoto({ url: photoUrl });
      setPhotos(getMetroPhotos());
      setPhotoUrl('');
      setIsAddPhotoOpen(false);
      toast({ title: 'Фото добавлено' });
    }
  };

  const handleDeletePhoto = (id: string) => {
    if (confirm('Удалить фото?')) {
      deleteMetroPhoto(id);
      setPhotos(getMetroPhotos());
      toast({ title: 'Фото удалено' });
    }
  };

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

        {editMode === 'info' ? (
          <Card className="soviet-card p-6">
            <h2 className="text-2xl font-bold mb-4 text-secondary">Редактировать информацию</h2>
            <div className="space-y-4">
              <div>
                <Label>Станции</Label>
                <Input value={stations} onChange={(e) => setStations(e.target.value)} className="bg-background" />
              </div>
              <div>
                <Label>Линии</Label>
                <Input value={lines} onChange={(e) => setLines(e.target.value)} className="bg-background" />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveInfo} className="bg-primary">Сохранить</Button>
                <Button variant="outline" onClick={() => { setEditMode(null); loadData(); }}>Отмена</Button>
              </div>
            </div>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="soviet-card p-6 soviet-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary rounded flex items-center justify-center">
                  <Icon name="MapPin" className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Станций</p>
                  <p className="text-2xl font-bold text-secondary">{stations}</p>
                </div>
                {isAdmin && (
                  <Button size="sm" variant="outline" onClick={() => setEditMode('info')} className="border-secondary text-secondary">
                    <Icon name="Edit" size={14} />
                  </Button>
                )}
              </div>
              <Badge className="bg-green-600">В разработке</Badge>
            </Card>

            <Card className="soviet-card p-6 soviet-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary rounded flex items-center justify-center">
                  <Icon name="Route" className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Линий</p>
                  <p className="text-2xl font-bold text-secondary">{lines}</p>
                </div>
              </div>
              <Badge className="bg-green-600">В разработке</Badge>
            </Card>
          </div>
        )}

        <Card className="soviet-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-secondary">О метрополитене</h2>
            {isAdmin && editMode !== 'description' && (
              <Button size="sm" variant="outline" onClick={() => setEditMode('description')} className="border-secondary text-secondary">
                <Icon name="Edit" size={14} className="mr-1" />
                Редактировать
              </Button>
            )}
          </div>
          {editMode === 'description' ? (
            <div className="space-y-4">
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="bg-background min-h-32" rows={5} />
              <div className="flex gap-2">
                <Button onClick={handleSaveDescription} className="bg-primary">Сохранить</Button>
                <Button variant="outline" onClick={() => { setEditMode(null); setDescription(getMetroDescription()); }}>Отмена</Button>
              </div>
            </div>
          ) : (
            <p className="leading-relaxed text-muted-foreground">{description}</p>
          )}
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-secondary">Фотогалерея метрополитена</h2>
            {isAdmin && (
              <Button size="sm" onClick={() => setIsAddPhotoOpen(true)} className="bg-secondary text-black">
                <Icon name="Upload" size={16} className="mr-1" />
                Добавить фото
              </Button>
            )}
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {photos.map(photo => (
              <div key={photo.id} className="relative group">
                <div className="aspect-video bg-muted rounded border border-border overflow-hidden">
                  <img src={photo.url} alt="" className="w-full h-full object-cover" />
                </div>
                {isAdmin && (
                  <Button size="sm" variant="destructive" onClick={() => handleDeletePhoto(photo.id)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icon name="Trash2" size={14} />
                  </Button>
                )}
              </div>
            ))}
            {photos.length === 0 && (
              <div className="aspect-video bg-muted rounded border-2 border-primary flex items-center justify-center col-span-full">
                <div className="text-center">
                  <Icon name="Map" className="text-muted-foreground mx-auto mb-4" size={64} />
                  <p className="text-muted-foreground">Фотографий пока нет</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      <Dialog open={isAddPhotoOpen} onOpenChange={setIsAddPhotoOpen}>
        <DialogContent className="soviet-card">
          <DialogHeader>
            <DialogTitle className="text-secondary">Добавить фото</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>URL изображения</Label>
              <Input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} className="bg-background" placeholder="https://example.com/image.jpg" />
            </div>
            <Button onClick={handleAddPhoto} className="w-full bg-primary">Добавить</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Metro;
