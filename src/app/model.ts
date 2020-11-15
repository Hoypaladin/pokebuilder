export interface Pokemon{
  id : number;
  name : string;
  moves: Move[];
  image: string;
  type: Type[];
  hp: number;
  attack: number;
  defense: number;
  spAtk: number;
  spDef : number;
  speed: number;
}

export interface Move{
  type: Type;
  pp: number;
  power: string;
  description: string;
  accuracy: string;
  name: string;
}

export enum Type{
  Normal = "normal",
  Fire = "fire",
  Fighting = "fighting",
  Water ="water",
  Flying = "flying",
  Grass = "grass",
  Poison = "poison",
  Electric = "electric",
  Ground = "ground",
  Psychic = "psychic",
  Rock = "rock",
  Ice = 'ice',
  Bug = "bug",
  Dragon = "dragon",
  Ghost  = "ghost",
  Dark = "dark",
  Steel = "steel",
  Fairy = "fairy",
}
