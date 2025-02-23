import Icon from "@/components/Icon";

export default function Button({ icon, variant, handleAction, children }: { icon?: string, variant?: string, handleAction: () => void, children?: React.ReactNode }) {


    return (
        <button className={`button px-2 ${variant}`} onClick={handleAction}>
            {icon &&<Icon name={icon} size={'lg'} />}
            {children}
        </button>
    );
}
