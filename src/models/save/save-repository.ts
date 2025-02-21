import { ISaveRepository } from "./i-save-repository";
import { Save } from "./save";

export class SaveRepository implements ISaveRepository {
  private static KEY = "save";

  getAll(): Save[] {
    try {
      const item = window.localStorage.getItem(SaveRepository.KEY);
      if (!item) {
        return [];
      }
      return JSON.parse(item);
    } catch (error) {
      return [];
    }
  }

  update(save: Save): void {
    const saves = this.getAll();
    const updated = [...saves.filter((s) => s.level !== save.level), save];
    window.localStorage.setItem(SaveRepository.KEY, JSON.stringify(updated));
  }
}
