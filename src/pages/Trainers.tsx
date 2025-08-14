import { useState, useEffect } from 'react';
import { Star, MapPin, Calendar, Users, Award, MessageCircle, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Trainers = () => {
  // Estado para almacenar los datos de los entrenadores
  const [trainers, setTrainers] = useState([]);
  // Estado para manejar el estado de carga
  const [loading, setLoading] = useState(true);
  // Estado para manejar los errores de la API
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función asincrónica para obtener los datos de la API
    const fetchTrainers = async () => {
      try {
        const response = await fetch('http://localhost:3010/api/entrenadortodos');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTrainers(data);
      } catch (err) {
        console.error("Failed to fetch trainers:", err);
        setError("Error al cargar los datos de los entrenadores. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  // Renderizado condicional
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Cargando entrenadores...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

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
                      {/* Usamos el campo 'fotoPerfil' de la API. Si no existe, usamos un placeholder */}
                      <AvatarImage src={trainer.fotoPerfil || `https://placehold.co/96x96/E5E7EB/4B5563?text=${trainer.nombreCompleto.split(' ').map(n => n[0]).join('')}`} alt={trainer.nombreCompleto} />
                      <AvatarFallback className="bg-gradient-orange text-white text-xl font-bold">
                        {trainer.nombreCompleto.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center md:text-left mt-3">
                      {/* Rating y Reseñas no están en la API, se usan valores estáticos */}
                      <div className="flex items-center justify-center md:justify-start gap-1 mb-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium text-foreground">4.8</span>
                        <span className="text-sm text-muted-foreground">(203)</span>
                      </div>
                      {/* Usamos el campo 'ciudad' y 'pais' de la API */}
                      <div className="flex items-center justify-center md:justify-start gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {trainer.ciudad && trainer.pais ? `${trainer.ciudad}, ${trainer.pais}` : trainer.ciudad || trainer.pais || "No especificado"}
                      </div>
                    </div>
                  </div>

                  {/* Trainer Details */}
                  <div className="flex-1 space-y-4">
                    <div>
                      {/* Usamos el campo 'nombreCompleto' de la API */}
                      <h3 className="text-xl font-bold text-foreground mb-1">{trainer.nombreCompleto}</h3>
                      {/* Usamos el primer valor de 'especialidades' para la especialidad principal */}
                      <p className="text-primary font-medium mb-2">{trainer.especialidades?.split(',')[0] || "Entrenador Personal"}</p>
                      {/* Usamos el campo 'biografia' de la API */}
                      <p className="text-sm text-muted-foreground leading-relaxed">{trainer.biografia || "Sin biografía disponible."}</p>
                    </div>

                    {/* Estadísticas - Adaptadas a los datos disponibles */}
               

                    {/* Especialidades */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Especialidades:</h4>
                      <div className="flex flex-wrap gap-1">
                        {/* Usamos el campo 'especialidades' de la API, separando por comas */}
                        {trainer.especialidades && trainer.especialidades.split(',').map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty.trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Certificaciones */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Certificaciones:</h4>
                      <div className="flex flex-wrap gap-1">
                        {/* Usamos el campo 'certificaciones' de la API, separando por comas */}
                        {trainer.certificaciones && trainer.certificaciones.split(',').map((cert, index) => (
                          <Badge key={index} className="text-xs bg-primary/10 text-primary border-primary/20">
                            <Award className="h-3 w-3 mr-1" />
                            {cert.trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Nivel Académico */}
                    <div>
                        <h4 className="font-medium text-foreground mb-2">Nivel Académico:</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <GraduationCap className="h-4 w-4" />
                            {trainer.nivelAcademico || "No especificado"}
                        </div>
                    </div>

                    {/* Disponibilidad - No en la API, se usa un valor estático */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Disponibilidad:</h4>
                      <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            Lunes-Viernes 6:00-22:00
                          </div>
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
};

export default Trainers;