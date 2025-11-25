import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import AdminPanel from '@/components/AdminPanel';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { isAuthenticated } from '@/lib/auth';
import { getRoleRequests, addRoleRequest, updateRoleRequest, RoleRequest } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const roles = [
  'Машинист метро',
  'Строитель метрополитена',
  'Диспетчер железнодорожный',
  'Проводник поезда',
  'Механик подвижного состава',
  'Путевой рабочий',
  'Электромеханик СЦБ',
  'Фермер',
  'Строитель',
  'Инженер',
  'Врач',
  'Учитель'
];

const RequestRole = () => {
  const isAdmin = isAuthenticated();
  const [requests, setRequests] = useState<RoleRequest[]>([]);
  const [name, setName] = useState('');
  const [desiredRole, setDesiredRole] = useState('');
  const [motivation, setMotivation] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    setRequests(getRoleRequests());
  }, []);

  const handleSubmit = () => {
    if (name && desiredRole && motivation) {
      addRoleRequest({ name, desiredRole, motivation });
      setRequests(getRoleRequests());
      setName('');
      setDesiredRole('');
      setMotivation('');
      toast({
        title: 'Заявка отправлена',
        description: 'Ваша заявка на роль будет рассмотрена администрацией'
      });
    }
  };

  const handleUpdateStatus = (id: string, status: 'approved' | 'rejected') => {
    updateRoleRequest(id, status);
    setRequests(getRoleRequests());
    toast({
      title: status === 'approved' ? 'Заявка одобрена' : 'Заявка отклонена',
      description: 'Статус заявки обновлён'
    });
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const approvedRequests = requests.filter(r => r.status === 'approved');
  const rejectedRequests = requests.filter(r => r.status === 'rejected');

  const RequestCard = ({ request }: { request: RoleRequest }) => (
    <Card className="soviet-card p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-lg text-secondary">{request.name}</h3>
          <p className="text-sm text-primary">{request.desiredRole}</p>
        </div>
        <Badge
          className={
            request.status === 'approved'
              ? 'bg-green-600'
              : request.status === 'rejected'
              ? 'bg-destructive'
              : 'bg-secondary'
          }
        >
          {request.status === 'pending' && 'На рассмотрении'}
          {request.status === 'approved' && 'Одобрено'}
          {request.status === 'rejected' && 'Отклонено'}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-2">
        {new Date(request.date).toLocaleDateString('ru-RU', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </p>
      <p className="text-sm leading-relaxed mb-3">{request.motivation}</p>
      {isAdmin && request.status === 'pending' && (
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => handleUpdateStatus(request.id, 'approved')}
            className="bg-green-600 hover:bg-green-700"
          >
            <Icon name="Check" size={16} className="mr-1" />
            Одобрить
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleUpdateStatus(request.id, 'rejected')}
            className="border-destructive text-destructive"
          >
            <Icon name="X" size={16} className="mr-1" />
            Отклонить
          </Button>
        </div>
      )}
    </Card>
  );

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Icon name="FileText" className="text-secondary" size={32} />
            <h1 className="text-3xl font-bold">Запрос роли</h1>
          </div>
          <AdminPanel />
        </div>

        {!isAdmin && (
          <Card className="soviet-card p-6">
            <h2 className="text-2xl font-bold mb-4 text-secondary">Подать заявку на роль</h2>
            <div className="space-y-4">
              <div>
                <Label>Ваше имя</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-background"
                  placeholder="Введите ваше игровое имя"
                />
              </div>
              <div>
                <Label>Желаемая роль</Label>
                <Select value={desiredRole} onValueChange={setDesiredRole}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Выберите роль" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Мотивация</Label>
                <Textarea
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  className="bg-background min-h-32"
                  placeholder="Расскажите, почему вы хотите получить эту роль и как будете выполнять обязанности"
                  rows={5}
                />
              </div>
              <Button onClick={handleSubmit} className="w-full bg-primary">
                <Icon name="Send" size={18} className="mr-2" />
                Отправить заявку
              </Button>
            </div>
          </Card>
        )}

        {isAdmin && (
          <Tabs defaultValue="pending" className="space-y-4">
            <TabsList className="bg-card">
              <TabsTrigger value="pending">
                На рассмотрении ({pendingRequests.length})
              </TabsTrigger>
              <TabsTrigger value="approved">
                Одобрено ({approvedRequests.length})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Отклонено ({rejectedRequests.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {pendingRequests.length > 0 ? (
                pendingRequests.map(req => <RequestCard key={req.id} request={req} />)
              ) : (
                <Card className="soviet-card p-12 text-center">
                  <Icon name="Inbox" className="text-muted-foreground mx-auto mb-4" size={48} />
                  <p className="text-muted-foreground">Нет заявок на рассмотрении</p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="approved" className="space-y-4">
              {approvedRequests.length > 0 ? (
                approvedRequests.map(req => <RequestCard key={req.id} request={req} />)
              ) : (
                <Card className="soviet-card p-12 text-center">
                  <Icon name="Inbox" className="text-muted-foreground mx-auto mb-4" size={48} />
                  <p className="text-muted-foreground">Нет одобренных заявок</p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="rejected" className="space-y-4">
              {rejectedRequests.length > 0 ? (
                rejectedRequests.map(req => <RequestCard key={req.id} request={req} />)
              ) : (
                <Card className="soviet-card p-12 text-center">
                  <Icon name="Inbox" className="text-muted-foreground mx-auto mb-4" size={48} />
                  <p className="text-muted-foreground">Нет отклонённых заявок</p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        )}

        <Card className="soviet-card p-6">
          <h2 className="text-xl font-bold mb-4 text-secondary">Доступные роли</h2>
          <div className="grid md:grid-cols-3 gap-3">
            {roles.map(role => (
              <div
                key={role}
                className="bg-background p-3 rounded border border-border flex items-center gap-2"
              >
                <Icon name="Briefcase" className="text-primary" size={20} />
                <span className="text-sm">{role}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default RequestRole;
