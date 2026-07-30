import { useDispatch, useSelector } from 'react-redux'
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "./ui/dialog" // <-- Проверьте ваш путь к dialog
import { Button } from "./ui/button" // <-- Импорт вашей кнопки из файла выше

import { addTaskOptimistic,
         moveTaskOptimistic,
         editTaskOptimistic,
         deleteTaskOptimistic,
         addToFirebaseAsync,
         moveInFirebaseAsync,
         editInFirebaseAsync,
         deleteInFirebaseAsync,
         selectBacklogTasks,
         selectReadyTasks,
         selectInProgressTasks,
         selectFinishedTasks} from '../features/board/boardSlice.js'

export default function Board() {
    const dispatch = useDispatch()
    const backlog = useSelector(selectBacklogTasks)
    const ready = useSelector(selectReadyTasks)
    const inProgress = useSelector(selectInProgressTasks)
    const finished = useSelector(selectFinishedTasks)

    const handleAddTask = (taskData) => {
        const tempId = crypto.randomUUID()
        const task = {
            ...taskData,
            id: tempId,
            createdAt: Date.now()
        }

        dispatch(addTaskOptimistic(task))
        dispatch(addToFirebaseAsync(task))
    }

    const handleMoveTask = (id, to) => {
        dispatch(moveTaskOptimistic({id, to}))
        dispatch(moveInFirebaseAsync({id, to}))
    }

    const handleEditTask = (id, title, desc) => {
        dispatch(editTaskOptimistic({id, title, desc}))
        dispatch(editInFirebaseAsync({id, title, desc}))
    }

    const handleDelete = (task) => {
        dispatch(deleteTaskOptimistic(task.id))
        dispatch(deleteInFirebaseAsync(task.id))
    }

    const handleClick = () => {
    toast.success("Успешно! 🎉")
    // или toast.error("Ошибка!")
    // или toast("Просто сообщение")
  }

  return (
    <>
        <button onClick={handleClick}>
        Показать тост
        </button>
        <div className="p-8 text-center">
      <Dialog>
        {/* asChild передает событие клика на вашу кастомную кнопку */}
        <DialogTrigger asChild>
          <Button variant="outline" size="lg">
            Открыть настройки
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Настройки профиля</DialogTitle>
            <DialogDescription>
              Здесь вы можете изменить конфигурацию вашего аккаунта.
            </DialogDescription>
          </DialogHeader>

          {/* Контент модального окна */}
          <div className="grid gap-4 py-4">
            <label className="text-sm font-medium">Отображаемое имя</label>
            <input 
              type="text" 
              className="w-full rounded-md border p-2 text-sm outline-none focus:border-primary" 
              placeholder="Иван Иванов"
            />
          </div>

          <DialogFooter>
            {/* Кнопка закрытия внутри окна */}
            <DialogClose asChild>
              <Button variant="ghost">Отмена</Button>
            </DialogClose>
            <Button variant="default">Сохранить изменения</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </>
    
  )
}