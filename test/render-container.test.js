import { RenderContainer } from '../src/render-container';

describe('RenderContainer', () => {
  test('mount/unmount', () => {
    const container = new RenderContainer();
    container.domNode.innerHTML = `
      <div id="test">
        <button id="btn1"></button>
        <button id="btn2"></button>
      </div>
    `;

    expect(document.getElementById('test')).toBeFalsy();
    container.mount();
    expect(document.getElementById('test')).toBeInstanceOf(HTMLElement);
    expect(document.getElementById('test').parentNode.tagName).toBe('DIV');
    expect(document.getElementById('test').parentNode.parentNode).toBe(document.body);
    container.unmount();
    expect(document.getElementById('test')).toBeFalsy();
    container.unmount();
  });

  test('count', () => {
    const container = new RenderContainer();
    container.domNode.innerHTML = `
      <div id="test">
        <button id="btn1"></button>
        <button id="btn2"></button>
      </div>
    `;

    expect(container.count('#test')).toBe(1);
    expect(container.count('something-else')).toBe(0);
    expect(container.count('button')).toBe(2);
  });

  test('get', () => {
    const container = new RenderContainer();
    container.domNode.innerHTML = `
      <div id="test">
        <button id="btn1"></button>
        <button id="btn2"></button>
      </div>
    `;

    expect(() => container.get('button')).toThrow();
    expect(() => container.get('non-existent')).toThrow();
    expect(container.get('#test').id).toBe('test');
  });

  test('find', () => {
    const container = new RenderContainer();
    container.domNode.innerHTML = `
      <div id="test">
        <button id="btn1"></button>
        <button id="btn2"></button>
      </div>
    `;

    expect(container.find('#test')).toBeInstanceOf(HTMLElement);
    expect(container.find('something-else')).toBeNull();
    expect(container.find('button').id).toBe('btn1');
  });

  test('all', () => {
    const container = new RenderContainer();
    container.domNode.innerHTML = `
      <div id="test">
        <button id="btn1"></button>
        <button id="btn2"></button>
      </div>
    `;

    expect(container.all('#test')).toHaveLength(1);
    expect(container.all('#test')[0].id).toBe('test');
    expect(container.all('something-else')).toEqual([]);
    expect(container.all('button')).toHaveLength(2);
    expect(container.all('button')[0].id).toBe('btn1');
    expect(container.all('button')[1].id).toBe('btn2');
  });
});
