import type * as vscode from 'vscode';

export default class VscodeMementoStorage {
    constructor(private readonly memento: vscode.Memento) {}

    get<T>(key: string, defaultValue: T): T {
        return this.memento.get<T>(key, defaultValue);
    }

    async set<T>(key: string, value: T): Promise<void> {
        await this.memento.update(key, value);
    }
}