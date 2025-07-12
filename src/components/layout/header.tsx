
"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { BotMessageSquare } from "lucide-react";
// import { InstructionsDialog } from "@/components/layout/instructions-dialog";

export function Header() {
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 no-print">
            <SidebarTrigger className="md:hidden" />
            <div className="w-full flex-1">
                 {/* Can add a search bar here if needed */}
            </div>
            {/* <InstructionsDialog>
                <Button variant="outline" size="sm">
                    <BotMessageSquare className="mr-2 h-4 w-4" />
                    AI Assistant
                </Button>
            </InstructionsDialog> */}
        </header>
    );
}
