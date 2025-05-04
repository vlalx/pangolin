"use client";

import { createApiClient } from "@app/lib/api";
import { Avatar, AvatarFallback } from "@app/components/ui/avatar";
import { Button } from "@app/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@app/components/ui/dropdown-menu";
import { useEnvContext } from "@app/hooks/useEnvContext";
import { toast } from "@app/hooks/useToast";
import { formatAxiosError } from "@app/lib/api";
import { Laptop, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserContext } from "@app/hooks/useUserContext";
import Disable2FaForm from "./Disable2FaForm";
import Enable2FaForm from "./Enable2FaForm";
import { UserType } from "@server/types/UserTypes";
import LocaleSwitcher from '@app/components/LocaleSwitcher';

export default function ProfileIcon() {
    const { setTheme, theme } = useTheme();
    const { env } = useEnvContext();
    const api = createApiClient({ env });
    const { user, updateUser } = useUserContext();
    const router = useRouter();

    const [userTheme, setUserTheme] = useState<"light" | "dark" | "system">(
        theme as "light" | "dark" | "system"
    );

    const [openEnable2fa, setOpenEnable2fa] = useState(false);
    const [openDisable2fa, setOpenDisable2fa] = useState(false);

    function getInitials() {
        return (user.email || user.name || user.username)
            .substring(0, 1)
            .toUpperCase();
    }

    function handleThemeChange(theme: "light" | "dark" | "system") {
        setUserTheme(theme);
        setTheme(theme);
    }

    function logout() {
        api.post("/auth/logout")
            .catch((e) => {
                console.error("Error logging out", e);
                toast({
                    title: "Error logging out",
                    description: formatAxiosError(e, "Error logging out")
                });
            })
            .then(() => {
                router.push("/auth/login");
                router.refresh();
            });
    }

    return (
        <>
            <Enable2FaForm open={openEnable2fa} setOpen={setOpenEnable2fa} />
            <Disable2FaForm open={openDisable2fa} setOpen={setOpenDisable2fa} />

            <div className="flex items-center md:gap-2 grow min-w-0 gap-2 md:gap-0">
                <span className="truncate max-w-full font-medium min-w-0">
                    {user.email || user.name || user.username}
                </span>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="relative h-10 w-10 rounded-full"
                        >
                            <Avatar className="h-9 w-9">
                                <AvatarFallback>{getInitials()}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-56"
                        align="start"
                        forceMount
                    >
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    Signed in as
                                </p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {user.email || user.name || user.username}
                                </p>
                            </div>
                            {user.serverAdmin ? (
                                <p className="text-xs leading-none text-muted-foreground mt-2">
                                    Server Admin
                                </p>
                            ) : (
                                <p className="text-xs leading-none text-muted-foreground mt-2">
                                    {user.idpName || "Internal"}
                                </p>
                            )}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {user?.type === UserType.Internal && (
                            <>
                                {!user.twoFactorEnabled && (
                                    <DropdownMenuItem
                                        onClick={() => setOpenEnable2fa(true)}
                                    >
                                        <span>Enable Two-factor</span>
                                    </DropdownMenuItem>
                                )}
                                {user.twoFactorEnabled && (
                                    <DropdownMenuItem
                                        onClick={() => setOpenDisable2fa(true)}
                                    >
                                        <span>Disable Two-factor</span>
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                            </>
                        )}
                        <DropdownMenuLabel>Theme</DropdownMenuLabel>
                        {(["light", "dark", "system"] as const).map(
                            (themeOption) => (
                                <DropdownMenuItem
                                    key={themeOption}
                                    onClick={() =>
                                        handleThemeChange(themeOption)
                                    }
                                >
                                    {themeOption === "light" && (
                                        <Sun className="mr-2 h-4 w-4" />
                                    )}
                                    {themeOption === "dark" && (
                                        <Moon className="mr-2 h-4 w-4" />
                                    )}
                                    {themeOption === "system" && (
                                        <Laptop className="mr-2 h-4 w-4" />
                                    )}
                                    <span className="capitalize">
                                        {themeOption}
                                    </span>
                                    {userTheme === themeOption && (
                                        <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                                            <span className="h-2 w-2 rounded-full bg-primary"></span>
                                        </span>
                                    )}
                                </DropdownMenuItem>
                            )
                        )}
                        <DropdownMenuSeparator />
                            <div className="mb-[2px] flex items-center">
                                <LocaleSwitcher />
                            </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => logout()}>
                            {/* <LogOut className="mr-2 h-4 w-4" /> */}
                            <span>Log Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    );
}
