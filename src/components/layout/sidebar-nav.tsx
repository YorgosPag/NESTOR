
"use client"

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, useSidebar } from '@/components/ui/sidebar';
import { LayoutGrid, FolderKanban, Users, Calendar, Settings, Workflow, ListChecks, FilePieChart, Tags, HandCoins, Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const menuItems = [
    { href: '/dashboard', label: 'Πίνακας Ελέγχου', icon: LayoutGrid },
    { href: '/projects', label: 'Έργα', icon: FolderKanban },
    { href: '/contacts', label: 'Επαφές', icon: Users },
    { href: '/calendar', label: 'Ημερολόγιο', icon: Calendar },
    { href: '/supplier-offers', label: 'Προσφορές Προμηθ.', icon: HandCoins },
    { href: '/reports', label: 'Αναφορές', icon: FilePieChart },
];

const adminMenuItems = [
    { href: '/admin', label: 'Παρεμβάσεις', icon: Workflow },
    { href: '/admin/custom-lists', label: 'Λίστες', icon: ListChecks },
    { href: '/admin/tags', label: 'Ετικέτες', icon: Tags },
    { href: '/admin/settings', label: 'Ρυθμίσεις', icon: Settings },
];


export function SidebarNav() {
    const pathname = usePathname();
    const { state, toggleSidebar } = useSidebar();
    
    return (
        <Sidebar className="no-print">
            <SidebarHeader>
                <div className="flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-primary" />
                    <span className="text-lg font-semibold">NESTOR-eco</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {menuItems.map(item => (
                        <SidebarMenuItem key={item.href}>
                            <Link href={item.href} passHref legacyBehavior>
                                <SidebarMenuButton as="a" isActive={pathname.startsWith(item.href)}>
                                    <item.icon />
                                    <span>{item.label}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>

                <SidebarMenu className="mt-auto">
                     <span className="px-2 text-xs text-muted-foreground">Διαχείριση</span>
                    {adminMenuItems.map(item => (
                        <SidebarMenuItem key={item.href}>
                            <Link href={item.href} passHref legacyBehavior>
                                <SidebarMenuButton as="a" isActive={pathname.startsWith(item.href)}>
                                    <item.icon />
                                    <span>{item.label}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
             <SidebarFooter>
                <Button variant="ghost" onClick={toggleSidebar} className="w-full justify-start gap-2">
                   {state === 'expanded' ? <ChevronLeft /> : <ChevronRight /> }
                   <span>{state === 'expanded' ? 'Σύμπτυξη' : 'Ανάπτυξη'}</span>
                </Button>
            </SidebarFooter>
        </Sidebar>
    )
}
