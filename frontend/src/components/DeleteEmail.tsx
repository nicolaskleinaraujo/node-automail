// Components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoveLeft } from "lucide-react"
import EmailForm from "@/components/EmailForm"

// Modules
import React, { Dispatch, SetStateAction } from 'react'

interface DeleteEmailProps {
    setSteps: Dispatch<SetStateAction<number>>
}

const DeleteEmail: React.FC<DeleteEmailProps> = ({ setSteps }) => {
    return (
        <Card className="flex flex-col justify-center items-center text-center w-11/12 max-w-md md:max-w-lg lg:max-w-xl">
            <CardHeader>
                <CardTitle>Delete seu e-mail</CardTitle>
                <CardDescription>
                    Digite o seu e-mail abaixo para parar de receber a Newsletter em sua conta Kindle
                </CardDescription>
            </CardHeader>

            <CardContent className="w-full">
                <EmailForm setSteps={setSteps} handleType="DELETE" />
            </CardContent>

            <CardFooter className="flex justify-start w-full">
                <Button variant="outline" onClick={() => setSteps(0)}><MoveLeft /> Voltar</Button>
            </CardFooter>
        </Card>
    )
}

export default DeleteEmail