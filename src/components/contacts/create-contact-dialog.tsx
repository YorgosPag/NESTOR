
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createContact } from '@/lib/contacts-data';

export function CreateContactDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(event.currentTarget);
    const contactData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      role: formData.get('role') as string,
    };

    try {
        await createContact(contactData);
        toast({
            title: "Επιτυχία!",
            description: `Η επαφή "${contactData.name}" δημιουργήθηκε.`,
        });
        setOpen(false);
        router.refresh();
    } catch (error) {
        console.error("Failed to create contact:", error);
        toast({
            variant: "destructive",
            title: "Σφάλμα",
            description: "Δεν ήταν δυνατή η δημιουργία της επαφής.",
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
            <DialogHeader>
            <DialogTitle>Δημιουργία Νέας Επαφής</DialogTitle>
            <DialogDescription>
                Συμπληρώστε τα στοιχεία της νέας επαφής. Πατήστε αποθήκευση για να ολοκληρώσετε.
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                Όνομα
                </Label>
                <Input id="name" name="name" required className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                Email
                </Label>
                <Input id="email" name="email" type="email" required className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                Τηλέφωνο
                </Label>
                <Input id="phone" name="phone" required className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                Ρόλος
                </Label>
                <Input id="role" name="role" required className="col-span-3" />
            </div>
            </div>
            <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Αποθήκευση
            </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
