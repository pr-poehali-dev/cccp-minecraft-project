
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Structure from "./pages/Structure";
import Leadership from "./pages/Leadership";
import Army from "./pages/Army";
import News from "./pages/News";
import Lubertsy from "./pages/Lubertsy";
import Metro from "./pages/Metro";
import Construction from "./pages/Construction";
import RequestRole from "./pages/RequestRole";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/structure" element={<Structure />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/army" element={<Army />} />
          <Route path="/news" element={<News />} />
          <Route path="/lubertsy" element={<Lubertsy />} />
          <Route path="/metro" element={<Metro />} />
          <Route path="/construction" element={<Construction />} />
          <Route path="/request-role" element={<RequestRole />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;