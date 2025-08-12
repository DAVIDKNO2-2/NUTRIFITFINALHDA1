import { Target, Users, Heart, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Target,
    title: "Entrenador Personal",
    description: "Entrenadores expertos que te guían hacia tus objetivos específicos"
  },
  {
    icon: Heart,
    title: "Programas de Cardio",
    description: "Rutinas cardiovasculares diseñadas para mejorar tu resistencia"
  },
  {
    icon: Dumbbell,
    title: "Equipos de Calidad",
    description: "Máquinas y equipos de última generación para entrenamientos efectivos"
  },
  {
    icon: Zap,
    title: "Nutrición Saludable",
    description: "Planes nutricionales balanceados para complementar tu entrenamiento"
  }
];

function Dumbbell({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14.4 14.4 9.6 9.6"/>
      <path d="m21 21-5-5"/>
      <path d="m14 8 4 4"/>
      <path d="m3 3 5 5"/>
      <path d="m14 14 4 4"/>
      <path d="m10 10-4-4"/>
    </svg>
  );
}

export function AboutSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-primary mb-2 tracking-wider uppercase">
                Quiénes Somos
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                Construir fitness es construir tu{" "}
                <span className="text-primary">cuerpo y confianza</span>
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nuestro objetivo es proporcionar un ambiente de entrenamiento excepcional 
                donde cada miembro pueda alcanzar sus metas de fitness. Con equipos de 
                última generación y entrenadores certificados, estamos comprometidos 
                con tu éxito.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="hero" size="lg">
              Conoce Nuestros Servicios
            </Button>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <Card className="p-8 bg-gradient-card shadow-card">
              <CardContent className="text-center">
                <div className="w-20 h-20 bg-gradient-orange rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-4">
                  +1000 Clientes Satisfechos
                </h4>
                <p className="text-muted-foreground mb-6">
                  Únete a nuestra comunidad de personas comprometidas con 
                  un estilo de vida saludable y activo.
                </p>
                <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
                  <div className="text-center">
                    <div className="font-bold text-primary text-lg">98%</div>
                    <div>Satisfacción</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-primary text-lg">24/7</div>
                    <div>Acceso</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-primary text-lg">15+</div>
                    <div>Programas</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating decoration */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary/10 rounded-full blur-lg animate-float"></div>
          </div>
        </div>
      </div>
    </section>
  );
}