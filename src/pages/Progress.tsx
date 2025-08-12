import { TrendingUp, Calendar, Target, Trophy, Activity, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const progressData = {
  weight: {
    current: 72.5,
    initial: 78,
    goal: 70,
    unit: "kg",
    change: -5.5,
    history: [
      { date: "2024-01-01", value: 78 },
      { date: "2024-01-15", value: 77.2 },
      { date: "2024-02-01", value: 76.1 },
      { date: "2024-02-15", value: 75.3 },
      { date: "2024-03-01", value: 74.2 },
      { date: "2024-03-15", value: 73.8 },
      { date: "2024-04-01", value: 72.5 }
    ]
  },
  bodyFat: {
    current: 18.2,
    initial: 22.8,
    goal: 15,
    unit: "%",
    change: -4.6
  },
  muscle: {
    current: 59.4,
    initial: 55.2,
    goal: 62,
    unit: "kg",
    change: 4.2
  }
};

const achievements = [
  {
    title: "Primera Meta Alcanzada",
    description: "Perdiste tus primeros 5kg",
    date: "15 Mar 2024",
    icon: Trophy,
    color: "text-yellow-500"
  },
  {
    title: "Consistencia Semanal",
    description: "7 días seguidos entrenando",
    date: "10 Mar 2024",
    icon: Calendar,
    color: "text-blue-500"
  },
  {
    title: "Nuevo Récord Personal",
    description: "Press de banca: 80kg",
    date: "5 Mar 2024",
    icon: TrendingUp,
    color: "text-green-500"
  },
  {
    title: "Meta Nutricional",
    description: "30 días siguiendo el plan",
    date: "1 Mar 2024",
    icon: Target,
    color: "text-purple-500"
  }
];

const weeklyStats = [
  { day: "Lun", workouts: 1, duration: 45, calories: 420 },
  { day: "Mar", workouts: 1, duration: 60, calories: 580 },
  { day: "Mié", workouts: 0, duration: 0, calories: 0 },
  { day: "Jue", workouts: 1, duration: 50, calories: 480 },
  { day: "Vie", workouts: 1, duration: 40, calories: 380 },
  { day: "Sáb", workouts: 1, duration: 75, calories: 680 },
  { day: "Dom", workouts: 0, duration: 0, calories: 0 }
];

const personalRecords = [
  { exercise: "Press de Banca", current: "80kg", previous: "75kg", improvement: "+5kg" },
  { exercise: "Sentadilla", current: "100kg", previous: "95kg", improvement: "+5kg" },
  { exercise: "Peso Muerto", current: "120kg", previous: "110kg", improvement: "+10kg" },
  { exercise: "Carrera 5K", current: "24:30", previous: "26:15", improvement: "-1:45" }
];

export default function Progress() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Mi Progreso
          </h1>
          <p className="text-lg text-muted-foreground">
            Sigue tu evolución y celebra cada logro en tu journey fitness
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="body">Cuerpo</TabsTrigger>
            <TabsTrigger value="performance">Rendimiento</TabsTrigger>
            <TabsTrigger value="achievements">Logros</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Peso Actual</p>
                      <p className="text-2xl font-bold text-foreground">{progressData.weight.current}kg</p>
                      <p className="text-sm text-green-600">
                        {progressData.weight.change}kg vs inicial
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Grasa Corporal</p>
                      <p className="text-2xl font-bold text-foreground">{progressData.bodyFat.current}%</p>
                      <p className="text-sm text-green-600">
                        {progressData.bodyFat.change}% vs inicial
                      </p>
                    </div>
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Masa Muscular</p>
                      <p className="text-2xl font-bold text-foreground">{progressData.muscle.current}kg</p>
                      <p className="text-sm text-green-600">
                        +{progressData.muscle.change}kg vs inicial
                      </p>
                    </div>
                    <Activity className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Esta Semana</p>
                      <p className="text-2xl font-bold text-foreground">5 entrenamientos</p>
                      <p className="text-sm text-green-600">270 min totales</p>
                    </div>
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Actividad Semanal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {weeklyStats.map((day, index) => (
                    <div key={index} className="text-center">
                      <div className="text-sm font-medium text-muted-foreground mb-2">{day.day}</div>
                      <div className={`h-16 rounded-lg flex items-end justify-center ${
                        day.workouts > 0 ? 'bg-gradient-orange' : 'bg-muted'
                      }`}>
                        {day.workouts > 0 && (
                          <div className="text-white text-xs font-medium pb-2">
                            {day.duration}min
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {day.calories > 0 ? `${day.calories} cal` : 'Descanso'}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="body" className="space-y-6">
            {/* Body Composition Progress */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Peso Corporal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progreso hacia meta</span>
                      <span>{Math.round(((progressData.weight.initial - progressData.weight.current) / (progressData.weight.initial - progressData.weight.goal)) * 100)}%</span>
                    </div>
                    <ProgressBar value={75} className="h-2" />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Inicial:</span>
                      <span>{progressData.weight.initial}kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Actual:</span>
                      <span className="font-medium">{progressData.weight.current}kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Meta:</span>
                      <span>{progressData.weight.goal}kg</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Grasa Corporal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progreso hacia meta</span>
                      <span>{Math.round(((progressData.bodyFat.initial - progressData.bodyFat.current) / (progressData.bodyFat.initial - progressData.bodyFat.goal)) * 100)}%</span>
                    </div>
                    <ProgressBar value={58} className="h-2" />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Inicial:</span>
                      <span>{progressData.bodyFat.initial}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Actual:</span>
                      <span className="font-medium">{progressData.bodyFat.current}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Meta:</span>
                      <span>{progressData.bodyFat.goal}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Masa Muscular</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progreso hacia meta</span>
                      <span>{Math.round(((progressData.muscle.current - progressData.muscle.initial) / (progressData.muscle.goal - progressData.muscle.initial)) * 100)}%</span>
                    </div>
                    <ProgressBar value={62} className="h-2" />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Inicial:</span>
                      <span>{progressData.muscle.initial}kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Actual:</span>
                      <span className="font-medium">{progressData.muscle.current}kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Meta:</span>
                      <span>{progressData.muscle.goal}kg</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {/* Personal Records */}
            <Card>
              <CardHeader>
                <CardTitle>Récords Personales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {personalRecords.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">{record.exercise}</h4>
                        <p className="text-sm text-muted-foreground">
                          Anterior: {record.previous}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-foreground">{record.current}</div>
                        <Badge variant="secondary" className="text-green-600">
                          {record.improvement}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Logros Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border border-border rounded-lg">
                      <div className={`p-2 rounded-lg bg-muted ${achievement.color}`}>
                        <achievement.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground mb-1">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {achievement.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}