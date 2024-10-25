const Stories = () => {
  return (
    <div className='flex items-center gap-5'>
      <Story />
      <Story />
      <Story />
      <Story />
    </div>
  );
};

export default Stories;

const Story = () => {
  return (
    <div className='flex flex-col gap-2.5 items-center'>
      <div className='w-[50px] h-[50px] rounded-full bg-rose-300 cursor-pointer border-primary border-2'></div>
      <span>test</span>
    </div>
  );
};
