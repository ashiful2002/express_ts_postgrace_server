import { Request, Response } from "express";
import { todosServices } from "./todos.service";

const createTodos = async (req: Request, res: Response) => {
  const { user_id, title } = req.body;
  try {
    const result = await todosServices.createTodos(user_id, title);
    res.status(201).json({
      success: true,
      message: "todo created",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTodos = async (req: Request, res: Response) => {
  try {
    const result = await todosServices.getTodos();
    res.status(200).json({
      success: true,
      message: "successfully get all todos",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};
const getSingleTodos = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await todosServices.getSingleTodos(id as string);
    res.status(200).json({
      success: true,
      message: "successfully get the specific todo",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};
const updateSingleUser = async (req: Request, res: Response) => {
  const { title } = req.body;
  const id = req.params.id;
  try {
    const result = await todosServices.updateTodos(title, id!);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "Updated the specific todo",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await todosServices.deleteTodos(id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: true,
        message: "user deleted successfully",
        data: result.rows,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "delete todo successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};
export const todosController = {
  createTodos,
  getTodos,
  getSingleTodos,
  updateSingleUser,
  deleteUser,
};
