import QuizGravidez from '@/components/funnel/QuizGravidez';
import QuizTrimestre from '@/components/funnel/QuizTrimestre';

export default function QuizPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#D9A8B6] to-background p-4 gap-8">
      <QuizTrimestre />
      <QuizGravidez />
    </main>
  );
}
