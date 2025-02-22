import { IGame } from "./i-game";

export class Game implements IGame {
  public static readonly LEVELS = 6;
  public readonly shortestCount: number;

  constructor(
    public readonly level: number,
    public readonly towers: number[][],
    public readonly count: number
  ) {
    // n段のハノイの塔の最短手数は 2 ^ n - 1
    this.shortestCount = 2 ** (Math.max(...this.towers.flat()) + 1) - 1;
  }

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
    return new Game(this.level, towers, this.count + 1);
  }

  static create(level: number): IGame {
    if (level <= -1 || level >= Game.LEVELS) {
      throw new Error("レベルがおかしい");
    }
    if (level === 0) {
      return new Game(0, [[2, 1, 0], [], []], 0);
    } else if (level === 1) {
      return new Game(1, [[3, 2, 1, 0], [], []], 0);
    } else if (level === 2) {
      return new Game(2, [[4, 3, 2, 1, 0], [], []], 0);
    } else if (level === 3) {
      return new Game(3, [[5, 4, 3, 2, 1, 0], [], []], 0);
    } else if (level === 4) {
      return new Game(4, [[6, 5, 4, 3, 2, 1, 0], [], []], 0);
    }
    return new Game(5, [[9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [], []], 0);
  }
}
