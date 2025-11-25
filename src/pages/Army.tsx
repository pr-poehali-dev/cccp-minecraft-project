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
import { 
  getPeople,
  getArmyUnits, addArmyUnit, updateArmyUnit, deleteArmyUnit,
  getArmyStats, updateArmyStats,
  getArmyDescription, updateArmyDescription,
  ArmyUnit
} from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const iconOptions = ['Users', 'Shield', 'HardHat', 'Sword', 'Plane', 'Radar'];

const Army = () => {
  const isAdmin = isAuthenticated();
  const [narkom, setNarkom] = useState<any>(null);
  const [units, setUnits] = useState<ArmyUnit[]>([]);
  const [stats, setStats] = useState({ soldiers: 12, units: 3 });
  const [description, setDescription] = useState('');
  const [editingUnit, setEditingUnit] = useState<ArmyUnit | null>(null);
  const [isAddUnitOpen, setIsAddUnitOpen] = useState(false);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [newUnit, setNewUnit] = useState({ name: '', icon: 'Users', status: 'Активны' });
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const people = getPeople();
    const armyLeader = people.find(p => p.role.includes('НарКом Армии'));
    setNarkom(armyLeader);
    setUnits(getArmyUnits());
    setStats(getArmyStats());
    setDescription(getArmyDescription());
  };

  const handleSaveStats = () => {
    updateArmyStats(stats);
    setEditMode(null);
    toast({ title: 'Статистика обновлена' });
  };

  const handleSaveDescription = () => {
    updateArmyDescription(description);
    setEditMode(null);
    toast({ title: 'Описание обновлено' });
  };

  const handleAddUnit = () => {
    if (newUnit.name) {
      addArmyUnit(newUnit);
      setUnits(getArmyUnits());
      setNewUnit({ name: '', icon: 'Users', status: 'Активны' });
      setIsAddUnitOpen(false);
      toast({ title: 'Подразделение добавлено' });
    }
  };

  const handleUpdateUnit = () => {
    if (editingUnit) {
      updateArmyUnit(editingUnit);
      setUnits(getArmyUnits());
      setEditingUnit(null);
      toast({ title: 'Подразделение обновлено' });
    }
  };

  const handleDeleteUnit = (id: string) => {
    if (confirm('Удалить подразделение?')) {
      deleteArmyUnit(id);
      setUnits(getArmyUnits());
      toast({ title: 'Подразделение удалено' });
    }
  };

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

        {editMode === 'stats' ? (
          <Card className="soviet-card p-6">
            <h2 className="text-2xl font-bold mb-4 text-secondary">Редактировать статистику</h2>
            <div className="space-y-4">
              <div>
                <Label>Военнослужащих</Label>
                <Input type="number" value={stats.soldiers} onChange={(e) => setStats({ ...stats, soldiers: parseInt(e.target.value) || 0 })} className="bg-background" />
              </div>
              <div>
                <Label>Подразделений</Label>
                <Input type="number" value={stats.units} onChange={(e) => setStats({ ...stats, units: parseInt(e.target.value) || 0 })} className="bg-background" />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveStats} className="bg-primary">Сохранить</Button>
                <Button variant="outline" onClick={() => { setEditMode(null); setStats(getArmyStats()); }}>Отмена</Button>
              </div>
            </div>
          </Card>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="soviet-card p-6 text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" className="text-white" size={32} />
              </div>
              <p className="text-4xl font-bold text-secondary mb-2">{stats.soldiers}</p>
              <p className="text-muted-foreground">Военнослужащих</p>
            </Card>

            <Card className="soviet-card p-6 text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Sword" className="text-white" size={32} />
              </div>
              <p className="text-4xl font-bold text-secondary mb-2">{stats.units}</p>
              <p className="text-muted-foreground">Подразделений</p>
            </Card>

            <Card className="soviet-card p-6 text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Award" className="text-white" size={32} />
              </div>
              <Badge className="bg-green-600 text-lg px-4 py-1">Готовность</Badge>
              <p className="text-muted-foreground mt-2">Боевая готовность</p>
            </Card>
          </div>
        )}

        {isAdmin && editMode !== 'stats' && (
          <div className="flex gap-2">
            <Button onClick={() => setEditMode('stats')} variant="outline" className="border-secondary text-secondary">
              <Icon name="Edit" size={16} className="mr-2" />
              Изменить статистику
            </Button>
            <Button onClick={() => setIsAddUnitOpen(true)} className="bg-secondary text-black">
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить подразделение
            </Button>
          </div>
        )}

        <Card className="soviet-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-secondary">О вооружённых силах</h2>
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
                <Button variant="outline" onClick={() => { setEditMode(null); setDescription(getArmyDescription()); }}>Отмена</Button>
              </div>
            </div>
          ) : (
            <p className="leading-relaxed text-muted-foreground">{description}</p>
          )}
        </Card>

        <Card className="soviet-card p-6">
          <h2 className="text-2xl font-bold mb-6 text-secondary">Структура вооружённых сил</h2>
          <div className="space-y-4">
            {units.map((unit, i) => (
              <div key={unit.id} className="flex items-center justify-between bg-background p-4 rounded border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded flex items-center justify-center">
                    <Icon name={unit.icon as any} className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold">{unit.name}</h3>
                    <p className="text-sm text-muted-foreground">Подразделение {i + 1}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600">{unit.status}</Badge>
                  {isAdmin && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setEditingUnit(unit)} className="border-secondary text-secondary">
                        <Icon name="Edit" size={14} />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteUnit(unit.id)} className="border-destructive text-destructive">
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {editingUnit && (
        <Dialog open={!!editingUnit} onOpenChange={() => setEditingUnit(null)}>
          <DialogContent className="soviet-card">
            <DialogHeader>
              <DialogTitle className="text-secondary">Редактировать подразделение</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Название</Label>
                <Input value={editingUnit.name} onChange={(e) => setEditingUnit({ ...editingUnit, name: e.target.value })} className="bg-background" />
              </div>
              <div>
                <Label>Статус</Label>
                <Input value={editingUnit.status} onChange={(e) => setEditingUnit({ ...editingUnit, status: e.target.value })} className="bg-background" />
              </div>
              <div>
                <Label>Иконка</Label>
                <Select value={editingUnit.icon} onValueChange={(value) => setEditingUnit({ ...editingUnit, icon: value })}>
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
              <Button onClick={handleUpdateUnit} className="w-full bg-primary">Сохранить</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isAddUnitOpen} onOpenChange={setIsAddUnitOpen}>
        <DialogContent className="soviet-card">
          <DialogHeader>
            <DialogTitle className="text-secondary">Добавить подразделение</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Название</Label>
              <Input value={newUnit.name} onChange={(e) => setNewUnit({ ...newUnit, name: e.target.value })} className="bg-background" />
            </div>
            <div>
              <Label>Статус</Label>
              <Input value={newUnit.status} onChange={(e) => setNewUnit({ ...newUnit, status: e.target.value })} className="bg-background" />
            </div>
            <div>
              <Label>Иконка</Label>
              <Select value={newUnit.icon} onValueChange={(value) => setNewUnit({ ...newUnit, icon: value })}>
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
            <Button onClick={handleAddUnit} className="w-full bg-primary">Добавить</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Army;
