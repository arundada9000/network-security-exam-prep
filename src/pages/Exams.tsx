import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ExamCard from '@/components/ExamCard';
import { exams } from '@/data/examData';

export default function Exams() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="section-container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">All Exams</h1>
            <p className="text-muted-foreground">
              Browse our complete collection of network security practice exams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
