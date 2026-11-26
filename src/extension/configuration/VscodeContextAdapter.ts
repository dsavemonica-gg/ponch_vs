import * as vscode from 'vscode';
import ContextKeyPort from '../../features/lifecycle/application/ports/ContextKeyPort';
import { CONTEXT_KEYS } from './ExtensionConstants';

export default class VscodeContextAdapter implements ContextKeyPort {
    async setPonchActive(active: boolean): Promise<void> {
        await vscode.commands.executeCommand(
        'setContext',
        CONTEXT_KEYS.IS_ACTIVE,
        active,
        );
    }
}