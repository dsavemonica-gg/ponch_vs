import ContextKeyPort from '../ports/ContextKeyPort';
import ExtensionStatePort from '../ports/ExtensionStatePort';

export default class InitializeLifecycleUseCase {
    constructor(
        private readonly extensionState: ExtensionStatePort,
        private readonly contextKey: ContextKeyPort,
    ) {}

    async execute(): Promise<boolean> {
        const isActive = await this.extensionState.isActive();
        await this.contextKey.setPonchActive(isActive);
        return isActive;
    }
}   