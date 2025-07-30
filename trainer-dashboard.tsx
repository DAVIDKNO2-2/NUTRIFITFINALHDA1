"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, User, Dumbbell, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Exercise {
  id: string
  name: string
  repetitions: string
  instructions: string
}

interface Routine {
  id: string
  name: string
  description: string
  exercises: Exercise[]
  createdAt: string
}

interface Assignment {
  id: string
  routineId: string
  userId: string
  assignedAt: string
  routine: Routine
}

export default function TrainerDashboard() {
  const [routines, setRoutines] = useState<Routine[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [editingRoutine, setEditingRoutine] = useState<Routine | null>(null)
  const { toast } = useToast()

  // Estado para formulario de rutina
  const [routineForm, setRoutineForm] = useState({
    name: "",
    description: "",
    exercises: [{ id: "1", name: "", repetitions: "", instructions: "" }],
  })

  // Estado para formulario de asignación
  const [assignForm, setAssignForm] = useState({
    routineId: "",
    userId: "",
  })

  const addExercise = () => {
    const newExercise = {
      id: Date.now().toString(),
      name: "",
      repetitions: "",
      instructions: "",
    }
    setRoutineForm((prev) => ({
      ...prev,
      exercises: [...prev.exercises, newExercise],
    }))
  }

  const removeExercise = (exerciseId: string) => {
    setRoutineForm((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((ex) => ex.id !== exerciseId),
    }))
  }

  const updateExercise = (exerciseId: string, field: keyof Exercise, value: string) => {
    setRoutineForm((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) => (ex.id === exerciseId ? { ...ex, [field]: value } : ex)),
    }))
  }

  const createRoutine = () => {
    if (!routineForm.name.trim()) {
      toast({
        title: "Error",
        description: "El nombre de la rutina es obligatorio",
        variant: "destructive",
      })
      return
    }

    const newRoutine: Routine = {
      id: Date.now().toString(),
      name: routineForm.name,
      description: routineForm.description,
      exercises: routineForm.exercises.filter((ex) => ex.name.trim()),
      createdAt: new Date().toISOString(),
    }

    if (editingRoutine) {
      setRoutines((prev) =>
        prev.map((r) => (r.id === editingRoutine.id ? { ...newRoutine, id: editingRoutine.id } : r)),
      )
      toast({
        title: "Rutina actualizada",
        description: "La rutina se ha actualizado correctamente",
      })
    } else {
      setRoutines((prev) => [...prev, newRoutine])
      toast({
        title: "Rutina creada",
        description: "La rutina se ha creado correctamente",
      })
    }

    resetForm()
    setIsCreateDialogOpen(false)
    setEditingRoutine(null)
  }

  const assignRoutine = () => {
    if (!assignForm.routineId || !assignForm.userId) {
      toast({
        title: "Error",
        description: "Selecciona una rutina y especifica el ID del usuario",
        variant: "destructive",
      })
      return
    }

    const routine = routines.find((r) => r.id === assignForm.routineId)
    if (!routine) return

    const newAssignment: Assignment = {
      id: Date.now().toString(),
      routineId: assignForm.routineId,
      userId: assignForm.userId,
      assignedAt: new Date().toISOString(),
      routine,
    }

    setAssignments((prev) => [...prev, newAssignment])
    toast({
      title: "Rutina asignada",
      description: `Rutina asignada al usuario ${assignForm.userId}`,
    })

    setAssignForm({ routineId: "", userId: "" })
    setIsAssignDialogOpen(false)
  }

  const deleteRoutine = (routineId: string) => {
    setRoutines((prev) => prev.filter((r) => r.id !== routineId))
    setAssignments((prev) => prev.filter((a) => a.routineId !== routineId))
    toast({
      title: "Rutina eliminada",
      description: "La rutina y sus asignaciones han sido eliminadas",
    })
  }

  const editRoutine = (routine: Routine) => {
    setRoutineForm({
      name: routine.name,
      description: routine.description,
      exercises: routine.exercises,
    })
    setEditingRoutine(routine)
    setIsCreateDialogOpen(true)
  }

  const resetForm = () => {
    setRoutineForm({
      name: "",
      description: "",
      exercises: [{ id: "1", name: "", repetitions: "", instructions: "" }],
    })
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Panel del Entrenador</h1>
          <p className="text-muted-foreground">Gestiona rutinas de ejercicio y asignaciones</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Nueva Rutina
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingRoutine ? "Editar Rutina" : "Crear Nueva Rutina"}</DialogTitle>
                <DialogDescription>
                  {editingRoutine
                    ? "Modifica los detalles de la rutina"
                    : "Completa los detalles para crear una nueva rutina de ejercicios"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="routine-name">Nombre de la Rutina</Label>
                  <Input
                    id="routine-name"
                    value={routineForm.name}
                    onChange={(e) => setRoutineForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Ej: Rutina de Fuerza Básica"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="routine-description">Descripción</Label>
                  <Textarea
                    id="routine-description"
                    value={routineForm.description}
                    onChange={(e) => setRoutineForm((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Descripción general de la rutina..."
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Ejercicios</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addExercise}>
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar Ejercicio
                    </Button>
                  </div>
                  {routineForm.exercises.map((exercise, index) => (
                    <Card key={exercise.id} className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Ejercicio {index + 1}</h4>
                          {routineForm.exercises.length > 1 && (
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeExercise(exercise.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label>Nombre del Ejercicio</Label>
                            <Input
                              value={exercise.name}
                              onChange={(e) => updateExercise(exercise.id, "name", e.target.value)}
                              placeholder="Ej: Flexiones de pecho"
                            />
                          </div>
                          <div>
                            <Label>Repeticiones/Series</Label>
                            <Input
                              value={exercise.repetitions}
                              onChange={(e) => updateExercise(exercise.id, "repetitions", e.target.value)}
                              placeholder="Ej: 3 series x 12 rep"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Instrucciones de Ejecución</Label>
                          <Textarea
                            value={exercise.instructions}
                            onChange={(e) => updateExercise(exercise.id, "instructions", e.target.value)}
                            placeholder="Describe cómo realizar correctamente el ejercicio..."
                            className="min-h-[80px]"
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={createRoutine}>{editingRoutine ? "Actualizar Rutina" : "Crear Rutina"}</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <User className="w-4 h-4 mr-2" />
                Asignar Rutina
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Asignar Rutina a Usuario</DialogTitle>
                <DialogDescription>Selecciona una rutina y especifica el ID del usuario</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="routine-select">Seleccionar Rutina</Label>
                  <select
                    id="routine-select"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={assignForm.routineId}
                    onChange={(e) => setAssignForm((prev) => ({ ...prev, routineId: e.target.value }))}
                  >
                    <option value="">Selecciona una rutina...</option>
                    {routines.map((routine) => (
                      <option key={routine.id} value={routine.id}>
                        {routine.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="user-id">ID del Usuario</Label>
                  <Input
                    id="user-id"
                    value={assignForm.userId}
                    onChange={(e) => setAssignForm((prev) => ({ ...prev, userId: e.target.value }))}
                    placeholder="Ej: user123"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={assignRoutine}>Asignar Rutina</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="routines" className="space-y-4">
        <TabsList>
          <TabsTrigger value="routines">Rutinas ({routines.length})</TabsTrigger>
          <TabsTrigger value="assignments">Asignaciones ({assignments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="routines" className="space-y-4">
          {routines.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Dumbbell className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No hay rutinas creadas</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Comienza creando tu primera rutina de ejercicios
                </p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Crear Primera Rutina
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {routines.map((routine) => (
                <Card key={routine.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{routine.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {routine.exercises.length} ejercicio{routine.exercises.length !== 1 ? "s" : ""}
                        </CardDescription>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => editRoutine(routine)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteRoutine(routine.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {routine.description && <p className="text-sm text-muted-foreground mb-3">{routine.description}</p>}
                    <div className="space-y-2">
                      {routine.exercises.slice(0, 3).map((exercise, index) => (
                        <div key={exercise.id} className="flex items-center gap-2 text-sm">
                          <Badge variant="outline" className="text-xs">
                            {index + 1}
                          </Badge>
                          <span className="font-medium">{exercise.name}</span>
                          <span className="text-muted-foreground">{exercise.repetitions}</span>
                        </div>
                      ))}
                      {routine.exercises.length > 3 && (
                        <p className="text-xs text-muted-foreground">
                          +{routine.exercises.length - 3} ejercicio{routine.exercises.length - 3 !== 1 ? "s" : ""} más
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      Creada {new Date(routine.createdAt).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          {assignments.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <User className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No hay asignaciones</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Las rutinas asignadas a usuarios aparecerán aquí
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{assignment.routine.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Usuario: {assignment.userId} • {assignment.routine.exercises.length} ejercicios
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Asignada {new Date(assignment.assignedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setAssignments((prev) => prev.filter((a) => a.id !== assignment.id))}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
