export default interface NotificationPort {
    showInfo(message: string): Promise<void>;
    showWarning(message: string): Promise<void>;
    showError(message: string): Promise<void>;
}