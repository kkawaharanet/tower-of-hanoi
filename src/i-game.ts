export interface IGame {
  /**
   * レベル
   */
  readonly level: number;

  /**
   * 塔
   */
  readonly towers: number[][];

  /**
   * 操作回数
   */
  readonly count: number;

  /**
   * 理論上の最短手数
   */
  readonly shortestCount: number;

  /**
   * クリア状態
   */
  readonly cleared: boolean;

  /**
   * 移動できるか判定する
   * @param from 移動元の列[0-2]
   * @param to 移動先の列[0-2]
   */
  canMove(from: number, to: number): boolean;

  /**
   * 移動する
   * @param from 移動元の列[0-2]
   * @param to 移動先の列[0-2]
   */
  move(from: number, to: number): IGame;
}
