import Comment from "./Comment";

const Comments = () => {
  return (
    <div className="flex flex-col gap-10">
      <Comment key={1} />
      <Comment key={2} />
      <Comment key={4} />
      <Comment key={5} />
    </div>
  );
};

export default Comments;
