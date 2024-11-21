// Components
import { Card, CardHeader, CardFooter, CardContent, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CopyIcon, MoveLeft, MoveRight } from "lucide-react"

// Modules
import React, { Dispatch, SetStateAction } from "react"

interface AmazonAuthProps {
    setSteps: Dispatch<SetStateAction<number>>
}

const AmazonAuth: React.FC<AmazonAuthProps> = ({ setSteps }) => {
    const handleClipboard: () => void = () => {
        navigator.clipboard.writeText("contatonkfa@nkportfolio.tech")
    }

    return (
        <Card className="flex flex-col justify-center items-center text-center w-full max-w-72 sm:max-w-md md:max-w-lg lg:max-w-xl">
            <CardHeader>
                <CardTitle>Primeiro Passo</CardTitle>
            </CardHeader>

            <CardContent className="px-1">
                <p className="my-3">Acesse as configurações da Amazon para autorizar o envio de e-mails.</p>
                <p className="my-3">Faça log-in com a sua conta e na aba de "preferencias" desça até a seção "Configurações de documentos pessoais".</p>
                <p className="my-3">Clique em "Adicionar um novo endereço de e-mail" e adicione o seguinte e-mail:</p>

                <div className="flex items-center space-x-1 mx-auto mt-5 w-11/12">
                    <Input className="text-xs" readOnly value="contatonkfa@nkportfolio.tech" />

                    <Button onClick={handleClipboard}>
                        <CopyIcon className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>

            <CardFooter className="flex flex-1 justify-center gap-5">
                <Button variant="outline" onClick={() => setSteps(0)}><MoveLeft /> Voltar</Button>
                <Button variant="outline" onClick={() => setSteps(2)}>Próximo <MoveRight /></Button>
            </CardFooter>
        </Card>
    )
}

export default AmazonAuth