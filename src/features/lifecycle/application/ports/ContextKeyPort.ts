export default interface ContextKeyPort {
  setPonchActive(active: boolean): Promise<void>;
}