import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background animated-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md glow-card animate-fade-in">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold text-foreground mb-2">
            404
          </CardTitle>
          <CardDescription className="text-lg">
            Página no encontrada
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6">
            La página que buscas no existe o ha sido movida.
          </p>
          <Button 
            asChild 
            className="bg-gradient-primary text-primary-foreground glow-button"
          >
            <a href="/">
              <Home className="w-4 h-4 mr-2" />
              Volver al Dashboard
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
