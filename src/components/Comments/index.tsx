import Comment from "./Comment";

interface IProps {
  comments: CommentWithAuthor[];
  handleDelete: (id: string) => void;
}

const Comments = ({ comments, handleDelete }: IProps) => {
  return (
    <div className="flex flex-col gap-10">
      {comments?.map((comment) => (
        <Comment
          key={comment?.id}
          comment={comment}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default Comments;
