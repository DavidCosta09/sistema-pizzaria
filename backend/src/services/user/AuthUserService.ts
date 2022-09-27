import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    //verificar se o email existe
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("User/Password incorrect");
    }

    //verificar se a senha que o usuario enviou está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("User/Password incorrect");
    }

    // gerar um token JWT e devolver os dados do usuario como id, name e email

    return { ok: true };
  }
}

export { AuthUserService };
