import type * as vscode from 'vscode';
import ExtensionStateRepository from './core/persistence/repositories/ExtensionStateRepository';
import VscodeMementoStorage from './core/persistence/vscode/VscodeMementoStorage';
import { registerLifecycleCommands } from './extension/commands/registerLifecycleCommands';
import { STORAGE_KEYS } from './extension/configuration/ExtensionConstants';
import VscodeContextAdapter from './extension/configuration/VscodeContextAdapter';
import VscodeNotificationAdapter from './extension/notifications/VscodeNotificationAdapter';
import { createLifecycleDependencies } from './features/lifecycle/infrastructure/Lifecycle.Dependencies';

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  // Core / Persistencia
  const mementoStorage = new VscodeMementoStorage(context.globalState);
  const extensionStateRepository = new ExtensionStateRepository(
    mementoStorage,
    STORAGE_KEYS.IS_ACTIVE,
    false,
  );

  // Adaptadores de entorno (VS Code)
  const contextAdapter = new VscodeContextAdapter();
  const notificationAdapter = new VscodeNotificationAdapter();

  // Módulo Lifecycle
  const lifecycle = createLifecycleDependencies({
    extensionState: extensionStateRepository,
    contextKey: contextAdapter,
    notification: notificationAdapter,
  });

  // Registro de comandos y restauración del estado inicial
  registerLifecycleCommands(context, {
    activateExtensionUseCase: lifecycle.activateExtensionUseCase,
    deactivateExtensionUseCase: lifecycle.deactivateExtensionUseCase,
    notification: notificationAdapter,
  });

  await lifecycle.initializeLifecycleUseCase.execute();
}

export function deactivate(): void {
  // Limpieza adicional cuando VS Code descargue la extensión
}