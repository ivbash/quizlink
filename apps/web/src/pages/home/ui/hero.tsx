import { Link } from 'react-router';
import { routes } from '@/shared/config/routes';
import { buttonVariants } from '@/shared/ui/button';

export function Hero() {
  return (
    <section className="max-w-160 py-12 sm:py-18 lg:py-24">
      <h1 className="mb-4 text-4xl font-extrabold lg:text-5xl">
        Совместные квизы для современного мира
      </h1>
      <p className="mb-6 text-lg lg:text-xl">
        Мы объединили силу знаний и удобство онлайн-технологий.
        <br />
        Играйте вместе, где бы вы ни находились.
      </p>
      <div className="flex flex-col items-start gap-4 sm:flex-row">
        <Link to={routes.quizzes()} className={buttonVariants()}>
          Начать играть
        </Link>
        <Link
          to={routes.signUp()}
          className={buttonVariants({ variant: 'secondary' })}
        >
          Стать организатором
        </Link>
      </div>
    </section>
  );
}
