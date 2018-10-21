import { ReactRenderContainer } from './ReactRenderContainer';

const activeContainers: ReactRenderContainer[] = [];

// const cloneElementWithStubs = (element, shallowTypes) => {
//   if (shallowTypes.has(element.type)) return null;

//   return React.cloneElement(element, {
//     children: React.Children.map(element.props.children, child => {
//       return cloneElementWithStubs(child, shallowTypes);
//     })
//   });
// };

export const render = (element: JSX.Element, options = {}): ReactRenderContainer => {
  const container = new ReactRenderContainer(element, options);

  activeContainers.push(container);
  container.mount();

  return container;
};

export const cleanup = () => {
  while (activeContainers.length) {
    const container = activeContainers.pop();
    container && container.unmount();
  }
};