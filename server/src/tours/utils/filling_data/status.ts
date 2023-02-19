interface Status {
  name: string;
  description?: string;
}

export const StatusData: Status[] = [
  { name: 'Открыт', description: 'Набор открыт, присоединяйтесь!' },
  { name: 'Закрыт', description: 'Набор закрыт.' },
  { name: 'Завершен', description: 'Поездка завершена!' },
];
