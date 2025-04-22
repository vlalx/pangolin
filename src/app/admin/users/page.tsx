import { internal } from "@app/lib/api";
import { authCookieHeader } from "@app/lib/api/cookies";
import { AxiosResponse } from "axios";
import SettingsSectionTitle from "@app/components/SettingsSectionTitle";
import { AdminListUsersResponse } from "@server/routers/user/adminListUsers";
import UsersTable, { GlobalUserRow } from "./AdminUsersTable";
import { getTranslations } from 'next-intl/server';

type PageProps = {
    params: Promise<{ orgId: string }>;
};

export const dynamic = "force-dynamic";

export default async function UsersPage(props: PageProps) {
    let rows: AdminListUsersResponse["users"] = [];
    try {
        const res = await internal.get<AxiosResponse<AdminListUsersResponse>>(
            `/users`,
            await authCookieHeader()
        );
        rows = res.data.data.users;
    } catch (e) {
        console.error(e);
    }

    const userRows: GlobalUserRow[] = rows.map((row) => {
        return {
            id: row.id,
            email: row.email,
            dateCreated: row.dateCreated,
            serverAdmin: row.serverAdmin
        };
    });

    const t = await getTranslations();

    return (
        <>
            <SettingsSectionTitle
                title={t('adminManageUsers')}
                description={t('adminViewManageUsers')}
            />
            <UsersTable users={userRows} />
        </>
    );
}
