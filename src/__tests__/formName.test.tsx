import { renderHook } from '@testing-library/react-hooks';
import { useForm } from '../useForm';

describe('form_name', () => {
  it('should return correct name', () => {
    const { result } = renderHook(() =>
      useForm<{
        a: { a: { a: string } };
        b: { a: { a: number } };
      }>(),
    );

    expect(result.current.name.end('a')).toEqual('a');
    expect(result.current.name('a').end('a')).toEqual('a.a');
    expect(result.current.name('a')('a').end('a')).toEqual('a.a.a');

    expect(result.current.name.end('b')).toEqual('b');
    expect(result.current.name('b').end('a')).toEqual('b.a');
    expect(result.current.name('b')('a').end('a')).toEqual('b.a.a');
  });
});
