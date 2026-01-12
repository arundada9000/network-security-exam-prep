import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import Index from "./pages/Index";
import Exams from "./pages/Exams";
import ExamSetup from "./pages/ExamSetup";
import TakeExam from "./pages/TakeExam";
import ExamResults from "./pages/ExamResults";
import Review from "./pages/Review";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Flashcards from "./pages/Flashcards";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/exam/:examId" element={<ExamSetup />} />
            <Route path="/exam/:examId/take" element={<TakeExam />} />
            <Route path="/exam/:examId/results" element={<ExamResults />} />
            <Route path="/exam/:examId/flashcards" element={<Flashcards />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/review" element={<Review />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
