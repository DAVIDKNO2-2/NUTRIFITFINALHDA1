import { useState } from "react";
import { Apple, Target, Plus, Trash2, MoreVertical, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialMealPlans = [
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
    const [mealPlans, setMealPlans] = useState(initialMealPlans);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [dialogMode, setDialogMode] = useState('add');

    const handleAddClick = () => {
        setDialogMode('add');
        setSelectedPlan(null);
        setIsDialogOpen(true);
    };

    const handleEditClick = (plan) => {
        setDialogMode('edit');
        setSelectedPlan(plan);
        setIsDialogOpen(true);
    };

    const handleDeleteClick = (plan) => {
        setSelectedPlan(plan);
        setIsAlertOpen(true);
    };

    const handleDeleteConfirm = () => {
        setMealPlans(mealPlans.filter(p => p.id !== selectedPlan.id));
        setIsAlertOpen(false);
        setSelectedPlan(null);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setSelectedPlan(null);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newPlan = {
            id: dialogMode === 'add' ? Date.now() : selectedPlan.id,
            title: formData.get('title'),
            calories: parseInt(formData.get('calories')),
            protein: parseInt(formData.get('protein')),
            carbs: parseInt(formData.get('carbs')),
            fats: parseInt(formData.get('fats')),
            meals: parseInt(formData.get('meals')),
            description: formData.get('description'),
            nutritionist: formData.get('nutritionist'),
        };

        if (dialogMode === 'add') {
            setMealPlans([...mealPlans, newPlan]);
        } else {
            setMealPlans(mealPlans.map(p => p.id === newPlan.id ? newPlan : p));
        }
        handleDialogClose();
    };


    return (
        <div className="min-h-screen bg-background pt-20">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                            Planes Nutricionales
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Gestiona y sigue tus planes de alimentación personalizados
                        </p>
                    </div>
                    <Button variant="hero" onClick={handleAddClick}>
                        <Plus className="mr-2 h-4 w-4" /> Añadir Plan
                    </Button>
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
                                            <p className="text-sm text-muted-foreground">Planes Activos</p>
                                            <p className="text-xl font-bold text-foreground">{mealPlans.length}</p>
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
                                <CardTitle className="text-lg">Mis Planes</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {mealPlans.map((plan) => (
                                    <div key={plan.id} className="p-4 border border-border rounded-lg relative">
                                        <div className="absolute top-2 right-2">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleEditClick(plan)}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        <span>Editar</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDeleteClick(plan)} className="text-red-500">
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        <span>Eliminar</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        <h4 className="font-medium text-foreground mb-2 pr-8">{plan.title}</h4>
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
                    </div>
                </div>

                {/* Add/Edit Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={handleFormSubmit}>
                            <DialogHeader>
                                <DialogTitle>{dialogMode === 'add' ? 'Añadir Nuevo Plan' : 'Editar Plan'}</DialogTitle>
                                <DialogDescription>
                                    {dialogMode === 'add' ? 'Completa los detalles del nuevo plan.' : 'Actualiza los detalles del plan.'}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="title" className="text-right">Título</Label>
                                    <Input id="title" name="title" defaultValue={selectedPlan?.title} className="col-span-3" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="calories" className="text-right">Calorías</Label>
                                    <Input id="calories" name="calories" type="number" defaultValue={selectedPlan?.calories} className="col-span-3" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="protein" className="text-right">Proteína</Label>
                                    <Input id="protein" name="protein" type="number" defaultValue={selectedPlan?.protein} className="col-span-3" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="carbs" className="text-right">Carbs</Label>
                                    <Input id="carbs" name="carbs" type="number" defaultValue={selectedPlan?.carbs} className="col-span-3" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="fats" className="text-right">Grasas</Label>
                                    <Input id="fats" name="fats" type="number" defaultValue={selectedPlan?.fats} className="col-span-3" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="meals" className="text-right">Comidas</Label>
                                    <Input id="meals" name="meals" type="number" defaultValue={selectedPlan?.meals} className="col-span-3" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="description" className="text-right">Descripción</Label>
                                    <Textarea id="description" name="description" defaultValue={selectedPlan?.description} className="col-span-3" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="nutritionist" className="text-right">Nutricionista</Label>
                                    <Input id="nutritionist" name="nutritionist" defaultValue={selectedPlan?.nutritionist} className="col-span-3" required />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={handleDialogClose}>Cancelar</Button>
                                <Button type="submit" variant="hero">{dialogMode === 'add' ? 'Añadir Plan' : 'Guardar Cambios'}</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Delete Confirmation Alert */}
                <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará permanentemente el plan
                                <span className="font-bold"> {selectedPlan?.title}</span>.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-500 hover:bg-red-600">
                                Sí, eliminar
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}