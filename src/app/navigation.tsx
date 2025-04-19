import { SidebarNavItem } from "@app/components/SidebarNav";
import {
    Home,
    Settings,
    Users,
    Link as LinkIcon,
    Waypoints,
    Combine
} from "lucide-react";
import { useTranslations } from 'next-intl';

const RootNavItems = () => {
    const t = useTranslations('layout');

    return [
        {
            title: t('home'),
            href: "/"
            // icon: <Home className="h-4 w-4" />
        }
    ];
}

const OrgNavItems = () => {
    const t = useTranslations('layout');

    return [
        {
            title: t('sites'),
            href: "/{orgId}/settings/sites"
            // icon: <Combine className="h-4 w-4" />
        },
        {
            title: t('resources'),
            href: "/{orgId}/settings/resources"
            // icon: <Waypoints className="h-4 w-4" />
        },
        {
            title: t('access'),
            href: "/{orgId}/settings/access",
            // icon: <Users className="h-4 w-4" />,
            autoExpand: true,
            children: [
                {
                    title: t('users'),
                    href: "/{orgId}/settings/access/users",
                    children: [
                        {
                            title: t('invitations'),
                            href: "/{orgId}/settings/access/invitations"
                        }
                    ]
                },
                {
                    title: t('roles'),
                    href: "/{orgId}/settings/access/roles"
                }
            ]
        },
        {
            title: t('links'),
            href: "/{orgId}/settings/share-links"
            // icon: <LinkIcon className="h-4 w-4" />
        },
        {
            title: t('settings'),
            href: "/{orgId}/settings/general"
            // icon: <Settings className="h-4 w-4" />
        }
    ];
}

const AdminNavItems = () => {
    const t = useTranslations('layout');

    return [
        {
            title: t('allUsers'),
            href: "/admin/users"
            // icon: <Users className="h-4 w-4" />
        }
    ];
}

export { RootNavItems, OrgNavItems, AdminNavItems };
