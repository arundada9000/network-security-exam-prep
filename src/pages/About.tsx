import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero */}
        <section className="gradient-hero text-primary-foreground py-16 lg:py-24">
          <div className="section-container text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">About SecureExam</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Empowering cybersecurity professionals with comprehensive exam preparation tools.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                SecureExam was created to help IT professionals and students master network security concepts 
                through practice and repetition. We believe that the best way to prepare for certification 
                exams is through active learning with immediate feedback.
              </p>
              <p className="text-muted-foreground mb-6">
                Our platform offers a variety of question types including multiple choice, multi-select, 
                and fill-in-the-blank questions to comprehensively test your knowledge across different 
                security domains.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-muted">
          <div className="section-container">
            <h2 className="text-2xl font-bold text-foreground text-center mb-12">What We Offer</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Practice Mode',
                  description: 'Learn at your own pace with instant feedback after each question.',
                },
                {
                  title: 'Test Mode',
                  description: 'Simulate real exam conditions with timed assessments.',
                },
                {
                  title: 'Progress Tracking',
                  description: 'Monitor your improvement over time with detailed analytics.',
                },
                {
                  title: 'Expert Content',
                  description: 'Questions crafted by industry professionals and educators.',
                },
                {
                  title: 'Mobile Ready',
                  description: 'Study anywhere with our fully responsive design.',
                },
                {
                  title: 'Regular Updates',
                  description: 'Content updated regularly to match current exam objectives.',
                },
              ].map((item) => (
                <div key={item.title} className="card-elevated p-6">
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
