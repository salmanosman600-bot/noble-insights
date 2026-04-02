import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import SurahIndex from "./pages/SurahIndex";
import QuranReader from "./pages/QuranReader";
import Translations from "./pages/Translations";
import Tafsir from "./pages/Tafsir";
import Audio from "./pages/Audio";
import Topics from "./pages/Topics";
import Articles from "./pages/Articles";
import SearchPage from "./pages/SearchPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/surahs" element={<SurahIndex />} />
          <Route path="/quran" element={<QuranReader />} />
          <Route path="/translations" element={<Translations />} />
          <Route path="/tafsir" element={<Tafsir />} />
          <Route path="/audio" element={<Audio />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:topicId" element={<Topics />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
