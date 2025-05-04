// This file is licensed under the Fossorial Commercial License.
// Unauthorized use, copying, modification, or distribution is strictly prohibited.
//
// Copyright (c) 2025 Fossorial LLC. All rights reserved.

"use client";

import { Button } from "@app/components/ui/button";
import { useLicenseStatusContext } from "@app/hooks/useLicenseStatusContext";
import { useState } from "react";
import { useTranslations } from 'next-intl';

export default function LicenseViolation() {
    const { licenseStatus } = useLicenseStatusContext();
    const [isDismissed, setIsDismissed] = useState(false);
    const t = useTranslations();

    if (!licenseStatus || isDismissed) return null;

    // Show invalid license banner
    if (licenseStatus.isHostLicensed && !licenseStatus.isLicenseValid) {
        return (
            <div className="fixed bottom-0 left-0 right-0 w-full bg-red-500 text-white p-4 text-center z-50">
                <div className="flex justify-between items-center">
                    <p>
                        t('componentsInvalidKey')
                    </p>
                    <Button
                        variant={"ghost"}
                        className="hover:bg-yellow-500"
                        onClick={() => setIsDismissed(true)}
                    >
                        t('dismiss')
                    </Button>
                </div>
            </div>
        );
    }

    // Show usage violation banner
    if (
        licenseStatus.maxSites &&
        licenseStatus.usedSites &&
        licenseStatus.usedSites > licenseStatus.maxSites
    ) {
        return (
            <div className="fixed bottom-0 left-0 right-0 w-full bg-yellow-500 text-black p-4 text-center z-50">
                <div className="flex justify-between items-center">
                    <p>
                        t('componentsLicenseViolation', {usedSites: licenseStatus.usedSites}, {maxSites: licenseStatus.maxSites})
                    </p>
                    <Button
                        variant={"ghost"}
                        className="hover:bg-yellow-500"
                        onClick={() => setIsDismissed(true)}
                    >
                        t('dismiss')
                    </Button>
                </div>
            </div>
        );
    }

    return null;
}
