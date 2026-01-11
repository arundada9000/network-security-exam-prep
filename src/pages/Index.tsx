import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ExamCard from '@/components/ExamCard';
import { exams } from '@/data/examData';

export default function Index() {
  const featuredExams = exams.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="gradient-hero text-primary-foreground py-20 lg:py-28">
        <div className="section-container">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground mb-6 text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Network Security Certification
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Master Network Security with Confidence
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl">
              Prepare for your certification exams with our comprehensive practice tests. 
              Get instant feedback, detailed explanations, and track your progress.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/exams" className="btn-accent">
                Take an Exam
              </Link>
              <Link to="/about" className="btn-outline border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-b border-border">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Questions' },
              { value: '10+', label: 'Exam Topics' },
              { value: '95%', label: 'Pass Rate' },
              { value: '24/7', label: 'Access' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Exams */}
      <section className="py-16 lg:py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Exams</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our collection of carefully crafted exams covering essential network security topics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredExams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/exams" className="btn-secondary">
              View All Exams
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-20 bg-muted">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose SecureExam?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform is designed to help you succeed in your network security certification journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Practice Mode',
                description: 'Get instant feedback after each question with detailed explanations.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Test Mode',
                description: 'Simulate real exam conditions with timed tests and end-of-exam results.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: 'Track Progress',
                description: 'Review your past results and track improvement over time.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ),
                title: 'Randomization',
                description: 'Questions are randomized to help reinforce your understanding.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: 'Detailed Explanations',
                description: 'Learn why each answer is correct or incorrect with in-depth explanations.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Mobile Friendly',
                description: 'Study anywhere with our fully responsive mobile experience.',
              },
            ].map((feature) => (
              <div key={feature.title} className="card-elevated p-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20">
        <div className="section-container">
          <div className="gradient-hero rounded-2xl p-8 lg:p-12 text-center text-primary-foreground">
            <h2 className="text-3xl font-bold mb-4">Ready to Test Your Knowledge?</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Start practicing today and boost your confidence for your network security certification exam.
            </p>
            <Link to="/exams" className="btn-accent inline-block">
              Start Your First Exam
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
