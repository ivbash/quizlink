import { quizzes } from '../model/quizzes';
import { Filters } from './filters';
import { QuizCard } from './quiz-card';
import { QuizPagination } from './quiz-pagination';
import { QuizzesHeader } from './quizzes-header';

export function CatalogPage() {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-6">
      <div className="lg:w-64">
        <Filters className="sticky top-4" />
      </div>
      <div className="@container grow space-y-8">
        <QuizzesHeader />
        <div className="grid grid-cols-1 gap-4 @lg:grid-cols-2 @3xl:grid-cols-3">
          {quizzes.map((quiz, i) => (
            // eslint-disable-next-line react-x/no-array-index-key
            <QuizCard key={i} quiz={quiz} />
          ))}
        </div>
        <QuizPagination />
      </div>
    </div>
  );
}
