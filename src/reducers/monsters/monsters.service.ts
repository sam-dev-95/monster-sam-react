import { API_URL } from '../../constants/env';
import { Monster, Winner, WinnerErrorMsg } from '../../models/interfaces/monster.interface';

const getAll = async (): Promise<Monster[]> =>
  await fetch(`${API_URL}/monsters`).then((response) => response.json());

const getWinner = async ({
  monster1Id, monster2Id
}: {
  monster1Id: string;
  monster2Id: string;
}): Promise<Winner | WinnerErrorMsg> =>
  await fetch(`${API_URL}/battle`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      monster1Id,
      monster2Id
    })
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  });

export const MonsterService = {
  getAll,
  getWinner
};
