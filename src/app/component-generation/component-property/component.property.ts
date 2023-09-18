export interface ComponentProperty<TChild> {
  copyFrom(value: any): void;
  setChildren(children: TChild[]): void;
}
