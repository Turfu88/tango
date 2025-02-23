import { useState, useEffect } from "react";

export default function Icon({ name, size }: { name: string, size: string }) {
    const [iconSrc, setIconSrc] = useState<string>("");

    useEffect(() => {
        async function loadIcon() {
            try {
                const icon = await import(`@/ressources/${name}.svg`);
                setIconSrc(icon.default);
            } catch (error) {
                console.error(`Icon "${name}" not found.`, error);
            }
        }

        loadIcon();
    }, [name]);

    if (!iconSrc) {
        return <></>; // fallback
    }

    return <img src={iconSrc} className={`icon icon-${size} no-select`} alt={name} />;
}

