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

export interface ConstructionProject {
  id: string;
  name: string;
  progress: number;
  status: string;
  icon: string;
}

export interface Photo {
  id: string;
  url: string;
  title?: string;
}

export interface CityNewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface ArmyUnit {
  id: string;
  name: string;
  icon: string;
  status: string;
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
    const initialCityNews: CityNewsItem[] = [
      {
        id: '1',
        title: 'Начато строительство жилого квартала №1',
        content: 'Заложен фундамент первого жилого квартала города',
        date: new Date().toISOString()
      }
    ];
    localStorage.setItem('cityNews', JSON.stringify(initialCityNews));
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

  if (!localStorage.getItem('metroDescription')) {
    localStorage.setItem('metroDescription', 'Метрополитен ЦК КПСС находится в стадии активной разработки. Планируется строительство современной транспортной системы.');
  }

  if (!localStorage.getItem('metroPhotos')) {
    localStorage.setItem('metroPhotos', JSON.stringify([]));
  }

  if (!localStorage.getItem('constructionProjects')) {
    const initialProjects: ConstructionProject[] = [
      { id: '1', name: 'Жилой квартал №1 (Люберцы)', progress: 45, status: 'В работе', icon: 'Building2' },
      { id: '2', name: 'Станция метро "Люберцы"', progress: 30, status: 'В работе', icon: 'Train' },
      { id: '3', name: 'Промышленный комплекс', progress: 20, status: 'В работе', icon: 'Factory' },
      { id: '4', name: 'Городская площадь', progress: 60, status: 'В работе', icon: 'Landmark' },
      { id: '5', name: 'Электростанция', progress: 15, status: 'В работе', icon: 'Zap' },
      { id: '6', name: 'Железнодорожная ветка', progress: 25, status: 'В работе', icon: 'Route' }
    ];
    localStorage.setItem('constructionProjects', JSON.stringify(initialProjects));
  }

  if (!localStorage.getItem('constructionPhotos')) {
    localStorage.setItem('constructionPhotos', JSON.stringify([]));
  }

  if (!localStorage.getItem('armyUnits')) {
    const initialUnits: ArmyUnit[] = [
      { id: '1', name: 'Сухопутные войска', icon: 'Users', status: 'Активны' },
      { id: '2', name: 'ПВО', icon: 'Shield', status: 'Готовность' },
      { id: '3', name: 'Инженерные войска', icon: 'HardHat', status: 'Активны' }
    ];
    localStorage.setItem('armyUnits', JSON.stringify(initialUnits));
  }

  if (!localStorage.getItem('armyStats')) {
    localStorage.setItem('armyStats', JSON.stringify({ soldiers: 12, units: 3 }));
  }

  if (!localStorage.getItem('armyDescription')) {
    localStorage.setItem('armyDescription', 'Вооружённые силы ЦК КПСС обеспечивают защиту государства и поддержание порядка на территории.');
  }

  if (!localStorage.getItem('cityDescription')) {
    localStorage.setItem('cityDescription', 'Люберцы — один из ключевых городских округов государства ЦК КПСС, находящийся в активной стадии строительства. Под руководством главы города Вагнера ведётся масштабная застройка жилых кварталов, промышленных объектов и инфраструктуры. Город станет важным экономическим и транспортным узлом.');
  }

  if (!localStorage.getItem('leadershipDescription')) {
    localStorage.setItem('leadershipDescription', 'Центральный Комитет КПСС — высший орган партийной власти, определяющий политический курс государства.');
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

export const getConstructionProjects = (): ConstructionProject[] => {
  return JSON.parse(localStorage.getItem('constructionProjects') || '[]');
};

export const addConstructionProject = (project: Omit<ConstructionProject, 'id'>): void => {
  const projects = getConstructionProjects();
  const newProject = { ...project, id: Date.now().toString() };
  projects.push(newProject);
  localStorage.setItem('constructionProjects', JSON.stringify(projects));
};

export const updateConstructionProject = (project: ConstructionProject): void => {
  const projects = getConstructionProjects();
  const index = projects.findIndex(p => p.id === project.id);
  if (index !== -1) {
    projects[index] = project;
    localStorage.setItem('constructionProjects', JSON.stringify(projects));
  }
};

export const deleteConstructionProject = (id: string): void => {
  const projects = getConstructionProjects().filter(p => p.id !== id);
  localStorage.setItem('constructionProjects', JSON.stringify(projects));
};

export const getConstructionPhotos = (): Photo[] => {
  return JSON.parse(localStorage.getItem('constructionPhotos') || '[]');
};

export const addConstructionPhoto = (photo: Omit<Photo, 'id'>): void => {
  const photos = getConstructionPhotos();
  const newPhoto = { ...photo, id: Date.now().toString() };
  photos.push(newPhoto);
  localStorage.setItem('constructionPhotos', JSON.stringify(photos));
};

export const deleteConstructionPhoto = (id: string): void => {
  const photos = getConstructionPhotos().filter(p => p.id !== id);
  localStorage.setItem('constructionPhotos', JSON.stringify(photos));
};

export const getCityNews = (): CityNewsItem[] => {
  return JSON.parse(localStorage.getItem('cityNews') || '[]');
};

export const addCityNews = (news: Omit<CityNewsItem, 'id' | 'date'>): void => {
  const allNews = getCityNews();
  const newItem = { ...news, id: Date.now().toString(), date: new Date().toISOString() };
  allNews.unshift(newItem);
  localStorage.setItem('cityNews', JSON.stringify(allNews));
};

export const deleteCityNews = (id: string): void => {
  const news = getCityNews().filter(n => n.id !== id);
  localStorage.setItem('cityNews', JSON.stringify(news));
};

export const getCityPhotos = (): Photo[] => {
  return JSON.parse(localStorage.getItem('cityPhotos') || '[]');
};

export const addCityPhoto = (photo: Omit<Photo, 'id'>): void => {
  const photos = getCityPhotos();
  const newPhoto = { ...photo, id: Date.now().toString() };
  photos.push(newPhoto);
  localStorage.setItem('cityPhotos', JSON.stringify(photos));
};

export const deleteCityPhoto = (id: string): void => {
  const photos = getCityPhotos().filter(p => p.id !== id);
  localStorage.setItem('cityPhotos', JSON.stringify(photos));
};

export const getConstructionStatus = (): string => {
  return localStorage.getItem('constructionStatus') || 'активно';
};

export const updateConstructionStatus = (status: string): void => {
  localStorage.setItem('constructionStatus', status);
};

export const getConstructionProgress = (): number => {
  return parseInt(localStorage.getItem('constructionProgress') || '35');
};

export const updateConstructionProgress = (progress: number): void => {
  localStorage.setItem('constructionProgress', progress.toString());
};

export const getConstructionStartDate = (): string => {
  return localStorage.getItem('constructionStartDate') || '2025-01-15';
};

export const updateConstructionStartDate = (date: string): void => {
  localStorage.setItem('constructionStartDate', date);
};

export const getCityDescription = (): string => {
  return localStorage.getItem('cityDescription') || '';
};

export const updateCityDescription = (text: string): void => {
  localStorage.setItem('cityDescription', text);
};

export const getMetroStations = (): string => {
  return localStorage.getItem('metroStations') || '';
};

export const updateMetroStations = (text: string): void => {
  localStorage.setItem('metroStations', text);
};

export const getMetroLines = (): string => {
  return localStorage.getItem('metroLines') || '';
};

export const updateMetroLines = (text: string): void => {
  localStorage.setItem('metroLines', text);
};

export const getMetroDescription = (): string => {
  return localStorage.getItem('metroDescription') || '';
};

export const updateMetroDescription = (text: string): void => {
  localStorage.setItem('metroDescription', text);
};

export const getMetroPhotos = (): Photo[] => {
  return JSON.parse(localStorage.getItem('metroPhotos') || '[]');
};

export const addMetroPhoto = (photo: Omit<Photo, 'id'>): void => {
  const photos = getMetroPhotos();
  const newPhoto = { ...photo, id: Date.now().toString() };
  photos.push(newPhoto);
  localStorage.setItem('metroPhotos', JSON.stringify(photos));
};

export const deleteMetroPhoto = (id: string): void => {
  const photos = getMetroPhotos().filter(p => p.id !== id);
  localStorage.setItem('metroPhotos', JSON.stringify(photos));
};

export const getArmyUnits = (): ArmyUnit[] => {
  return JSON.parse(localStorage.getItem('armyUnits') || '[]');
};

export const addArmyUnit = (unit: Omit<ArmyUnit, 'id'>): void => {
  const units = getArmyUnits();
  const newUnit = { ...unit, id: Date.now().toString() };
  units.push(newUnit);
  localStorage.setItem('armyUnits', JSON.stringify(units));
};

export const updateArmyUnit = (unit: ArmyUnit): void => {
  const units = getArmyUnits();
  const index = units.findIndex(u => u.id === unit.id);
  if (index !== -1) {
    units[index] = unit;
    localStorage.setItem('armyUnits', JSON.stringify(units));
  }
};

export const deleteArmyUnit = (id: string): void => {
  const units = getArmyUnits().filter(u => u.id !== id);
  localStorage.setItem('armyUnits', JSON.stringify(units));
};

export const getArmyStats = (): { soldiers: number; units: number } => {
  return JSON.parse(localStorage.getItem('armyStats') || '{"soldiers":12,"units":3}');
};

export const updateArmyStats = (stats: { soldiers: number; units: number }): void => {
  localStorage.setItem('armyStats', JSON.stringify(stats));
};

export const getArmyDescription = (): string => {
  return localStorage.getItem('armyDescription') || '';
};

export const updateArmyDescription = (text: string): void => {
  localStorage.setItem('armyDescription', text);
};

export const getLeadershipDescription = (): string => {
  return localStorage.getItem('leadershipDescription') || '';
};

export const updateLeadershipDescription = (text: string): void => {
  localStorage.setItem('leadershipDescription', text);
};
