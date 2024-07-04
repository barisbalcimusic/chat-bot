const PreviewMessage = ({ message }) => {
  return (
    <p className="bg-gray-400 hover:bg-[red] hover:cursor-pointer rounded-[5px] p-2">
      {message}
    </p>
  );
};

export default PreviewMessage;
