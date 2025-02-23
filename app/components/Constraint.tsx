import Icon from "@/components/Icon";

export default function Constraint({value, type, grid}: {value: string, type: string, grid: number}) {

    return (
        <div className={`constraint constraint-${type}-${grid}`}>
            <Icon name={value} size={'sm'} />
        </div>
    );
}
