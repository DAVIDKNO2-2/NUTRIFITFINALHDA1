import { Apple, Clock, Target, TrendingUp, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const mealPlans = [
  {
    id: 1,
    title: "Plan de Definición",
    calories: 1800,
    protein: 140,
    carbs: 180,
    fats: 60,
    meals: 5,
    description: "Plan diseñado para pérdida de grasa manteniendo masa muscular",
    nutritionist: "Dr. Patricia Mendez"
  },
  {
    id: 2,
    title: "Plan de Volumen",
    calories: 2800,
    protein: 180,
    carbs: 320,
    fats: 90,
    meals: 6,
    description: "Plan para ganar masa muscular y peso corporal",
    nutritionist: "Dr. Roberto Silva"
  }
];

const todayMeals = [
  {
    time: "8:00 AM",
    name: "Desayuno",
    calories: 420,
    completed: true,
    foods: ["Avena con frutas", "Proteína whey", "Almendras"]
  },
  {
    time: "11:00 AM",
    name: "Snack Mañana",
    calories: 180,
    completed: true,
    foods: ["Yogur griego", "Frutos secos"]
  },
  {
    time: "14:00 PM",
    name: "Almuerzo",
    calories: 650,
    completed: false,
    foods: ["Pollo a la plancha", "Arroz integral", "Ensalada mixta"]
  },
  {
    time: "17:00 PM",
    name: "Snack Tarde",
    calories: 200,
    completed: false,
    foods: ["Batido de proteína", "Plátano"]
  },
  {
    time: "20:00 PM",
    name: "Cena",
    calories: 480,
    completed: false,
    foods: ["Salmón", "Quinoa", "Vegetales al vapor"]
  }
];

const dailyGoals = {
  calories: { current: 600, target: 1800 },
  protein: { current: 45, target: 140 },
  carbs: { current: 65, target: 180 },
  fats: { current: 20, target: 60 }
};

export default function Nutrition() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Planes Nutricionales
          </h1>
          <p className="text-lg text-muted-foreground">
            Sigue tu alimentación y alcanza tus objetivos nutricionales
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Daily Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Progreso de Hoy</span>
                  <Badge variant="outline">
                    {todayMeals.filter(meal => meal.completed).length}/{todayMeals.length} comidas
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Macros Progress */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Calorías</span>
                        <span>{dailyGoals.calories.current}/{dailyGoals.calories.target} kcal</span>
                      </div>
                      <Progress value={(dailyGoals.calories.current / dailyGoals.calories.target) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Proteína</span>
                        <span>{dailyGoals.protein.current}/{dailyGoals.protein.target}g</span>
                      </div>
                      <Progress value={(dailyGoals.protein.current / dailyGoals.protein.target) * 100} className="h-2" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Carbohidratos</span>
                        <span>{dailyGoals.carbs.current}/{dailyGoals.carbs.target}g</span>
                      </div>
                      <Progress value={(dailyGoals.carbs.current / dailyGoals.carbs.target) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Grasas</span>
                        <span>{dailyGoals.fats.current}/{dailyGoals.fats.target}g</span>
                      </div>
                      <Progress value={(dailyGoals.fats.current / dailyGoals.fats.target) * 100} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Today's Meals */}
            <Card>
              <CardHeader>
                <CardTitle>Comidas de Hoy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {todayMeals.map((meal, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border ${meal.completed ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' : 'bg-background border-border'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${meal.completed ? 'bg-green-500' : 'bg-muted-foreground'}`}></div>
                        <div>
                          <h4 className="font-medium text-foreground">{meal.name}</h4>
                          <p className="text-sm text-muted-foreground">{meal.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">{meal.calories} kcal</p>
                        {!meal.completed && (
                          <Button size="sm" variant="fitness-outline" className="mt-1">
                            Marcar
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {meal.foods.map((food, foodIndex) => (
                        <Badge key={foodIndex} variant="secondary" className="text-xs">
                          {food}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Calorías Restantes</p>
                      <p className="text-xl font-bold text-foreground">1,200</p>
                    </div>
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Comidas Hoy</p>
                      <p className="text-xl font-bold text-foreground">2/5</p>
                    </div>
                    <Apple className="h-6 w-6 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Plans */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Planes Activos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mealPlans.map((plan) => (
                  <div key={plan.id} className="p-4 border border-border rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">{plan.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="font-medium">{plan.calories}</div>
                        <div className="text-muted-foreground">kcal</div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="font-medium">{plan.protein}g</div>
                        <div className="text-muted-foreground">proteína</div>
                      </div>
                    </div>
                    <Button variant="fitness-outline" size="sm" className="w-full mt-3">
                      Ver Plan
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="hero" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Registrar Comida
                </Button>
                <Button variant="fitness-outline" className="w-full">
                  Ver Recetas
                </Button>
                <Button variant="fitness-outline" className="w-full">
                  Consultar Nutricionista
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}