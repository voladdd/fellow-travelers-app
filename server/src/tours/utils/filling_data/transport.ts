interface Transport {
  name: string;
  description?: string;
}

export const TransportData: Transport[] = [
  { name: 'Яндекс такси', description: 'Будет стоить около 150руб' },
  { name: 'Убер', description: 'Будет стоить около 200руб' },
  { name: 'Ситимобил' },
];
