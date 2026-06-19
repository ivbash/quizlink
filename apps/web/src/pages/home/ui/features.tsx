import { GlobeIcon, SearchIcon, WrenchIcon } from 'lucide-react';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from '@/shared/ui/item';

const features = [
  {
    image: <GlobeIcon className="size-24" />,
    title: 'Совместная игра в реальном времени',
    description:
      'Отслеживайте прогресс всех участников, следите за лидером прямо во время игры.',
  },
  {
    image: <WrenchIcon className="size-24" />,
    title: 'Мощный редактор контента',
    description:
      'Вам не нужен программист! Создайте викторину от А до Я: вопросы, ответы, баллы и таймеры.',
  },
  {
    image: <SearchIcon className="size-24" />,
    title: 'Умный каталог',
    description:
      'Найдите идеальный квиз по любой теме — от истории Древнего Рима до киберспорта 90-х. Фильтрация и поиск по тегам работают моментально.',
  },
];

export function Features() {
  return (
    <section>
      <h2 className="mb-8 text-2xl font-bold">
        Почему QuizLink – лучшее место для викторин?
      </h2>
      <ItemGroup className="items-center justify-center sm:flex-row sm:flex-wrap sm:items-stretch">
        {features.map((feature) => (
          <Feature key={feature.title} feature={feature} />
        ))}
      </ItemGroup>
    </section>
  );
}

interface FeatureProps {
  feature: {
    image: React.ReactNode;
    title: string;
    description: string;
  };
}

export function Feature({
  feature: { image, title, description },
}: FeatureProps) {
  return (
    <Item
      variant="muted"
      className="max-w-md min-w-64 flex-1 flex-col flex-nowrap"
    >
      <ItemHeader className="basis-auto justify-center text-muted-foreground">
        {image}
      </ItemHeader>
      <ItemContent className="items-center">
        <ItemTitle className="line-clamp-none text-center text-xl font-bold">
          {title}
        </ItemTitle>
        <ItemDescription className="line-clamp-none text-center text-base">
          {description}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}
