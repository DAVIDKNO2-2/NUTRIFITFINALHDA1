import { Star, MapPin, Calendar, Users, Award, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const trainers = [
  {
    id: 1,
    name: "Carlos Ruiz",
    specialty: "Entrenamiento de Fuerza",
    experience: "8 años",
    rating: 4.9,
    reviews: 156,
    clients: 45,
    location: "Sala Principal",
    image: "/placeholder-trainer-1.jpg",
    certifications: ["NASM-CPT", "Crossfit Level 2", "Nutrición Deportiva"],
    bio: "Especialista en desarrollo de fuerza y masa muscular con más de 8 años de experiencia.",
    specialties: ["Powerlifting", "Hipertrofia", "Rehabilitación"],
    availability: ["Lunes-Viernes 6:00-14:00", "Sábados 8:00-12:00"]
  },
  {
    id: 2,
    name: "Ana García",
    specialty: "Cardio y HIIT",
    experience: "6 años",
    rating: 4.8,
    reviews: 203,
    clients: 62,
    location: "Zona Cardio",
    image: "/placeholder-trainer-2.jpg",
    certifications: ["ACE-CPT", "HIIT Specialist", "Yoga Instructor"],
    bio: "Experta en entrenamiento cardiovascular y programas de pérdida de peso.",
    specialties: ["HIIT", "Cardio", "Pérdida de peso"],
    availability: ["Lunes-Viernes 14:00-22:00", "Domingos 9:00-13:00"]
  },
  {
    id: 3,
    name: "María López",
    specialty: "Yoga y Flexibilidad",
    experience: "10 años",
    rating: 4.9,
    reviews: 189,
    clients: 38,
    location: "Sala de Yoga",
    image: "/placeholder-trainer-3.jpg",
    certifications: ["RYT-500", "Yin Yoga", "Meditación Mindfulness"],
    bio: "Instructora certificada de yoga con enfoque en bienestar integral y mindfulness.",
    specialties: ["Hatha Yoga", "Vinyasa", "Meditación"],
    availability: ["Martes-Sábado 7:00-15:00"]
  },
  {
    id: 4,
    name: "Roberto Silva",
    specialty: "Entrenamiento Funcional",
    experience: "7 años",
    rating: 4.7,
    reviews: 134,
    clients: 41,
    location: "Área Funcional",
    image: "/placeholder-trainer-4.jpg",
    certifications: ["FMS", "TRX Instructor", "Kettlebell Specialist"],
    bio: "Entrenador funcional especializado en movimientos naturales y prevención de lesiones.",
    specialties: ["Entrenamiento Funcional", "Movilidad", "Atletismo"],
    availability: ["Lunes-Viernes 16:00-21:00"]
  }
];

export default function Trainers() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nuestros Entrenadores
          </h1>
          <p className="text-lg text-muted-foreground">
            Conoce a nuestro equipo de entrenadores certificados y encuentra el perfecto para tus objetivos
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button variant="hero" size="sm">Todos</Button>
          <Button variant="fitness-outline" size="sm">Fuerza</Button>
          <Button variant="fitness-outline" size="sm">Cardio</Button>
          <Button variant="fitness-outline" size="sm">Yoga</Button>
          <Button variant="fitness-outline" size="sm">Funcional</Button>
          <Button variant="fitness-outline" size="sm">Nutrición</Button>
        </div>

        {/* Trainers Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {trainers.map((trainer) => (
            <Card key={trainer.id} className="overflow-hidden hover:shadow-card transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Trainer Image & Basic Info */}
                  <div className="flex-shrink-0">
                    <Avatar className="w-24 h-24 mx-auto md:mx-0">
                      <AvatarImage src={trainer.image} alt={trainer.name} />
                      <AvatarFallback className="bg-gradient-orange text-white text-xl font-bold">
                        {trainer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center md:text-left mt-3">
                      <div className="flex items-center justify-center md:justify-start gap-1 mb-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium text-foreground">{trainer.rating}</span>
                        <span className="text-sm text-muted-foreground">({trainer.reviews})</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {trainer.location}
                      </div>
                    </div>
                  </div>

                  {/* Trainer Details */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{trainer.name}</h3>
                      <p className="text-primary font-medium mb-2">{trainer.specialty}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{trainer.bio}</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="font-bold text-foreground">{trainer.experience}</div>
                        <div className="text-xs text-muted-foreground">Experiencia</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="font-bold text-foreground">{trainer.clients}</div>
                        <div className="text-xs text-muted-foreground">Clientes</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="font-bold text-foreground">{trainer.reviews}</div>
                        <div className="text-xs text-muted-foreground">Reseñas</div>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Especialidades:</h4>
                      <div className="flex flex-wrap gap-1">
                        {trainer.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Certificaciones:</h4>
                      <div className="flex flex-wrap gap-1">
                        {trainer.certifications.map((cert, index) => (
                          <Badge key={index} className="text-xs bg-primary/10 text-primary border-primary/20">
                            <Award className="h-3 w-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Availability */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Disponibilidad:</h4>
                      <div className="space-y-1">
                        {trainer.availability.map((time, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {time}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                      <Button variant="hero" className="flex-1">
                        <Users className="h-4 w-4 mr-2" />
                        Agendar Sesión
                      </Button>
                      <Button variant="fitness-outline" className="flex-1">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contactar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="mt-12 bg-gradient-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">¿No encuentras el entrenador perfecto?</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Nuestro equipo te ayudará a encontrar el entrenador ideal según tus objetivos y preferencias.
            </p>
            <Button variant="hero" size="lg">
              Solicitar Consulta Gratuita
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}