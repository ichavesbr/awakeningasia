// CODIGO CORRIGIDO PELA AI DO YOUTUBE. verifica um dia

"use server"
import { contactFormSchema } from "../lib/zodSchema"

export async function formAction(prevState: any, formData: FormData) {
  // 1. Validação de Schema
  const result = contactFormSchema.safeParse(Object.fromEntries(formData))
  if (!result.success) {
    return { status: "error", errors: result.error.flatten().fieldErrors }
  }

  try {
    // 2. Chamada de API com Proteção
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData, // Web3Forms aceita FormData diretamente
    })
    //     ```
    // const data = await response.json()

    // if (!data.success) {
    //   return { status: "error", message: data.message || "Falha no provedor de e-mail" }
    // }

    // return { status: "success", message: "Mensagem enviada!" }
    // ```
  } catch (error) {
    // 3. Erros de Conexão/Rede
    return { status: "error", message: "Erro de conexão com o servidor" }
  }
}
