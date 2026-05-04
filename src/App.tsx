import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import Industries from "./pages/Industries";
import IndustryDetail from "./pages/IndustryDetail";
import Solutions from "./pages/Solutions";
import SolutionDetail from "./pages/SolutionDetail";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import BookDemo from "./pages/BookDemo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/industries/:slug" element={<IndustryDetail />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/solutions/:slug" element={<SolutionDetail />} />
            <Route path="/community" element={<Community />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book-a-demo" element={<BookDemo />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
