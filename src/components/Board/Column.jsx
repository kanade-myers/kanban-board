import { useState, useRef, useEffect } from "react"
import { useKanban } from "../../hooks/useKanban"

export function Column({ title, tasks, pushpinColor, isLight=false }) {
    const columnClass = isLight ? 'kanban-column kanban-column__light' : 'kanban-column'
    const taskItemClass = isLight ? 'kanban-column__task-item kanban-column__dark' : 'kanban-column__task-item'

    const [isActive, setIsActive] = useState(true)
    const [taskTitle, setTaskTitle] = useState('')
    const columnRef = useRef(null)
    const inputRef = useRef(null)

    const {addTask,
           editTask,
           moveTask,
           deleteTask,
    } = useKanban()

    function handleInputChange(e) {
        setTaskTitle(e.target.value)
    }

    // Функция для возврата к кнопке
    function resetToButton() {
        setIsActive(true)
        setTaskTitle('')
    }

    // Функция добавления задачи
    function handleAddTask() {
        if (taskTitle.trim()) {
            addTask(taskTitle)
            resetToButton()
        }
    }

    // Обработчик клика вне колонки
    useEffect(() => {
        function handleClickOutside(event) {
            if (columnRef.current && !columnRef.current.contains(event.target)) {
                resetToButton()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    // Обработчик клавиши Enter
    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            handleAddTask()
        }
    }

    return (
        <article className={columnClass} ref={columnRef}>
            <div className="kanban-column__header">
                <div className="kanban-column__pushpin">
                    <img src={`images/pushpin-${pushpinColor}.svg`} alt={`${title} pushpin`} />
                </div>
                <h2 className="kanban-column__title">{title}</h2>
                <div className="kanban-column__line" />
            </div>
            
            <div className="kanban-column__tasks">
                {tasks.map((item) => (
                    <div className={taskItemClass} key={item.id}>
                        {item.title}
                    </div>
                ))}
            </div>
            
            <div className="kanban-column__actions">
                {isActive ? 
                <button onClick={() => setIsActive(prev => !prev)} className="kanban-column__add-btn">+ Add card</button> 
                : <div className="kanban-column__input-container">
                    <input 
                        ref={inputRef}
                        value={taskTitle} 
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className="kanban-column__input"
                        autoFocus
                    />
                    <button onClick={handleAddTask}>
                        <div className="kanban-column__send-img">
                            <img src="images/send-message.png" alt="Send" />
                        </div>
                    </button>
                  </div>}
            </div>
        </article>
    )
}