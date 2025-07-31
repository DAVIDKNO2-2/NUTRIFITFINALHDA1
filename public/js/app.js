document.addEventListener('DOMContentLoaded', () => {
  const API_BASE_URL = '/api';

  // --- DOM Elements ---
  const routinesContainer = document.querySelector('#routines');
  const assignmentsContainer = document.querySelector('#assignments');
  const tabs = document.querySelectorAll('.tab-link');

  // Modals
  const routineModal = document.getElementById('routine-modal');
  const assignModal = document.getElementById('assign-modal');
  const closeButtons = document.querySelectorAll('.close-btn');

  // Forms
  const routineForm = document.getElementById('routine-form');
  const assignForm = document.getElementById('assign-form');

  // Buttons
  const newRoutineBtn = document.getElementById('new-routine-btn');
  const assignRoutineBtn = document.getElementById('assign-routine-btn');
  const addExerciseBtn = document.getElementById('add-exercise-btn');

  let currentRoutines = [];

  // --- API Functions ---
  const api = {
    getRoutines: () => fetch(`${API_BASE_URL}/routines`).then(res => res.json()),
    getAssignments: () => fetch(`${API_BASE_URL}/assignments`).then(res => res.json()),
    createRoutine: (data) => fetch(`${API_BASE_URL}/routines`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),
    updateRoutine: (id, data) => fetch(`${API_BASE_URL}/routines/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),
    deleteRoutine: (id) => fetch(`${API_BASE_URL}/routines/${id}`, { method: 'DELETE' }),
    createAssignment: (data) => fetch(`${API_BASE_URL}/assignments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }).then(res => res.json()),
    deleteAssignment: (id) => fetch(`${API_BASE_URL}/assignments/${id}`, { method: 'DELETE' }),
  };

  // --- Render Functions ---
  const renderRoutines = (routines) => {
    routinesContainer.innerHTML = '';
    if (routines.length === 0) {
      routinesContainer.innerHTML = `<div class="empty-state"><h3>No routines created</h3><p>Get started by creating your first exercise routine.</p></div>`;
      return;
    }
    const grid = document.createElement('div');
    grid.className = 'card-grid';
    routines.forEach(routine => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-header">
          <div>
            <h3 class="card-title">${routine.name}</h3>
            <p class="card-description">${routine.exercises.length} exercise(s)</p>
          </div>
          <div class="card-actions">
            <button class="edit-btn" data-id="${routine.id}">Edit</button>
            <button class="delete-btn" data-id="${routine.id}">Delete</button>
          </div>
        </div>
        <div class="card-content">
          ${routine.description ? `<p>${routine.description}</p>` : ''}
        </div>
        <div class="card-footer">
          Created on ${new Date(routine.createdAt).toLocaleDateString()}
        </div>
      `;
      grid.appendChild(card);
    });
    routinesContainer.appendChild(grid);
  };

  const renderAssignments = (assignments) => {
    assignmentsContainer.innerHTML = '';
     if (assignments.length === 0) {
      assignmentsContainer.innerHTML = `<div class="empty-state"><h3>No assignments</h3><p>Assigned routines will appear here.</p></div>`;
      return;
    }
    assignments.forEach(assignment => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-header">
            <div>
                <h3 class="card-title">${assignment.routine.name}</h3>
                <p class="card-description">Assigned to: ${assignment.userId}</p>
            </div>
            <div class="card-actions">
                <button class="delete-assign-btn" data-id="${assignment.id}">Delete</button>
            </div>
        </div>
        <div class="card-footer">
          Assigned on ${new Date(assignment.assignedAt).toLocaleDateString()}
        </div>
      `;
      assignmentsContainer.appendChild(card);
    });
  };

  const loadData = async () => {
    const [routines, assignments] = await Promise.all([api.getRoutines(), api.getAssignments()]);
    currentRoutines = routines;
    renderRoutines(routines);
    renderAssignments(assignments);
    populateAssignModalRoutines(routines);
  };

  // --- Modal & Form Handling ---
  const openModal = (modal) => modal.style.display = 'block';
  const closeModal = (modal) => modal.style.display = 'none';

  const resetRoutineForm = () => {
    routineForm.reset();
    document.getElementById('routine-id').value = '';
    document.getElementById('modal-title').textContent = 'Create New Routine';
    document.getElementById('exercises-container').innerHTML = '';
    addExerciseField();
  };

  const addExerciseField = (exercise = { name: '', repetitions: '', instructions: ''}) => {
    const container = document.getElementById('exercises-container');
    const exerciseDiv = document.createElement('div');
    exerciseDiv.className = 'exercise';
    exerciseDiv.innerHTML = `
      <div class="exercise-header" style="display:flex; justify-content:space-between; align-items:center;">
        <h4>Exercise</h4>
        <button type="button" class="remove-exercise-btn">Remove</button>
      </div>
      <div class="form-group">
        <label>Exercise Name</label>
        <input type="text" class="exercise-name" value="${exercise.name}" required>
      </div>
      <div class="form-group">
        <label>Repetitions/Series</label>
        <input type="text" class="exercise-reps" value="${exercise.repetitions}">
      </div>
      <div class="form-group">
        <label>Instructions</label>
        <textarea class="exercise-instr">${exercise.instructions}</textarea>
      </div>
    `;
    container.appendChild(exerciseDiv);
  };

  const populateAssignModalRoutines = (routines) => {
    const select = document.getElementById('assign-routine-select');
    select.innerHTML = '<option value="">Select a routine...</option>';
    routines.forEach(r => {
        const option = document.createElement('option');
        option.value = r.id;
        option.textContent = r.name;
        select.appendChild(option);
    });
  };

  // --- Event Listeners ---
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });

  newRoutineBtn.addEventListener('click', () => {
    resetRoutineForm();
    openModal(routineModal);
  });

  assignRoutineBtn.addEventListener('click', () => {
    assignForm.reset();
    openModal(assignModal);
  });

  closeButtons.forEach(btn => btn.addEventListener('click', () => {
    closeModal(routineModal);
    closeModal(assignModal);
  }));

  window.addEventListener('click', (e) => {
    if (e.target === routineModal) closeModal(routineModal);
    if (e.target === assignModal) closeModal(assignModal);
  });

  addExerciseBtn.addEventListener('click', () => addExerciseField());

  document.getElementById('exercises-container').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-exercise-btn')) {
      e.target.closest('.exercise').remove();
    }
  });

  routineForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('routine-id').value;
    const exercises = [...document.querySelectorAll('#exercises-container .exercise')].map(el => ({
      name: el.querySelector('.exercise-name').value,
      repetitions: el.querySelector('.exercise-reps').value,
      instructions: el.querySelector('.exercise-instr').value,
    })).filter(ex => ex.name.trim() !== '');

    const data = {
      name: document.getElementById('routine-name').value,
      description: document.getElementById('routine-description').value,
      exercises,
    };

    if (id) {
      await api.updateRoutine(id, data);
    } else {
      await api.createRoutine(data);
    }

    closeModal(routineModal);
    loadData();
  });

  routinesContainer.addEventListener('click', async (e) => {
    const target = e.target;
    if (target.classList.contains('delete-btn')) {
        const id = target.dataset.id;
        if(confirm('Are you sure you want to delete this routine?')) {
            await api.deleteRoutine(id);
            loadData();
        }
    }
    if (target.classList.contains('edit-btn')) {
        const id = target.dataset.id;
        const routine = currentRoutines.find(r => r.id === id);
        if (routine) {
            resetRoutineForm();
            document.getElementById('modal-title').textContent = 'Edit Routine';
            document.getElementById('routine-id').value = routine.id;
            document.getElementById('routine-name').value = routine.name;
            document.getElementById('routine-description').value = routine.description;
            routine.exercises.forEach(ex => addExerciseField(ex));
            openModal(routineModal);
        }
    }
  });

  assignForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        routineId: document.getElementById('assign-routine-select').value,
        userId: document.getElementById('assign-user-id').value,
    };
    const result = await api.createAssignment(data);
    if(result.id) {
        closeModal(assignModal);
        loadData();
    } else {
        alert(result.message || 'Failed to assign routine.');
    }
  });

  assignmentsContainer.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-assign-btn')) {
        const id = e.target.dataset.id;
        if(confirm('Are you sure you want to delete this assignment?')) {
            await api.deleteAssignment(id);
            loadData();
        }
    }
  });


  // --- Initial Load ---
  loadData();
});
