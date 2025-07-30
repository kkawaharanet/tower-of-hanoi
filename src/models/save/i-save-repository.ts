import { Save } from "./save";

export interface ISaveRepository {
  /**
   * データを取得する
   * @param level レベル
   */
  find(level: number): Save | undefined;

  /**
   * 全データを取得する
   */
  findAll(): Save[];

  /**
   * 更新する
   * @param save
   */
  update(save: Save): void;
}
