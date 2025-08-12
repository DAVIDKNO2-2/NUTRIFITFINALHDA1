import { Calendar, Clock, Target, TrendingUp, Plus, MoreVertical, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const initialRoutines = [
    {
        id: 1,
        title: "Fuerza Full Body",
        trainer: "Carlos Ruiz",
        duration: "45 min",
        difficulty: "Intermedio",
        sessions: 3,
        description: "Rutina completa para trabajar todos los grupos musculares principales.",
        exercises: [
            { name: "Sentadillas", repetitions: "4x10", description: "Bajar la cadera hasta que esté paralela al suelo, manteniendo la espalda recta." },
            { name: "Press de banca", repetitions: "4x8", description: "Bajar la barra hasta el pecho y empujar hacia arriba con fuerza." },
            { name: "Peso muerto", repetitions: "3x6", description: "Levantar la barra del suelo manteniendo la espalda recta y usando la fuerza de las piernas y la espalda baja." },
        ],
        nextSession: "Mañana 10:00 AM"
    },
    {
        id: 2,
        title: "Cardio HIIT",
        trainer: "Ana García",
        duration: "30 min",
        difficulty: "Avanzado",
        sessions: 4,
        description: "Entrenamiento de alta intensidad para quemar grasa y mejorar resistencia.",
        exercises: [
            { name: "Burpees", repetitions: "3x15", description: "Combina una sentadilla, una flexión y un salto vertical en un movimiento fluido." },
            { name: "Mountain climbers", repetitions: "3x45s", description: "En posición de plancha, llevar las rodillas al pecho de forma alterna y rápida." },
            { name: "Jumping jacks", repetitions: "3x60s", description: "Saltar abriendo y cerrando piernas y brazos de forma coordinada." },
        ],
        nextSession: "Hoy 6:00 PM"
    },
    {
        id: 3,
        title: "Yoga y Flexibilidad",
        trainer: "María López",
        duration: "60 min",
        difficulty: "Principiante",
        sessions: 2,
        description: "Sesión de yoga para mejorar flexibilidad y reducir estrés.",
        exercises: [
            { name: "Saludo al sol", repetitions: "5 rondas", description: "Secuencia de posturas que calientan y estiran todo el cuerpo." },
            { name: "Postura del Guerrero II", repetitions: "3x30s por lado", description: "Postura de pie que fortalece piernas y abre caderas." },
            { name: "Perro boca abajo", repetitions: "5 respiraciones", description: "Estiramiento completo del cuerpo, enfocándose en la espalda y las piernas." },
        ],
        nextSession: "Viernes 7:00 AM"
    }
];

const difficultyColors = {
    "Principiante": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    "Intermedio": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    "Avanzado": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
};

export default function Routines() {
    const [routines, setRoutines] = useState(initialRoutines);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [selectedRoutine, setSelectedRoutine] = useState(null);
    const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'

    const handleAddClick = () => {
        setDialogMode('add');
        setSelectedRoutine(null);
        setIsDialogOpen(true);
    };

    const handleEditClick = (routine) => {
        setDialogMode('edit');
        setSelectedRoutine(routine);
        setIsDialogOpen(true);
    };

    const handleDeleteClick = (routine) => {
        setSelectedRoutine(routine);
        setIsAlertOpen(true);
    };

    const handleDeleteConfirm = () => {
        setRoutines(routines.filter(r => r.id !== selectedRoutine.id));
        setIsAlertOpen(false);
        setSelectedRoutine(null);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setSelectedRoutine(null);
    };

    const [currentExercises, setCurrentExercises] = useState([]);

    const handleAddClick = () => {
        setDialogMode('add');
        setSelectedRoutine(null);
        setCurrentExercises([{ name: '', repetitions: '', description: '' }]);
        setIsDialogOpen(true);
    };

    const handleEditClick = (routine) => {
        setDialogMode('edit');
        setSelectedRoutine(routine);
        setCurrentExercises(routine.exercises);
        setIsDialogOpen(true);
    };

    const handleExerciseChange = (index, field, value) => {
        const updatedExercises = [...currentExercises];
        updatedExercises[index][field] = value;
        setCurrentExercises(updatedExercises);
    };

    const addExercise = () => {
        setCurrentExercises([...currentExercises, { name: '', repetitions: '', description: '' }]);
    };

    const removeExercise = (index) => {
        const updatedExercises = [...currentExercises];
        updatedExercises.splice(index, 1);
        setCurrentExercises(updatedExercises);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newRoutine = {
            id: dialogMode === 'add' ? Date.now() : selectedRoutine.id,
            title: formData.get('title'),
            trainer: formData.get('trainer'),
            duration: formData.get('duration'),
            difficulty: formData.get('difficulty'),
            sessions: parseInt(formData.get('sessions')),
            description: formData.get('description'),
            exercises: currentExercises.filter(e => e.name), // Only add exercises that have a name
            nextSession: "Próximamente"
        };

        if (dialogMode === 'add') {
            setRoutines([...routines, newRoutine]);
        } else {
            setRoutines(routines.map(r => r.id === newRoutine.id ? newRoutine : r));
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
                            Mis Rutinas de Ejercicio
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Gestiona y sigue tus rutinas de entrenamiento personalizadas
                        </p>
                    </div>
                    <Button variant="hero" onClick={handleAddClick}>
                        <Plus className="mr-2 h-4 w-4" /> Añadir Rutina
                    </Button>
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Rutinas Activas</p>
                                    <p className="text-2xl font-bold text-foreground">{routines.length}</p>
                                </div>
                                <Target className="h-8 w-8 text-primary" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Routines Grid */}
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {routines.map((routine) => (
                        <Card key={routine.id} className="hover:shadow-card transition-all duration-300 flex flex-col">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-xl mb-2">{routine.title}</CardTitle>
                                        <p className="text-sm text-muted-foreground">Por {routine.trainer}</p>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleEditClick(routine)}>
                                                <Edit className="mr-2 h-4 w-4" />
                                                <span>Editar</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDeleteClick(routine)} className="text-red-500">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                <span>Eliminar</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4 flex-grow">
                                <Badge className={difficultyColors[routine.difficulty as keyof typeof difficultyColors]}>
                                    {routine.difficulty}
                                </Badge>
                                <p className="text-muted-foreground">{routine.description}</p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1"><Clock className="h-4 w-4" />{routine.duration}</div>
                                    <div className="flex items-center gap-1"><Calendar className="h-4 w-4" />{routine.sessions}/semana</div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground mb-2">Ejercicios:</p>
                                    <div className="space-y-2">
                                        {routine.exercises.slice(0, 2).map((exercise, index) => (
                                            <div key={index} className="text-xs p-2 bg-muted rounded-md">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-semibold">{exercise.name}</span>
                                                    <Badge variant="outline" className="text-xs">{exercise.repetitions}</Badge>
                                                </div>
                                            </div>
                                        ))}
                                        {routine.exercises.length > 2 && (
                                            <p className="text-xs text-center text-muted-foreground mt-1">
                                                y {routine.exercises.length - 2} más...
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>

                            <div className="p-6 pt-0 mt-auto">
                                <div className="flex gap-2 pt-2">
                                    <Button variant="hero" className="flex-1">Iniciar Rutina</Button>
                                    <Button variant="fitness-outline" className="flex-1" onClick={() => handleEditClick(routine)}>
                                        Ver Detalles
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Add/Edit Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={handleFormSubmit}>
                            <DialogHeader>
                                <DialogTitle>{dialogMode === 'add' ? 'Añadir Nueva Rutina' : 'Editar Rutina'}</DialogTitle>
                                <DialogDescription>
                                    {dialogMode === 'add' ? 'Completa los detalles de la nueva rutina.' : 'Actualiza los detalles de la rutina.'}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="title" className="text-right">Título</Label>
                                    <Input id="title" name="title" defaultValue={selectedRoutine?.title} className="col-span-3" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="trainer" className="text-right">Entrenador</Label>
                                    <Input id="trainer" name="trainer" defaultValue={selectedRoutine?.trainer} className="col-span-3" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="duration" className="text-right">Duración</Label>
                                    <Input id="duration" name="duration" defaultValue={selectedRoutine?.duration} className="col-span-3" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="difficulty" className="text-right">Dificultad</Label>
                                    <Select name="difficulty" defaultValue={selectedRoutine?.difficulty} required>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Selecciona dificultad" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Principiante">Principiante</SelectItem>
                                            <SelectItem value="Intermedio">Intermedio</SelectItem>
                                            <SelectItem value="Avanzado">Avanzado</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="sessions" className="text-right">Sesiones</Label>
                                    <Input id="sessions" name="sessions" type="number" defaultValue={selectedRoutine?.sessions} className="col-span-3" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="description" className="text-right">Descripción</Label>
                                    <Textarea id="description" name="description" defaultValue={selectedRoutine?.description} className="col-span-3" required />
                                </div>
                                <div className="col-span-4">
                                    <Label>Ejercicios</Label>
                                    <div className="space-y-4 mt-2">
                                        {currentExercises.map((exercise, index) => (
                                            <div key={index} className="p-3 border rounded-lg space-y-2 relative">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute top-1 right-1 h-6 w-6"
                                                    onClick={() => removeExercise(index)}
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                                <Input
                                                    placeholder="Nombre del Ejercicio"
                                                    value={exercise.name}
                                                    onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                                                    required
                                                />
                                                <Input
                                                    placeholder="Repeticiones (e.j. 4x10)"
                                                    value={exercise.repetitions}
                                                    onChange={(e) => handleExerciseChange(index, 'repetitions', e.target.value)}
                                                    required
                                                />
                                                <Textarea
                                                    placeholder="Descripción de la ejecución"
                                                    value={exercise.description}
                                                    onChange={(e) => handleExerciseChange(index, 'description', e.target.value)}
                                                    required
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <Button type="button" variant="outline" size="sm" className="mt-2" onClick={addExercise}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Añadir Ejercicio
                                    </Button>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={handleDialogClose}>Cancelar</Button>
                                <Button type="submit" variant="hero">{dialogMode === 'add' ? 'Añadir Rutina' : 'Guardar Cambios'}</Button>
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
                                Esta acción no se puede deshacer. Se eliminará permanentemente la rutina
                                <span className="font-bold"> {selectedRoutine?.title}</span>.
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