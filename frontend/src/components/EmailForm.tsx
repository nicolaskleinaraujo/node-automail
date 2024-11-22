// Components
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Modules
import React, { Dispatch, SetStateAction } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import apiFetch from "@/config/axios"
import z from "zod"

interface EmailFormProps {
    setSteps: Dispatch<SetStateAction<number>>,
    handleType: string,
}

const formSchema = z.object({
    email: z.string().email({ message: "Email invalido" }).trim().max(150),
})

const EmailForm: React.FC<EmailFormProps> = ({ setSteps, handleType }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    const handleRegister: (values: z.infer<typeof formSchema>) => Promise<void> = async(values) => {
        try {
            if (handleType === "REGISTER") {
                await apiFetch.post("/email", { email: values.email })
                setSteps(3)
            } else if (handleType === "DELETE") {
                await apiFetch.delete("/email", { data: { email: values.email } })
                setSteps(0)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegister)}>
                <FormField 
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Seu e-mail do Kindle" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                { handleType === "REGISTER" && <Button type="submit" variant="secondary" className="mt-2">Registrar</Button> }
                { handleType === "DELETE" && <Button type="submit" variant="destructive" className="mt-2">Remover</Button> }
            </form>
        </Form>
    )
}

export default EmailForm
