import { MonsterService } from './monsters.service';
import monstersData from '../../../data/monsters.json';

describe('Monsters Service', () => {
  it('should return the monsters list empty', async () => {
    jest.spyOn(MonsterService, 'getAll').mockResolvedValue([]);
    const response = await MonsterService.getAll();
    expect(response).toEqual([]);
  });

  it('should return the monsters list with data', async () => {
    jest
      .spyOn(MonsterService, 'getAll')
      .mockResolvedValue([monstersData.monsters[0], monstersData.monsters[1]]);
    const response = await MonsterService.getAll();
    expect(response).toEqual([
      monstersData.monsters[0],
      monstersData.monsters[1],
    ]);
  });

  it('should return the winner data', async () => {
    jest
      .spyOn(MonsterService, 'getWinner')
      .mockResolvedValue({
        winner: monstersData.monsters[1],
        tie: false
      });
    const mockIds = {
      monster1Id: monstersData.monsters[0].id,
      monster2Id: monstersData.monsters[1].id
    };

    const response = await MonsterService.getWinner(mockIds);
    expect(response).toEqual({
      winner: monstersData.monsters[1],
      tie: false
    })
  });
});
