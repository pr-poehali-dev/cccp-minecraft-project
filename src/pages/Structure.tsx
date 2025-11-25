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
import Icon from '@/components/ui/icon';
import { isAuthenticated } from '@/lib/auth';
import { getPeople, updatePerson, addPerson, deletePerson, Person } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const Structure = () => {
  const isAdmin = isAuthenticated();
  const [people, setPeople] = useState<Person[]>([]);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newPerson, setNewPerson] = useState({ name: '', role: '', description: '' });
  const { toast } = useToast();

  useEffect(() => {
    setPeople(getPeople());
  }, []);

  const handleSave = (person: Person) => {
    updatePerson(person);
    setPeople(getPeople());
    setEditingPerson(null);
    toast({
      title: 'Сохранено',
      description: 'Информация о должностном лице обновлена'
    });
  };

  const handleAdd = () => {
    if (newPerson.name && newPerson.role) {
      addPerson(newPerson);
      setPeople(getPeople());
      setNewPerson({ name: '', role: '', description: '' });
      setIsAddDialogOpen(false);
      toast({
        title: 'Добавлено',
        description: 'Новое должностное лицо добавлено'
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Удалить это должностное лицо?')) {
      deletePerson(id);
      setPeople(getPeople());
      toast({
        title: 'Удалено',
        description: 'Должностное лицо удалено'
      });
    }
  };

  const getRoleCategory = (role: string) => {
    if (role.includes('ГенСек') || role.includes('Зам')) return 'leadership';
    if (role.includes('Глава')) return 'city';
    if (role.includes('НарКом') || role.includes('Начальник')) return 'ministry';
    return 'citizen';
  };

  const groupedPeople = {
    leadership: people.filter(p => getRoleCategory(p.role) === 'leadership'),
    city: people.filter(p => getRoleCategory(p.role) === 'city'),
    ministry: people.filter(p => getRoleCategory(p.role) === 'ministry'),
    citizen: people.filter(p => getRoleCategory(p.role) === 'citizen')
  };

  const PersonCard = ({ person }: { person: Person }) => (
    <Card className="soviet-card p-4">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
          {person.avatar ? (
            <img src={person.avatar} alt={person.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <Icon name="User" className="text-primary" size={32} />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-secondary">{person.name}</h3>
          <p className="text-sm text-primary mb-2">{person.role}</p>
          <p className="text-sm text-muted-foreground">{person.description}</p>
          {isAdmin && (
            <div className="flex gap-2 mt-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditingPerson(person)}
                className="border-secondary text-secondary"
              >
                <Icon name="Edit" size={14} className="mr-1" />
                Изменить
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(person.id)}
                className="border-destructive text-destructive"
              >
                <Icon name="Trash2" size={14} className="mr-1" />
                Удалить
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Icon name="Users" className="text-secondary" size={32} />
            <h1 className="text-3xl font-bold">Структура власти</h1>
          </div>
          <AdminPanel />
        </div>

        {isAdmin && (
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-secondary text-black hover:bg-secondary/90">
            <Icon name="UserPlus" size={18} className="mr-2" />
            Добавить лицо
          </Button>
        )}

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-primary">Высшее руководство</h2>
            <div className="grid gap-4">
              {groupedPeople.leadership.map(person => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-primary">Руководство городов</h2>
            <div className="grid gap-4">
              {groupedPeople.city.map(person => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-primary">Народные комиссариаты</h2>
            <div className="grid gap-4">
              {groupedPeople.ministry.map(person => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-primary">Граждане</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {groupedPeople.citizen.map(person => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {editingPerson && (
        <Dialog open={!!editingPerson} onOpenChange={() => setEditingPerson(null)}>
          <DialogContent className="soviet-card">
            <DialogHeader>
              <DialogTitle className="text-secondary">Редактирование</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Имя</Label>
                <Input
                  value={editingPerson.name}
                  onChange={(e) => setEditingPerson({ ...editingPerson, name: e.target.value })}
                  className="bg-background"
                />
              </div>
              <div>
                <Label>Должность</Label>
                <Input
                  value={editingPerson.role}
                  onChange={(e) => setEditingPerson({ ...editingPerson, role: e.target.value })}
                  className="bg-background"
                />
              </div>
              <div>
                <Label>Описание</Label>
                <Textarea
                  value={editingPerson.description}
                  onChange={(e) => setEditingPerson({ ...editingPerson, description: e.target.value })}
                  className="bg-background"
                />
              </div>
              <Button onClick={() => handleSave(editingPerson)} className="w-full bg-primary">
                Сохранить
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="soviet-card">
          <DialogHeader>
            <DialogTitle className="text-secondary">Добавить гражданина</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Имя</Label>
              <Input
                value={newPerson.name}
                onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
                className="bg-background"
              />
            </div>
            <div>
              <Label>Должность</Label>
              <Input
                value={newPerson.role}
                onChange={(e) => setNewPerson({ ...newPerson, role: e.target.value })}
                className="bg-background"
              />
            </div>
            <div>
              <Label>Описание</Label>
              <Textarea
                value={newPerson.description}
                onChange={(e) => setNewPerson({ ...newPerson, description: e.target.value })}
                className="bg-background"
              />
            </div>
            <Button onClick={handleAdd} className="w-full bg-primary">
              Добавить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Structure;
