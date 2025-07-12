"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import type { Contact } from "@/types"
import { createProject } from "@/lib/data"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import React from "react"

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Ο τίτλος του έργου πρέπει να είναι τουλάχιστον 5 χαρακτήρες.",
  }),
  ownerId: z.string({ required_error: "Πρέπει να επιλέξετε έναν ιδιοκτήτη." }),
  budget: z.coerce.number().positive({ message: "Ο προϋπολογισμός πρέπει να είναι θετικός αριθμός." }),
})

type CreateProjectFormProps = {
    contacts: Contact[];
}

export function CreateProjectForm({ contacts }: CreateProjectFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      ownerId: "",
      budget: undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
        const newProject = await createProject(values);
        toast({
            title: "Επιτυχία!",
            description: `Το έργο "${newProject.title}" δημιουργήθηκε.`,
        });
        router.push(`/projects/${newProject.id}`);
    } catch (error) {
        console.error("Failed to create project:", error);
        toast({
            variant: "destructive",
            title: "Σφάλμα",
            description: "Δεν ήταν δυνατή η δημιουργία του έργου.",
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Τίτλος Έργου</FormLabel>
              <FormControl>
                <Input placeholder="π.χ. Ανακαίνιση κατοικίας στο Μαρούσι" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ownerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ιδιοκτήτης</FormLabel>
               <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Επιλέξτε τον ιδιοκτήτη του έργου" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {contacts.filter(c => c.role === 'Owner').map(contact => (
                    <SelectItem key={contact.id} value={contact.id}>
                      {contact.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Προϋπολογισμός (€)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="π.χ. 15000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Δημιουργία Έργου
        </Button>
      </form>
    </Form>
  )
}
