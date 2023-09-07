import { ToSingularPipe } from './to-singular.pipe';

describe('ToSingularPipe', () => {
  it('create an instance', () => {
    const pipe = new ToSingularPipe();
    expect(pipe).toBeTruthy();
  });
});
