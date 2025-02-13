import express from 'express'
import bcrypt, { hash } from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

//Cadastro
router.post('/cadastro', async (req, res) => {

  try {
  const user = req.body

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(user.password, salt)

  const userDB = await prisma.user.create({
    data: { 
      email: user.email,
      name: user.name,
      password: hashPassword,
    }
  })
  res.status(201).json(userDB)
  } catch(err) {
    res.status(500).json({message: "Erro no servidor, tente novamente"})
  }
})

export default router;



//Lizier
//ShSiFvgpLH2ngVGS
//mongodb+srv://Lizier:ShSiFvgpLH2ngVGS@users.duvkm.mongodb.net/?retryWrites=true&w=majority&appName=Users
