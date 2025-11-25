export interface Person {
  id: string;
  name: string;
  role: string;
  description: string;
  avatar?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: 'политика' | 'транспорт' | 'кадры' | 'строительство' | 'культура' | 'технологии';
  date: string;
}

export interface RoleRequest {
  id: string;
  name: string;
  desiredRole: string;
  motivation: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

const initializeData = () => {
  if (!localStorage.getItem('people')) {
    const initialPeople: Person[] = [
      { id: '1', name: 'Сталин', role: 'ГенСек ЦК КПСС', description: 'Генеральный Секретарь Центрального Комитета Коммунистической Партии Советского Союза' },
      { id: '2', name: 'Алексей', role: '1й Зам ГенСека ЦК КПСС', description: 'Первый Заместитель Генерального Секретаря' },
      { id: '3', name: 'Вагнер', role: 'Глава города Люберцы', description: 'Руководитель городского образования Люберцы' },
      { id: '4', name: 'Илья', role: 'Глава Городского Образования "Энгельс"', description: 'Руководитель городского образования Энгельс' },
      { id: '5', name: 'Денис', role: 'Начальник Метрополитена', description: 'Руководитель городского метрополитена' },
      { id: '6', name: 'Даня', role: 'НарКом Армии', description: 'Народный комиссар вооружённых сил' },
      { id: '7', name: 'Блохин', role: 'НарКом ТяжПрома', description: 'Народный комиссар тяжёлой промышленности' },
      { id: '8', name: 'Егор', role: 'Гражданин', description: 'Гражданин СССР' },
      { id: '9', name: 'Седой', role: 'Гражданин', description: 'Гражданин СССР' },
      { id: '10', name: 'Матвей', role: 'Гражданин', description: 'Гражданин СССР' },
      { id: '11', name: 'Беляев', role: 'Гражданин', description: 'Гражданин СССР' },
      { id: '12', name: 'ТВ', role: 'Гражданин', description: 'Гражданин СССР' }
    ];
    localStorage.setItem('people', JSON.stringify(initialPeople));
  }

  if (!localStorage.getItem('news')) {
    const initialNews: NewsItem[] = [
      {
        id: '1',
        title: 'Запуск официального портала государства',
        content: 'Открыт официальный информационный портал ЦК КПСС для граждан и администрации.',
        category: 'технологии',
        date: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Утверждён государственный гимн ЦК КПСС',
        content: 'Центральным Комитетом утверждён официальный гимн государства.',
        category: 'политика',
        date: new Date().toISOString()
      }
    ];
    localStorage.setItem('news', JSON.stringify(initialNews));
  }

  if (!localStorage.getItem('roleRequests')) {
    localStorage.setItem('roleRequests', JSON.stringify([]));
  }

  if (!localStorage.getItem('importantAnnouncement')) {
    localStorage.setItem('importantAnnouncement', 'Добро пожаловать на официальный портал ЦК КПСС! Городской округ Люберцы находится в активной стадии строительства.');
  }

  if (!localStorage.getItem('serverIP')) {
    localStorage.setItem('serverIP', '3PM3511.aternos.me:51574');
  }

  if (!localStorage.getItem('cityNews')) {
    localStorage.setItem('cityNews', JSON.stringify([]));
  }

  if (!localStorage.getItem('cityPhotos')) {
    localStorage.setItem('cityPhotos', JSON.stringify([]));
  }

  if (!localStorage.getItem('constructionStatus')) {
    localStorage.setItem('constructionStatus', 'активно');
  }

  if (!localStorage.getItem('constructionProgress')) {
    localStorage.setItem('constructionProgress', '35');
  }

  if (!localStorage.getItem('constructionStartDate')) {
    localStorage.setItem('constructionStartDate', '2025-01-15');
  }

  if (!localStorage.getItem('metroStations')) {
    localStorage.setItem('metroStations', 'Люберцы');
  }

  if (!localStorage.getItem('metroLines')) {
    localStorage.setItem('metroLines', 'Красная линия');
  }
};

initializeData();

export const getPeople = (): Person[] => {
  return JSON.parse(localStorage.getItem('people') || '[]');
};

export const updatePerson = (person: Person): void => {
  const people = getPeople();
  const index = people.findIndex(p => p.id === person.id);
  if (index !== -1) {
    people[index] = person;
    localStorage.setItem('people', JSON.stringify(people));
  }
};

export const addPerson = (person: Omit<Person, 'id'>): void => {
  const people = getPeople();
  const newPerson = {
    ...person,
    id: Date.now().toString()
  };
  people.push(newPerson);
  localStorage.setItem('people', JSON.stringify(people));
};

export const deletePerson = (id: string): void => {
  const people = getPeople().filter(p => p.id !== id);
  localStorage.setItem('people', JSON.stringify(people));
};

export const getNews = (): NewsItem[] => {
  return JSON.parse(localStorage.getItem('news') || '[]');
};

export const addNews = (news: Omit<NewsItem, 'id' | 'date'>): void => {
  const allNews = getNews();
  const newItem = {
    ...news,
    id: Date.now().toString(),
    date: new Date().toISOString()
  };
  allNews.unshift(newItem);
  localStorage.setItem('news', JSON.stringify(allNews));
};

export const deleteNews = (id: string): void => {
  const news = getNews().filter(n => n.id !== id);
  localStorage.setItem('news', JSON.stringify(news));
};

export const getRoleRequests = (): RoleRequest[] => {
  return JSON.parse(localStorage.getItem('roleRequests') || '[]');
};

export const addRoleRequest = (request: Omit<RoleRequest, 'id' | 'status' | 'date'>): void => {
  const requests = getRoleRequests();
  const newRequest = {
    ...request,
    id: Date.now().toString(),
    status: 'pending' as const,
    date: new Date().toISOString()
  };
  requests.push(newRequest);
  localStorage.setItem('roleRequests', JSON.stringify(requests));
};

export const updateRoleRequest = (id: string, status: 'approved' | 'rejected'): void => {
  const requests = getRoleRequests();
  const index = requests.findIndex(r => r.id === id);
  if (index !== -1) {
    requests[index].status = status;
    localStorage.setItem('roleRequests', JSON.stringify(requests));
  }
};

export const getImportantAnnouncement = (): string => {
  return localStorage.getItem('importantAnnouncement') || '';
};

export const updateImportantAnnouncement = (text: string): void => {
  localStorage.setItem('importantAnnouncement', text);
};

export const getServerIP = (): string => {
  return localStorage.getItem('serverIP') || '';
};

export const updateServerIP = (ip: string): void => {
  localStorage.setItem('serverIP', ip);
};
