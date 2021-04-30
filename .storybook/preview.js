export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'fullscreen',
  options: {
    storySort: {
      order: ['Welcome', 'Atoms', 'Organisms', 'Molecules', 'HOCs'],
    },
  },
};

export const decorators = [
  Story => {
    return (
      <div className="flex items-center justify-center w-full h-full p-16">
        <Story />
      </div>
    );
  },
];
