import VscodeMementoStorage from '../vscode/VscodeMementoStorage';

export default class ExtensionStateRepository {
    constructor(
        private readonly storage: VscodeMementoStorage,
        private readonly activeKey: string,
        private readonly defaultActive = false,
    ) {}

    async isActive(): Promise<boolean> {
        return this.storage.get<boolean>(this.activeKey, this.defaultActive);
    }

    async setActive(active: boolean): Promise<void> {
        await this.storage.set<boolean>(this.activeKey, active);
    }
}