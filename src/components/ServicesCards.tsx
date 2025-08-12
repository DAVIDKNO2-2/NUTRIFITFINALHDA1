import { Users, Award, Dumbbell, Apple } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import personalTrainingImage from "@/assets/personal-training.jpg";
import fitnessClassImage from "@/assets/fitness-class.jpg";
import nutritionImage from "@/assets/nutrition-plan.jpg";

const services = [
  {
    icon: Users,
    title: "Entrenamiento Personal",
    description: "Sesiones uno a uno con entrenadores certificados para máximos resultados",
    image: personalTrainingImage,
    features: ["Planes personalizados", "Seguimiento de progreso", "Entrenadores certificados"]
  },
  {
    icon: Dumbbell,
    title: "Clases Grupales",
    description: "Entrena en grupo con clases dinámicas y motivantes para todos los niveles",
    image: fitnessClassImage,
    features: ["Variedad de clases", "Ambiente motivador", "Todos los niveles"]
  },
  {
    icon: Apple,
    title: "Planes Nutricionales",
    description: "Planes de alimentación personalizados para complementar tu entrenamiento",
    image: nutritionImage,
    features: ["Planes personalizados", "Seguimiento nutricional", "Recetas saludables"]
  }
];

export function ServicesCards() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ofrecemos una amplia gama de servicios diseñados para ayudarte a alcanzar 
            tus objetivos de fitness y bienestar.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-card transition-all duration-300 overflow-hidden border-0 bg-gradient-card">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <Award className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button variant="fitness-outline" className="w-full">
                  Saber Más
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}