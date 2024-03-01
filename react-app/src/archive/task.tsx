

function Task(task: any) {
    return (
        <div>
            {task.name}   {task.date}   {task.status}<br/>
            {task.description}<br/>
        </div>
    );
}

export default Task;