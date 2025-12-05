import { Request, Response } from "express";
import { uesrServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const result = await uesrServices.createUser(name, email);

    return res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await uesrServices.getUsers();
    res.status(200).json({
      success: true,
      message: "users received successfully",
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
const getSingleUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await uesrServices.getSingleUser(id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "No user found",
        data: result.rows,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "found specific user successfully",
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
const updateUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const id = req.params.id;
  try {
    const result = await uesrServices.updateUser(name, email, id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "No user found",
        data: result.rows,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "updated user successfully",
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

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await uesrServices.deleteUser(id as string);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const userController = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
