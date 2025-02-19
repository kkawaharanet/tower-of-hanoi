import { IGame } from "./i-game";

export class Game implements IGame {
  constructor(
    public readonly towers: number[][],
    public readonly count: number,
    public readonly name: string
  ) {}

  get cleared() {
    // 一番右の塔以外の高さが0だったらクリアとする
    for (let i = 0; i < this.towers.length - 1; i++) {
      if (this.towers[i].length >= 1) {
        return false;
      }
    }
    return true;
  }

  canMove(from: number, to: number) {
    const fromValue = this.towers.at(from)?.at(-1);
    const toValue = this.towers.at(to)?.at(-1);

    if (fromValue === undefined) {
      // 移動元に何もなければ移動できない
      return false;
    }
    if (toValue === undefined) {
      // 移動先に何もなければ移動できる
      return true;
    }

    // 移動元よりも移動先の方が大きければ移動できる
    return fromValue < toValue;
  }

  move(from: number, to: number) {
    if (!this.canMove(from, to)) {
      throw new Error("移動できない");
    }
    const towers = structuredClone(this.towers);
    const value = towers[from].pop()!;
    towers[to].push(value);
    return new Game(towers, this.count + 1, this.name);
  }

  static createLevel1(): IGame {
    return new Game([[2, 1, 0], [], []], 0, "level1");
  }

  static createLevel2(): IGame {
    return new Game([[3, 2, 1, 0], [], []], 0, "level2");
  }

  static createLevel3(): IGame {
    return new Game([[4, 3, 2, 1, 0], [], []], 0, "level3");
  }

  static createLevel4(): IGame {
    return new Game([[5, 4, 3, 2, 1, 0], [], []], 0, "level4");
  }

  static createLevel5(): IGame {
    return new Game([[6, 5, 4, 3, 2, 1, 0], [], []], 0, "level5");
  }

  static createLevel6(): IGame {
    return new Game([[9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [], []], 0, "level6");
  }
}
