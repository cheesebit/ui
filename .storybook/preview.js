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
      <div className="w-full p-16">
        <Story />
      </div>
    );
  },
];
