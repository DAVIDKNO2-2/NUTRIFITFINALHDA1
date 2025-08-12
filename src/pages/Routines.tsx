import { Calendar, Clock, Target, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const routines = [
  {
    id: 1,
    title: "Fuerza Full Body",
    trainer: "Carlos Ruiz",
    duration: "45 min",
    difficulty: "Intermedio",
    sessions: 3,
    description: "Rutina completa para trabajar todos los grupos musculares principales",
    exercises: ["Sentadillas", "Press de banca", "Peso muerto", "Dominadas"],
    nextSession: "Mañana 10:00 AM"
  },
  {
    id: 2,
    title: "Cardio HIIT",
    trainer: "Ana García",
    duration: "30 min",
    difficulty: "Avanzado",
    sessions: 4,
    description: "Entrenamiento de alta intensidad para quemar grasa y mejorar resistencia",
    exercises: ["Burpees", "Mountain climbers", "Jumping jacks", "Sprint"],
    nextSession: "Hoy 6:00 PM"
  },
  {
    id: 3,
    title: "Yoga y Flexibilidad",
    trainer: "María López",
    duration: "60 min",
    difficulty: "Principiante",
    sessions: 2,
    description: "Sesión de yoga para mejorar flexibilidad y reducir estrés",
    exercises: ["Saludo al sol", "Guerrero", "Perro boca abajo", "Meditación"],
    nextSession: "Viernes 7:00 AM"
  }
];

const difficultyColors = {
  "Principiante": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  "Intermedio": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  "Avanzado": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
};

export default function Routines() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Mis Rutinas de Ejercicio
          </h1>
          <p className="text-lg text-muted-foreground">
            Gestiona y sigue tus rutinas de entrenamiento personalizadas
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rutinas Activas</p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Esta Semana</p>
                  <p className="text-2xl font-bold text-foreground">9 sesiones</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tiempo Total</p>
                  <p className="text-2xl font-bold text-foreground">6.5h</p>
                </div>
                <Clock className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Progreso</p>
                  <p className="text-2xl font-bold text-foreground">+15%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Routines Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {routines.map((routine) => (
            <Card key={routine.id} className="hover:shadow-card transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{routine.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">Por {routine.trainer}</p>
                  </div>
                  <Badge className={difficultyColors[routine.difficulty as keyof typeof difficultyColors]}>
                    {routine.difficulty}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{routine.description}</p>

                {/* Routine Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {routine.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {routine.sessions}/semana
                  </div>
                </div>

                {/* Exercises Preview */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Ejercicios principales:</p>
                  <div className="flex flex-wrap gap-1">
                    {routine.exercises.map((exercise, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {exercise}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Next Session */}
                <div className="bg-primary/5 rounded-lg p-3">
                  <p className="text-sm font-medium text-foreground mb-1">Próxima sesión:</p>
                  <p className="text-sm text-primary font-medium">{routine.nextSession}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="hero" className="flex-1">
                    Iniciar Rutina
                  </Button>
                  <Button variant="fitness-outline" className="flex-1">
                    Ver Detalles
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add New Routine */}
        <Card className="mt-8 border-dashed border-2 border-muted-foreground/25 hover:border-primary/50 transition-colors">
          <CardContent className="p-8 text-center">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Añadir Nueva Rutina
            </h3>
            <p className="text-muted-foreground mb-4">
              Crea una rutina personalizada o selecciona una de nuestros programas
            </p>
            <Button variant="fitness-outline">
              Crear Rutina
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}