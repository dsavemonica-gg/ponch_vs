import ContextKeyPort from '../application/ports/ContextKeyPort';
import ExtensionStatePort from '../application/ports/ExtensionStatePort';
import NotificationPort from '../application/ports/NotificationPort';
import ActivateExtensionUseCase from '../application/usecases/ActivateExtensionUseCase';
import DeactivateExtensionUseCase from '../application/usecases/DeactivateExtensionUseCase';
import InitializeLifecycleUseCase from '../application/usecases/InitializeLifecycleUseCase';

export interface LifecyclePorts {
  extensionState: ExtensionStatePort;
  contextKey: ContextKeyPort;
  notification: NotificationPort;
}

export interface LifecycleModule {
  initializeLifecycleUseCase: InitializeLifecycleUseCase;
  activateExtensionUseCase: ActivateExtensionUseCase;
  deactivateExtensionUseCase: DeactivateExtensionUseCase;
}

export function createLifecycleDependencies(ports: LifecyclePorts): LifecycleModule {
  return {
    initializeLifecycleUseCase: new InitializeLifecycleUseCase(
      ports.extensionState,
      ports.contextKey,
    ),
    activateExtensionUseCase: new ActivateExtensionUseCase(
      ports.extensionState,
      ports.contextKey,
      ports.notification,
    ),
    deactivateExtensionUseCase: new DeactivateExtensionUseCase(
      ports.extensionState,
      ports.contextKey,
      ports.notification,
    ),
  };
}