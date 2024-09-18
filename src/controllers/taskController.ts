import { Request, Response } from 'express';
import Task from '../models/taskModel';
import { createTaskSchema, updateTaskSchema } from '../validators/validationSchemas';


export const createTask = async (req: Request, res: Response) => {
  const { error } = createTaskSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const { title, description } = req.body;
    const userId = (req as any).user.id;

    const newTask = new Task({
      title,
      description,
      createdBy: userId
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar a tarefa', error });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const tasks = await Task.find({ createdBy: userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter as tarefas', error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { error } = updateTaskSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const taskId = req.params.id;
  const { title, description, status } = req.body;
  const userId = (req as any).user.id;

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, createdBy: userId },
      { title, description, status, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar a tarefa', error });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const taskId = req.params.id;
  const userId = (req as any).user.id;

  try {
    const deletedTask = await Task.findOneAndDelete({ _id: taskId, createdBy: userId });

    if (!deletedTask) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    res.status(200).json({ message: 'Tarefa excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir a tarefa', error });
  }
};
