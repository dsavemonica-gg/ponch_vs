import ContextKeyPort from '../ports/ContextKeyPort';
import ExtensionStatePort from '../ports/ExtensionStatePort';
import NotificationPort from '../ports/NotificationPort';

export default class DeactivateExtensionUseCase {
    constructor(
        private readonly extensionState: ExtensionStatePort,
        private readonly contextKey: ContextKeyPort,
        private readonly notification: NotificationPort,
    ) {}

    async execute(): Promise<void> {
        const currentlyActive = await this.extensionState.isActive();

        if (!currentlyActive) {
        await this.contextKey.setPonchActive(false);
        await this.notification.showWarning('Ponch ya se encuentra desactivado.');
        return;
        }

        await this.extensionState.setActive(false);
        await this.contextKey.setPonchActive(false);

        // Notificación posterior a la desactivación
        await this.notification.showInfo('Ponch ha sido desactivado.');
    }
}