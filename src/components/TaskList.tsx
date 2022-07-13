import {useState} from "react";
import "../styles/taskList.scss";

import {FiTrash, FiCheckSquare} from "react-icons/fi";

interface Task {
	id: number;
	title: string;
	isComplete: boolean;
}

export function TaskList() {
	const [tasks, setTasks] = useState<Task[]>([]); // Responsável pelas taks
	const [newTaskTitle, setNewTaskTitle] = useState(""); // Reponsável pelo nome da task
	function handleCreateNewTask() {
		// 1. função que cria nova task
		
		const taskEqual = tasks.reduce(
			(prev, task): any => task.title == newTaskTitle,
			false
			// reduce pra percorrer a lista, e retorna true ou false, se o valor task for igual text digitado no input.
		);

		if (!newTaskTitle || taskEqual === true) return;
		// 2.  Condição para não criar task com title vazio, ou com titulo igual a alguma task criada..

		
		const newTask = {
			id: Math.random(), // gera id aleatório(não recomendado, só para teste)
			title: newTaskTitle, // Cria titulo, com base no estado que recebe o value do input
			isComplete: false, // Boolean que começa com false. (true) indica que a task foi completada.
		};
		//3. Objeto que segue o padrão de tipos da interface TS

		setTasks(prevState => [...prevState, newTask]);
		// 4. Passa para função do state, o objeto que contem a nova task, e recupera a task anterior do estado.

		setNewTaskTitle("");
		// 5. pasas para função que altera o estado uma string vazia, para limpar o input após criar uma nova task
	}

	function handleToggleTaskCompletion(id: number) {
		// 9. Altere entre true` ou `false` o campo `isComplete` de uma task pelo ID

		const newTasks = tasks.map(task =>
			// 10. Percorremos a lista de staks, e as taks que tiverem o ID igual da task que passamos no event, criamos um novo objeto que vais ser a nossa nova task, fazemos um spread que pega todos valores da task e subscreve apenas a prop `isComplete`, alterando para o valor contrário do que esta (fazendo switch). Se a task for diferente do ID, ela apenas retorna a task do jeito que esta, sem fazer modificações.

			task.id === id
				? {
						...task,
						isComplete: !task.isComplete,
				  }
				: task
		);

		setTasks(newTasks);

		// 11. Passa para o estado a nova task criada (completada ou não completada)
	}

	function handleRemoveTask(id: number) {
		//6. Funcão q Remove a task da listagem pelo ID

		const filterTasks = tasks.filter(task => task.id !== id);
		//7. filtra as  taks com id que são diferentes do id passado ao clicar no event button

		setTasks(filterTasks);
		//8. passa pro estado as tasks filtradas, mantendo elas no estado e removendo apenas a que for igual ao ID
	}

	return (
		<section className="task-list container">
			<header>
				<h2>Minhas tasks</h2>

				<div className="input-group">
					<input
						type="text"
						placeholder="Adicionar novo todo"
						onChange={e => setNewTaskTitle(e.target.value)}
						value={newTaskTitle}
					/>
					<button
						type="submit"
						data-testid="add-task-button"
						onClick={handleCreateNewTask}>
						<FiCheckSquare size={16} color="#fff" />
					</button>
				</div>
			</header>

			<main>
				<ul>
					{tasks.map(task => (
						<li key={task.id}>
							<div
								className={task.isComplete ? "completed" : ""}
								data-testid="task">
								<label className="checkbox-container">
									<input
										type="checkbox"
										readOnly
										checked={task.isComplete}
										onClick={
											() =>
												handleToggleTaskCompletion(
													task.id
												) // Insere um evento em cada task, que fica no aguardo para passar o id para função, quando o evento ocorrer
										}
									/>
									<span className="checkmark"></span>
								</label>
								<p>{task.title}</p>
							</div>

							<button
								type="button"
								data-testid="remove-task-button"
								onClick={() => handleRemoveTask(task.id)}
								// Insere um evento em cada task, que fica no aguardo para passar o id para função, quando o evento ocorrer
							>
								<FiTrash size={16} />
							</button>
						</li>
					))}
				</ul>
			</main>
		</section>
	);
}
