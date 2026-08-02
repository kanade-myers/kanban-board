export function Column({ title, tasks, pushpinColor, isLight=false }) {
    const columnClass = isLight ? 'kanban-column kanban-column__light' : 'kanban-column'
    const taskItemClass = isLight ? 'kanban-column__task-item kanban-column__dark' : 'kanban-column__task-item'
    return (
        <article className={columnClass}>
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
                <button className="kanban-column__add-btn">+ Add card</button>
            </div>
        </article>
    )
}
