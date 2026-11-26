import ContextKeyPort from '../ports/ContextKeyPort';
import ExtensionStatePort from '../ports/ExtensionStatePort';
import NotificationPort from '../ports/NotificationPort';

export default class ActivateExtensionUseCase {
    constructor(
        private readonly extensionState: ExtensionStatePort,
        private readonly contextKey: ContextKeyPort,
        private readonly notification: NotificationPort,
    ) {}

    async execute(): Promise<void> {
        const currentlyActive = await this.extensionState.isActive();

        if (currentlyActive) {
            await this.contextKey.setPonchActive(true);
            await this.notification.showInfo('Ponch ya se encuentra activo.');
            return;
        }

        await this.extensionState.setActive(true);
        await this.contextKey.setPonchActive(true);

        // Notificación posterior a la activación
        await this.notification.showInfo('Ponch ha sido activado correctamente.');
    }
}