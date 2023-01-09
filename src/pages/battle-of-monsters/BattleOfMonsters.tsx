import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../app/hooks"
import { MonsterBattleCard } from "../../components/monster-battle-card/MonsterBattleCard"
import { MonstersList } from "../../components/monsters-list/MonstersList"
import { Title } from "../../components/title/Title"
import { WinnerDisplay } from "../../components/winner-display/WinnerDisplay"
import { fetchMonstersData } from "../../reducers/monsters/monsters.actions"
import { selectMonsters, selectSelectedMonster } from "../../reducers/monsters/monsters.selectors"
import { BattleSection, PageContainer, StartBattleButton } from "./BattleOfMonsters.styled"
import { MonsterService } from '../../reducers/monsters/monsters.service';

const BattleOfMonsters = () => {
    const dispatch = useAppDispatch()

    const monsters = useSelector(selectMonsters)
    const selectedMonster = useSelector(selectSelectedMonster)

    const [winner, setWinner] = useState<any>();
    const [comMonster, setComMonster] = useState<any>();

    useEffect(() => {
        dispatch(fetchMonstersData())
    }, []);

    useEffect(() => {
        setWinner(null);
        setComMonster(null);

        if (selectedMonster) {
            const randomMonsters = monsters.filter(item => item.id !== selectedMonster?.id);
            const comMonsterIdx = (randomMonsters.length * Math.random()).toFixed(0);

            const newComMonster = randomMonsters[parseInt(comMonsterIdx)] ?? randomMonsters[0];

            setComMonster(newComMonster);
        }

    }, [selectedMonster, monsters])

    const handleStartBattleClick = async () => {
        // Fight!
        if (!selectedMonster || !comMonster) return;

        const res = await MonsterService.getWinner({ monster1Id: selectedMonster.id, monster2Id: comMonster.id })
        setWinner(res);
    }

    return (
        <PageContainer>
            <Title>Battle of Monsters</Title>

            <MonstersList monsters={monsters} />

            {winner && <WinnerDisplay text={winner.winner?.name} />}

            <BattleSection>
                <MonsterBattleCard title={selectedMonster?.name || "Player"} monster={selectedMonster}></MonsterBattleCard>
                <StartBattleButton
                    data-testid="start-battle-button"
                    disabled={selectedMonster === null}
                    onClick={handleStartBattleClick}>Start Battle</StartBattleButton>
                <MonsterBattleCard title="Computer" monster={comMonster} ></MonsterBattleCard>
            </BattleSection>
        </PageContainer>
    )
}

export { BattleOfMonsters }