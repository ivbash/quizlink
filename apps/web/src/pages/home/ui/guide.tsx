import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@/shared/ui/item';

const items = [
  {
    title: '1. Создать или найти',
    description:
      'Организатор использует наш редактор, чтобы создать уникальный квиз, или находит готовый в Каталоге.',
  },
  {
    title: '2. Поделиться и подключиться',
    description:
      'Вы делитесь ссылкой (или выводите QR-код), а игроки моментально подключаются к общей сессии.',
  },
  {
    title: '3. Играть вместе!',
    description:
      'Синхронизированные вопросы, таймеры, подсчет баллов в реальном времени и веселье — гарантированы.',
  },
];

export function Guide() {
  return (
    <section>
      <h2 className="mb-8 text-2xl font-bold">
        Запускаем идеальную викторину за три шага:
      </h2>
      <ItemGroup>
        {items.map((item) => (
          <GuideItem key={item.title} item={item} />
        ))}
      </ItemGroup>
    </section>
  );
}

interface GuideItemProps {
  item: {
    title: string;
    description: string;
  };
}

function GuideItem({ item: { title, description } }: GuideItemProps) {
  return (
    <Item variant="muted">
      <ItemContent>
        <ItemTitle className="text-xl font-bold">{title}</ItemTitle>
        <ItemDescription className="text-base">{description}</ItemDescription>
      </ItemContent>
    </Item>
  );
}
