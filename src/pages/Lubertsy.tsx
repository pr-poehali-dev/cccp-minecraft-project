import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import AdminPanel from '@/components/AdminPanel';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { isAuthenticated } from '@/lib/auth';
import {
  getConstructionStatus, updateConstructionStatus,
  getConstructionProgress, updateConstructionProgress,
  getConstructionStartDate, updateConstructionStartDate,
  getCityDescription, updateCityDescription,
  getCityNews, addCityNews, deleteCityNews,
  getCityPhotos, addCityPhoto, deleteCityPhoto,
  CityNewsItem, Photo
} from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const Lubertsy = () => {
  const isAdmin = isAuthenticated();
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [description, setDescription] = useState('');
  const [news, setNews] = useState<CityNewsItem[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [isAddNewsOpen, setIsAddNewsOpen] = useState(false);
  const [isAddPhotoOpen, setIsAddPhotoOpen] = useState(false);
  const [newNews, setNewNews] = useState({ title: '', content: '' });
  const [photoUrl, setPhotoUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setStatus(getConstructionStatus());
    setProgress(getConstructionProgress());
    setStartDate(getConstructionStartDate());
    setDescription(getCityDescription());
    setNews(getCityNews());
    setPhotos(getCityPhotos());
  };

  const handleSaveStatus = () => {
    updateConstructionStatus(status);
    updateConstructionProgress(progress);
    updateConstructionStartDate(startDate);
    setEditMode(null);
    toast({ title: 'Статус обновлён' });
  };

  const handleSaveDescription = () => {
    updateCityDescription(description);
    setEditMode(null);
    toast({ title: 'Описание обновлено' });
  };

  const handleAddNews = () => {
    if (newNews.title && newNews.content) {
      addCityNews(newNews);
      setNews(getCityNews());
      setNewNews({ title: '', content: '' });
      setIsAddNewsOpen(false);
      toast({ title: 'Новость добавлена' });
    }
  };

  const handleDeleteNews = (id: string) => {
    if (confirm('Удалить новость?')) {
      deleteCityNews(id);
      setNews(getCityNews());
      toast({ title: 'Новость удалена' });
    }
  };

  const handleAddPhoto = () => {
    if (photoUrl) {
      addCityPhoto({ url: photoUrl });
      setPhotos(getCityPhotos());
      setPhotoUrl('');
      setIsAddPhotoOpen(false);
      toast({ title: 'Фото добавлено' });
    }
  };

  const handleDeletePhoto = (id: string) => {
    if (confirm('Удалить фото?')) {
      deleteCityPhoto(id);
      setPhotos(getCityPhotos());
      toast({ title: 'Фото удалено' });
    }
  };

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
            <div className="flex items-center gap-2">
              <Badge className={status === 'активно' ? 'bg-green-600' : 'bg-muted'}>
                {status === 'активно' ? 'В стадии строительства' : 'Приостановлено'}
              </Badge>
              {isAdmin && editMode !== 'status' && (
                <Button size="sm" variant="outline" onClick={() => setEditMode('status')} className="border-secondary text-secondary">
                  <Icon name="Edit" size={14} />
                </Button>
              )}
            </div>
          </div>
          {editMode === 'status' ? (
            <div className="space-y-4">
              <div>
                <Label>Статус</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="активно">Активно</SelectItem>
                    <SelectItem value="неактивно">Неактивно</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Прогресс (%)</Label>
                <Input type="number" min="0" max="100" value={progress} onChange={(e) => setProgress(parseInt(e.target.value) || 0)} className="bg-background" />
              </div>
              <div>
                <Label>Дата начала</Label>
                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-background" />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveStatus} className="bg-primary">Сохранить</Button>
                <Button variant="outline" onClick={() => { setEditMode(null); loadData(); }}>Отмена</Button>
              </div>
            </div>
          ) : (
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
                    {new Date(startDate).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div className="bg-background p-4 rounded border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Глава города</p>
                  <p className="text-lg font-bold text-secondary">Вагнер</p>
                </div>
              </div>
            </div>
          )}
        </Card>

        <Card className="soviet-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-secondary">О городе</h2>
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
                <Button variant="outline" onClick={() => { setEditMode(null); setDescription(getCityDescription()); }}>Отмена</Button>
              </div>
            </div>
          ) : (
            <p className="leading-relaxed text-muted-foreground">{description}</p>
          )}
        </Card>

        <Card className="soviet-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-secondary">Галерея строительства</h2>
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
              <div className="aspect-video bg-muted rounded border border-border flex items-center justify-center">
                <Icon name="Image" className="text-muted-foreground" size={48} />
              </div>
            )}
          </div>
        </Card>

        <Card className="soviet-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-secondary">Новости города</h2>
            {isAdmin && (
              <Button size="sm" onClick={() => setIsAddNewsOpen(true)} className="bg-primary">
                <Icon name="Plus" size={16} className="mr-1" />
                Добавить новость
              </Button>
            )}
          </div>
          <div className="space-y-3">
            {news.map(item => (
              <div key={item.id} className="bg-background p-4 rounded border border-border">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm text-muted-foreground">
                    {new Date(item.date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  {isAdmin && (
                    <Button size="sm" variant="outline" onClick={() => handleDeleteNews(item.id)} className="border-destructive text-destructive">
                      <Icon name="Trash2" size={14} />
                    </Button>
                  )}
                </div>
                <p className="font-bold mb-2">{item.title}</p>
                <p className="text-sm">{item.content}</p>
              </div>
            ))}
            {news.length === 0 && (
              <p className="text-muted-foreground text-center py-8">Новостей пока нет</p>
            )}
          </div>
        </Card>
      </div>

      <Dialog open={isAddNewsOpen} onOpenChange={setIsAddNewsOpen}>
        <DialogContent className="soviet-card">
          <DialogHeader>
            <DialogTitle className="text-secondary">Добавить новость</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Заголовок</Label>
              <Input value={newNews.title} onChange={(e) => setNewNews({ ...newNews, title: e.target.value })} className="bg-background" />
            </div>
            <div>
              <Label>Содержание</Label>
              <Textarea value={newNews.content} onChange={(e) => setNewNews({ ...newNews, content: e.target.value })} className="bg-background" rows={4} />
            </div>
            <Button onClick={handleAddNews} className="w-full bg-primary">Добавить</Button>
          </div>
        </DialogContent>
      </Dialog>

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

export default Lubertsy;
