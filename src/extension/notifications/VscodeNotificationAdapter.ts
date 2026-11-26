import * as vscode from 'vscode';
import NotificationPort from '../../features/lifecycle/application/ports/NotificationPort';

export default class VscodeNotificationAdapter implements NotificationPort {
    async showInfo(message: string): Promise<void> {
        await vscode.window.showInformationMessage(message);
    }

    async showWarning(message: string): Promise<void> {
        await vscode.window.showWarningMessage(message);
    }

    async showError(message: string): Promise<void> {
        await vscode.window.showErrorMessage(message);
    }
}