export interface Monster {
  id: string;
  name: string;
  attack: number;
  defense: number;
  hp: number;
  speed: number;
  type: string;
  imageUrl: string;
}

export interface WinnerErrorMsg {
  message: string;
}

export interface Winner {
  winner: Monster;
  tie: boolean;
}