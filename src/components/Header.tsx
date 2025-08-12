import { useState } from "react";
import { Menu, X, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">FitnessHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Inicio
            </Link>
            <Link to="/routines" className="text-foreground hover:text-primary transition-colors">
              Rutinas
            </Link>
            <Link to="/nutrition" className="text-foreground hover:text-primary transition-colors">
              Nutrición
            </Link>
            <Link to="/trainers" className="text-foreground hover:text-primary transition-colors">
              Entrenadores
            </Link>
            <Link to="/progress" className="text-foreground hover:text-primary transition-colors">
              Progreso
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="fitness-outline" size="sm">
              Iniciar Sesión
            </Button>
            <Button variant="hero" size="sm">
              Registrarse
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={toggleMenu}
              >
                Inicio
              </Link>
              <Link 
                to="/routines" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={toggleMenu}
              >
                Rutinas
              </Link>
              <Link 
                to="/nutrition" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={toggleMenu}
              >
                Nutrición
              </Link>
              <Link 
                to="/trainers" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={toggleMenu}
              >
                Entrenadores
              </Link>
              <Link 
                to="/progress" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={toggleMenu}
              >
                Progreso
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="fitness-outline" size="sm">
                  Iniciar Sesión
                </Button>
                <Button variant="hero" size="sm">
                  Registrarse
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}