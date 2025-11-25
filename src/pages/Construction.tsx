import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import AdminPanel from '@/components/AdminPanel';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { isAuthenticated } from '@/lib/auth';
import { 
  getConstructionProjects, addConstructionProject, updateConstructionProject, deleteConstructionProject,
  getConstructionPhotos, addConstructionPhoto, deleteConstructionPhoto,
  ConstructionProject, Photo
} from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const iconOptions = ['Building2', 'Train', 'Factory', 'Landmark', 'Zap', 'Route', 'HardHat', 'Home', 'Store'];

const Construction = () => {
  const isAdmin = isAuthenticated();
  const [projects, setProjects] = useState<ConstructionProject[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [editingProject, setEditingProject] = useState<ConstructionProject | null>(null);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isAddPhotoOpen, setIsAddPhotoOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', progress: 0, status: 'В работе', icon: 'Building2' });
  const [photoUrl, setPhotoUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    setProjects(getConstructionProjects());
    setPhotos(getConstructionPhotos());
  }, []);

  const totalProgress = projects.length > 0 
    ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
    : 0;

  const handleAddProject = () => {
    if (newProject.name) {
      addConstructionProject(newProject);
      setProjects(getConstructionProjects());
      setNewProject({ name: '', progress: 0, status: 'В работе', icon: 'Building2' });
      setIsAddProjectOpen(false);
      toast({ title: 'Проект добавлен' });
    }
  };

  const handleUpdateProject = () => {
    if (editingProject) {
      updateConstructionProject(editingProject);
      setProjects(getConstructionProjects());
      setEditingProject(null);
      toast({ title: 'Проект обновлён' });
    }
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Удалить проект?')) {
      deleteConstructionProject(id);
      setProjects(getConstructionProjects());
      toast({ title: 'Проект удалён' });
    }
  };

  const handleAddPhoto = () => {
    if (photoUrl) {
      addConstructionPhoto({ url: photoUrl });
      setPhotos(getConstructionPhotos());
      setPhotoUrl('');
      setIsAddPhotoOpen(false);
      toast({ title: 'Фото добавлено' });
    }
  };

  const handleDeletePhoto = (id: string) => {
    if (confirm('Удалить фото?')) {
      deleteConstructionPhoto(id);
      setPhotos(getConstructionPhotos());
      toast({ title: 'Фото удалено' });
    }
  };

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

        {isAdmin && (
          <div className="flex gap-2">
            <Button onClick={() => setIsAddProjectOpen(true)} className="bg-secondary text-black">
              <Icon name="Plus" size={18} className="mr-2" />
              Добавить проект
            </Button>
            <Button onClick={() => setIsAddPhotoOpen(true)} className="bg-primary">
              <Icon name="Image" size={18} className="mr-2" />
              Добавить фото
            </Button>
          </div>
        )}

        <Card className="soviet-card p-6 soviet-border">
          <h2 className="text-2xl font-bold mb-4 text-secondary">Общий прогресс застройки</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <Progress value={totalProgress} className="h-6" />
            </div>
            <span className="text-3xl font-bold text-secondary">{totalProgress}%</span>
          </div>
          <p className="text-muted-foreground">
            Ведётся активная застройка городских округов, развитие инфраструктуры и транспортной сети
          </p>
        </Card>

        <div className="grid gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="soviet-card p-6">
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
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-secondary">{project.progress}%</span>
                      {isAdmin && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingProject(project)}
                            className="border-secondary text-secondary"
                          >
                            <Icon name="Edit" size={14} />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteProject(project.id)}
                            className="border-destructive text-destructive"
                          >
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <Progress value={project.progress} className="h-3" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="soviet-card p-6">
          <h2 className="text-2xl font-bold mb-4 text-secondary">Галерея строительства</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {photos.map(photo => (
              <div key={photo.id} className="relative group">
                <div className="aspect-square bg-muted rounded border border-border overflow-hidden">
                  <img src={photo.url} alt="" className="w-full h-full object-cover" />
                </div>
                {isAdmin && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                )}
              </div>
            ))}
            {photos.length === 0 && (
              <div className="aspect-square bg-muted rounded border border-border flex items-center justify-center">
                <Icon name="Image" className="text-muted-foreground" size={32} />
              </div>
            )}
          </div>
        </Card>
      </div>

      {editingProject && (
        <Dialog open={!!editingProject} onOpenChange={() => setEditingProject(null)}>
          <DialogContent className="soviet-card">
            <DialogHeader>
              <DialogTitle className="text-secondary">Редактировать проект</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Название</Label>
                <Input
                  value={editingProject.name}
                  onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                  className="bg-background"
                />
              </div>
              <div>
                <Label>Прогресс (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={editingProject.progress}
                  onChange={(e) => setEditingProject({ ...editingProject, progress: parseInt(e.target.value) || 0 })}
                  className="bg-background"
                />
              </div>
              <div>
                <Label>Статус</Label>
                <Input
                  value={editingProject.status}
                  onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })}
                  className="bg-background"
                />
              </div>
              <div>
                <Label>Иконка</Label>
                <Select
                  value={editingProject.icon}
                  onValueChange={(value) => setEditingProject({ ...editingProject, icon: value })}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map(icon => (
                      <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleUpdateProject} className="w-full bg-primary">
                Сохранить
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isAddProjectOpen} onOpenChange={setIsAddProjectOpen}>
        <DialogContent className="soviet-card">
          <DialogHeader>
            <DialogTitle className="text-secondary">Добавить проект</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Название</Label>
              <Input
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                className="bg-background"
              />
            </div>
            <div>
              <Label>Прогресс (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={newProject.progress}
                onChange={(e) => setNewProject({ ...newProject, progress: parseInt(e.target.value) || 0 })}
                className="bg-background"
              />
            </div>
            <div>
              <Label>Статус</Label>
              <Input
                value={newProject.status}
                onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                className="bg-background"
              />
            </div>
            <div>
              <Label>Иконка</Label>
              <Select
                value={newProject.icon}
                onValueChange={(value) => setNewProject({ ...newProject, icon: value })}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map(icon => (
                    <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddProject} className="w-full bg-primary">
              Добавить
            </Button>
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
              <Input
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="bg-background"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <Button onClick={handleAddPhoto} className="w-full bg-primary">
              Добавить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Construction;