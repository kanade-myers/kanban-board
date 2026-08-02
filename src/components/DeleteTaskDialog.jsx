import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./ui/dialog"
import { Trash2 } from "lucide-react"
import { Button } from "./ui/button"

export function DeleteTaskDialog({ isOpen, taskTitle, onConfirm }) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            Удалить задачу?
          </DialogTitle>
          <DialogDescription>
            Вы уверены, что хотите удалить задачу{" "}
            <span className="font-semibold text-foreground">"{taskTitle}"</span>?
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button variant="outline">Отмена</Button>
          </DialogClose>
          <Button variant="destructive" onClick={onConfirm}>
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}