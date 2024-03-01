function Checklist({checklist}: any) {
    return (
        <div>
            {checklist.name}<br/>
            {/* { { checklist.tasks.map(task => <Task task={task} key={task.idTask} />)}<br/> */}
        </div>
    );
}

export default Checklist;