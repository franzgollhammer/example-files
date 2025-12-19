import readline from 'node:readline/promises'

// Task interface
interface Task {
  id: number
  description: string
  completed: boolean
}

// TaskManager class
class TaskManager {
  private tasks: Task[] = []
  private nextId: number = 1

  // Method to add a new task
  addTask(description: string): void {
    const newTask: Task = {
      id: this.nextId++,
      description,
      completed: false,
    }
    this.tasks.push(newTask)
    console.log(`Added task: "${description}"`)
  }

  // Method to remove a task by ID
  removeTask(id: number): void {
    const index = this.tasks.findIndex((task) => task.id === id)
    if (index !== -1) {
      const [removedTask] = this.tasks.splice(index, 1)
      console.log(`Removed task: "${removedTask.description}"`)
    } else {
      console.log(`Task with ID ${id} not found.`)
    }
  }

  // Method to list all tasks
  listTasks(): void {
    if (this.tasks.length === 0) {
      console.log('No tasks available.')
    } else {
      console.log('Tasks:')
      this.tasks.forEach((task) => {
        console.log(
          `${task.id}. [${task.completed ? 'x' : ' '}] ${task.description}`,
        )
      })
    }
  }

  // Method to toggle task completion status
  toggleTaskCompletion(id: number): void {
    const task = this.tasks.find((task) => task.id === id)
    if (task) {
      task.completed = !task.completed
      console.log(
        `Task "${task.description}" marked as ${
          task.completed ? 'completed' : 'incomplete'
        }.`,
      )
    } else {
      console.log(`Task with ID ${id} not found.`)
    }
  }
}

// User interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const taskManager = new TaskManager()

const showMenu = (): void => {
  console.log(`
    1. Add Task
    2. Remove Task
    3. List Tasks
    4. Toggle Task Completion
    5. Exit
    `)
}

const promptLoop = async (): Promise<void> => {
  console.log('Welcome to Task Manager!')
  let running = true

  while (running) {
    showMenu()
    const option = (await rl.question('Choose an option: ')).trim()

    switch (option) {
      case '1': {
        const description = await rl.question('Enter task description: ')
        taskManager.addTask(description)
        break
      }
      case '2': {
        const id = Number(await rl.question('Enter task ID to remove: '))
        taskManager.removeTask(id)
        break
      }
      case '3': {
        taskManager.listTasks()
        break
      }
      case '4': {
        const id = Number(
          await rl.question('Enter task ID to toggle completion: '),
        )
        taskManager.toggleTaskCompletion(id)
        break
      }
      case '5':
        running = false
        break
      default:
        console.log('Invalid option, please choose again.')
        break
    }
  }

  rl.close()
  console.log('Goodbye!')
}

void promptLoop()
