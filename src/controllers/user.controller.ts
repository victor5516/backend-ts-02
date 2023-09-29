import { Request, Response } from "express";
// Importamos el modelo
import User from "../models/user.interface";
import { v4 as uuid } from "uuid";

let users: User[] = [];
//Definimos el metodos
//Metodo controlador
export const getUsers = (req: Request, res: Response) => {
  return res.status(200).json(users);
};

export const getUser=(req:Request, res:Response)=>{
    //Obtenemos el valor del id.
    const {id}= req.params


    //Hacemos el metodo find para buscar el usuario con ese id
    const user= users.find((user)=> user.id === id)
    if(!user){
        return res.status(404).json({message:'Usuario no encontrado ❌'})
    }
    return res.status(200).json({message:'Usuario encontrado ✅', user})
}

export const createUser = (req: Request, res: Response) => {
  const body = req.body;

  const user: User = {
    id: uuid(),
    ...body,
  };
  users.push(user);

  return res.status(201).json({
    message: `Usuario creado correctamente: ${user.name} || ${user.email}`,
  });
};

export const updateUser = (req: Request, res: Response) => {
 const {id}= req.params
const body =req.body
 const user = users.find((user)=> user.id === id)

 if(!user){
    return res.status(404).json({message:'Usuario no encontrado ❌'})
 }
 user.name= body.name
 user.email=body.email
 user.password=body.password
 //Guardamos los cambios
 return res.status(202).json({message:'Usuario actualizado correctamente ✅'})

}
export const deleteUser = (req:Request, res:Response)=>{

    const { id }=req.params


    const user = users.find((user)=> user.id ===id);
    if(!user){
        return res.status(404).json({message:'Usuario no encontrado ❌'})
    }
    const filterUsers = users.filter((user)=> user.id ===id)
    users = filterUsers

    return res.status(200).json({message:`Usuario ${user.name}👤 fue eliminado correctamente`});



}
