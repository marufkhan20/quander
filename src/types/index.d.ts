type SidebarItemType = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  pathname: string;
};

type TagType = {
  name: string;
  icon: React.ComponentType;
};

interface CommentWithAuthor {
  id: string | null;
  text: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  videoId: string | null;
  authorId: string | null;
  author: {
    image: string | null;
    name: string | null;
  };
}
