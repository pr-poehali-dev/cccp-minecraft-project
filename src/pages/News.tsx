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
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { isAuthenticated } from '@/lib/auth';
import { getNews, addNews, deleteNews, NewsItem } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const categoryIcons: Record<string, string> = {
  'политика': 'Landmark',
  'транспорт': 'Train',
  'кадры': 'Users',
  'строительство': 'HardHat',
  'культура': 'Theater',
  'технологии': 'Cpu'
};

const categoryColors: Record<string, string> = {
  'политика': 'bg-primary',
  'транспорт': 'bg-blue-600',
  'кадры': 'bg-purple-600',
  'строительство': 'bg-orange-600',
  'культура': 'bg-pink-600',
  'технологии': 'bg-green-600'
};

const News = () => {
  const isAdmin = isAuthenticated();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newNews, setNewNews] = useState({ title: '', content: '', category: 'политика' as const });
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    setNews(getNews());
  }, []);

  const handleAdd = () => {
    if (newNews.title && newNews.content) {
      addNews(newNews);
      setNews(getNews());
      setNewNews({ title: '', content: '', category: 'политика' });
      setIsAddDialogOpen(false);
      toast({
        title: 'Опубликовано',
        description: 'Новость добавлена'
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Удалить эту новость?')) {
      deleteNews(id);
      setNews(getNews());
      toast({
        title: 'Удалено',
        description: 'Новость удалена'
      });
    }
  };

  const filteredNews = filterCategory === 'all' 
    ? news 
    : news.filter(n => n.category === filterCategory);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Icon name="Newspaper" className="text-secondary" size={32} />
            <h1 className="text-3xl font-bold">Новости государства</h1>
          </div>
          <AdminPanel />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={filterCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterCategory('all')}
            className={filterCategory === 'all' ? 'bg-primary' : ''}
          >
            Все новости
          </Button>
          {Object.keys(categoryIcons).map(cat => (
            <Button
              key={cat}
              size="sm"
              variant={filterCategory === cat ? 'default' : 'outline'}
              onClick={() => setFilterCategory(cat)}
              className={filterCategory === cat ? categoryColors[cat] : ''}
            >
              <Icon name={categoryIcons[cat] as any} size={16} className="mr-2" />
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Button>
          ))}
        </div>

        {isAdmin && (
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-secondary text-black hover:bg-secondary/90">
            <Icon name="Plus" size={18} className="mr-2" />
            Добавить новость
          </Button>
        )}

        <div className="space-y-4">
          {filteredNews.map(item => (
            <Card key={item.id} className="soviet-card p-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${categoryColors[item.category]} rounded flex items-center justify-center flex-shrink-0`}>
                  <Icon name={categoryIcons[item.category] as any} className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <Badge className={`${categoryColors[item.category]} mb-2`}>
                        {item.category}
                      </Badge>
                      <h3 className="font-bold text-xl text-secondary">{item.title}</h3>
                    </div>
                    {isAdmin && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(item.id)}
                        className="border-destructive text-destructive"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">
                    {new Date(item.date).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  <p className="leading-relaxed">{item.content}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <Card className="soviet-card p-12 text-center">
            <Icon name="FileX" className="text-muted-foreground mx-auto mb-4" size={48} />
            <p className="text-muted-foreground">Новостей пока нет</p>
          </Card>
        )}
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="soviet-card">
          <DialogHeader>
            <DialogTitle className="text-secondary">Добавить новость</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Категория</Label>
              <Select
                value={newNews.category}
                onValueChange={(value: any) => setNewNews({ ...newNews, category: value })}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(categoryIcons).map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Заголовок</Label>
              <Input
                value={newNews.title}
                onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                className="bg-background"
              />
            </div>
            <div>
              <Label>Содержание</Label>
              <Textarea
                value={newNews.content}
                onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                className="bg-background min-h-32"
                rows={6}
              />
            </div>
            <Button onClick={handleAdd} className="w-full bg-primary">
              Опубликовать
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default News;
