import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - would connect to backend
    console.log('Login:', { email, password });
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <svg className="w-6 h-6 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to continue to SecureExam</p>
          </div>

          <div className="card-elevated p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-border text-accent focus:ring-accent" />
                  <span className="text-sm text-muted-foreground">Remember me</span>
                </label>
                <a href="#" className="text-sm text-accent hover:underline">
                  Forgot password?
                </a>
              </div>

              <button type="submit" className="btn-accent w-full">
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-accent hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
