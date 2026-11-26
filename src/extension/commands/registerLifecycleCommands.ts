import * as vscode from 'vscode';
import NotificationPort from '../../features/lifecycle/application/ports/NotificationPort';
import ActivateExtensionUseCase from '../../features/lifecycle/application/usecases/ActivateExtensionUseCase';
import DeactivateExtensionUseCase from '../../features/lifecycle/application/usecases/DeactivateExtensionUseCase';
import { COMMANDS } from '../configuration/ExtensionConstants';

interface LifecycleCommandsDeps {
  activateExtensionUseCase: ActivateExtensionUseCase;
  deactivateExtensionUseCase: DeactivateExtensionUseCase;
  notification: NotificationPort;
}

export function registerLifecycleCommands(
  context: vscode.ExtensionContext,
  deps: LifecycleCommandsDeps,
): void {
  const activateCmd = vscode.commands.registerCommand(
    COMMANDS.ACTIVATE,
    async () => {
      try {
        await deps.activateExtensionUseCase.execute();
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Error desconocido al activar Ponch.';
        await deps.notification.showError(`No se pudo activar Ponch: ${message}`);
      }
    },
  );

  const deactivateCmd = vscode.commands.registerCommand(
    COMMANDS.DEACTIVATE,
    async () => {
      try {
        await deps.deactivateExtensionUseCase.execute();
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Error desconocido al desactivar Ponch.';
        await deps.notification.showError(`No se pudo desactivar Ponch: ${message}`);
      }
    },
  );

  context.subscriptions.push(activateCmd, deactivateCmd);
}