import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { isAuthenticated, logout } from '@/lib/auth';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isAdmin = isAuthenticated();

  const navigation = [
    { name: 'Главная', path: '/', icon: 'Home' },
    { name: 'Структура власти', path: '/structure', icon: 'Users' },
    { name: 'Руководство', path: '/leadership', icon: 'Crown' },
    { name: 'Армия', path: '/army', icon: 'Shield' },
    { name: 'Новости', path: '/news', icon: 'Newspaper' },
    { name: 'Люберцы', path: '/lubertsy', icon: 'Building2' },
    { name: 'Метрополитен', path: '/metro', icon: 'Train' },
    { name: 'Строительство', path: '/construction', icon: 'HardHat' },
    { name: 'Запрос роли', path: '/request-role', icon: 'FileText' }
  ];

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-4 border-primary bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary flex items-center justify-center soviet-star">
                <span className="text-secondary text-2xl">☭</span>
              </div>
              <div>
                <h1 className="text-2xl text-secondary">ЦК КПСС</h1>
                <p className="text-xs text-muted-foreground">Официальный портал государства</p>
              </div>
            </div>
            {isAdmin && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Icon name="LogOut" className="mr-2" size={16} />
                Выход
              </Button>
            )}
          </div>
          
          <nav className="flex flex-wrap gap-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? 'default' : 'outline'}
                    size="sm"
                    className={isActive 
                      ? 'bg-primary text-white border-primary' 
                      : 'border-border text-foreground hover:bg-primary/20 hover:text-primary'
                    }
                  >
                    <Icon name={item.icon as any} className="mr-2" size={16} />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t-4 border-primary bg-card mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-muted-foreground text-sm">
            <p>© 2025 Центральный Комитет Коммунистической Партии Советского Союза</p>
            <p className="mt-2">Пролетарии всех стран, соединяйтесь!</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
