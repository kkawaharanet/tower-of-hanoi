import { Save } from "./save";

export interface ISaveRepository {
  /**
   * 全データを取得する
   */
  getAll(): Save[];

  /**
   * 更新する
   * @param save
   */
  update(save: Save): void;
}
