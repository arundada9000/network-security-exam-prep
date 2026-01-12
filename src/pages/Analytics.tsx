import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CircularProgress from '@/components/CircularProgress';
import Badge, { badges } from '@/components/Badge';
import StreakCounter from '@/components/StreakCounter';
import XPBar from '@/components/XPBar';
import Leaderboard from '@/components/Leaderboard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const performanceData = [
  { date: 'Jan 1', score: 65 },
  { date: 'Jan 5', score: 72 },
  { date: 'Jan 8', score: 68 },
  { date: 'Jan 12', score: 80 },
  { date: 'Jan 15', score: 75 },
  { date: 'Jan 18', score: 85 },
  { date: 'Jan 22', score: 88 },
];

const categoryData = [
  { name: 'Network Security', score: 85, exams: 5 },
  { name: 'Cryptography', score: 72, exams: 3 },
  { name: 'Protocols', score: 78, exams: 4 },
  { name: 'Firewalls', score: 90, exams: 2 },
  { name: 'Authentication', score: 65, exams: 1 },
];

const questionTypeData = [
  { name: 'Single Choice', value: 45, color: 'hsl(180, 70%, 40%)' },
  { name: 'Multi Choice', value: 35, color: 'hsl(142, 76%, 36%)' },
  { name: 'Fill Blank', value: 20, color: 'hsl(38, 92%, 50%)' },
];

const weeklyActivity = [
  { day: 'Mon', minutes: 25 },
  { day: 'Tue', minutes: 45 },
  { day: 'Wed', minutes: 30 },
  { day: 'Thu', minutes: 60 },
  { day: 'Fri', minutes: 40 },
  { day: 'Sat', minutes: 55 },
  { day: 'Sun', minutes: 20 },
];

export default function Analytics() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-8">
        <div className="section-container">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
              <p className="text-muted-foreground">Track your learning progress and achievements</p>
            </div>
            <div className="flex items-center gap-4">
              <StreakCounter streak={7} />
            </div>
          </div>

          {/* XP Bar */}
          <div className="card-glass p-6 mb-8">
            <XPBar currentXP={8500} levelXP={10000} level={17} />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="card-glass p-6 text-center">
              <CircularProgress value={82} size={80} labelSize="text-lg" />
              <div className="text-sm text-muted-foreground mt-2">Avg Score</div>
            </div>
            <div className="card-glass p-6 text-center">
              <div className="text-4xl font-bold text-accent">15</div>
              <div className="text-sm text-muted-foreground">Exams Taken</div>
            </div>
            <div className="card-glass p-6 text-center">
              <div className="text-4xl font-bold text-success">127</div>
              <div className="text-sm text-muted-foreground">Questions Solved</div>
            </div>
            <div className="card-glass p-6 text-center">
              <div className="text-4xl font-bold text-warning">4.5h</div>
              <div className="text-sm text-muted-foreground">Study Time</div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Performance Over Time */}
            <div className="card-glass p-6">
              <h3 className="font-bold text-lg text-foreground mb-4">Score Trend</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="hsl(180, 70%, 40%)" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(180, 70%, 40%)', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Weekly Activity */}
            <div className="card-glass p-6">
              <h3 className="font-bold text-lg text-foreground mb-4">Weekly Activity</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => [`${value} min`, 'Study Time']}
                  />
                  <Bar 
                    dataKey="minutes" 
                    fill="hsl(180, 70%, 40%)" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Category Performance */}
            <div className="card-glass p-6">
              <h3 className="font-bold text-lg text-foreground mb-4">Performance by Category</h3>
              <div className="space-y-4">
                {categoryData.map((cat) => (
                  <div key={cat.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-foreground">{cat.name}</span>
                      <span className="text-sm text-muted-foreground">{cat.score}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          cat.score >= 80 ? 'bg-success' : cat.score >= 60 ? 'bg-warning' : 'bg-destructive'
                        }`}
                        style={{ width: `${cat.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Question Type Distribution */}
            <div className="card-glass p-6">
              <h3 className="font-bold text-lg text-foreground mb-4">Question Types Practiced</h3>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={questionTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {questionTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value) => [`${value}%`, '']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {questionTypeData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Badges Section */}
          <div className="card-glass p-6 mb-8">
            <h3 className="font-bold text-lg text-foreground mb-6">Achievements</h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {badges.map((badge) => (
                <Badge key={badge.id} badge={badge} size="md" />
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Leaderboard />
            
            {/* Weak Areas */}
            <div className="card-glass p-6">
              <h3 className="font-bold text-lg text-foreground mb-4">🎯 Focus Areas</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Topics that need more practice based on your performance
              </p>
              <div className="space-y-3">
                {[
                  { topic: 'VPN Configuration', accuracy: 45, questions: 8 },
                  { topic: 'Hash Functions', accuracy: 52, questions: 5 },
                  { topic: 'Port Numbers', accuracy: 60, questions: 12 },
                ].map((area) => (
                  <div key={area.topic} className="flex items-center justify-between p-3 rounded-xl bg-destructive/5 border border-destructive/20">
                    <div>
                      <div className="font-medium text-foreground">{area.topic}</div>
                      <div className="text-xs text-muted-foreground">{area.questions} questions attempted</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-destructive">{area.accuracy}%</div>
                      <div className="text-xs text-muted-foreground">accuracy</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/exams" className="btn-accent w-full text-center mt-4 block">
                Practice Weak Areas
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
