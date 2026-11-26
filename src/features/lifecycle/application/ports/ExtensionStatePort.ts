export default interface ExtensionStatePort {
  isActive(): Promise<boolean>;
  setActive(active: boolean): Promise<void>;
}