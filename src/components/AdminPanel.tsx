import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { login, isAuthenticated } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

const AdminPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const isAdmin = isAuthenticated();

  const handleLogin = () => {
    if (login(username, password)) {
      toast({
        title: 'Успешная авторизация',
        description: 'Добро пожаловать, товарищ администратор!'
      });
      setIsOpen(false);
      setUsername('');
      setPassword('');
      window.location.reload();
    } else {
      toast({
        title: 'Ошибка авторизации',
        description: 'Неверные учётные данные',
        variant: 'destructive'
      });
    }
  };

  if (isAdmin) {
    return null;
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="border-secondary text-secondary hover:bg-secondary hover:text-black admin-badge"
      >
        <Icon name="ShieldCheck" className="mr-2" size={16} />
        Вход для администраторов
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="soviet-card">
          <DialogHeader>
            <DialogTitle className="text-secondary flex items-center gap-2">
              <Icon name="Shield" size={24} />
              Панель администратора
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="username">Логин</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-background border-border"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background border-border"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button
              onClick={handleLogin}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Войти
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminPanel;
