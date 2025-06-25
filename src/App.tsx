
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import UploadTemplate from "./pages/UploadTemplate";
import TemplateDetail from "./pages/TemplateDetail";
import Pricing from "./pages/Pricing";
import Categories from "./pages/Categories";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import About from "./pages/About";
import Blog from "./pages/Blog";
import CreatorInfo from "./pages/CreatorInfo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="w-full">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/upload-template" element={<UploadTemplate />} />
            <Route path="/template/:id" element={<TemplateDetail />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/creator-info" element={<CreatorInfo />} />
            <Route path="/sell" element={<CreatorInfo />} />
            <Route path="/tools" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
