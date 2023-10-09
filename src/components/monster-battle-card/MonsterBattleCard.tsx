import { Monster } from "../../models/interfaces/monster.interface"
import { BattleMonsterCard, BattleMonsterTitle, Image, MonsterName, ProgressBar, ProgressLabel, SectionDivider } from "./MonsterBattleCard.styled"

type MonsterCardProps = {
    monster?: Monster | null
    title?: string
}

const PropertyBar: React.FC<{
    value: number
    label: string
}> = ({ value, label }) => {
    return <>
        <ProgressLabel>{label}</ProgressLabel>
        <ProgressBar value={value} variant="determinate" />
    </>
}

const MonsterBattleCard: React.FC<MonsterCardProps> = ({ title, monster }) => {

    return (
        <BattleMonsterCard>
            {monster ? (
                <>
                    <Image src={monster?.imageUrl} />
                    <MonsterName>{monster?.name}</MonsterName>

                    <SectionDivider />

                    <PropertyBar value={monster?.hp} label="HP"/>
                    <PropertyBar value={monster?.attack} label="Attack"/>
                    <PropertyBar value={monster.defense} label="Defense"/>
                    <PropertyBar value={monster?.speed} label="Speed"/>
                </>
            ) : (
                <BattleMonsterTitle>{title!}</BattleMonsterTitle>
            )}
        </BattleMonsterCard>
    )
}

export { MonsterBattleCard }